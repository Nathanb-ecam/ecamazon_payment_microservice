let Payment = require('../models/paymentModel')
let methodController = require('./methodController');
let paymentController = require('./paymentController');

const cassandra = require('cassandra-driver');
const connection = require('../db.js');




// CRUD : payment
const queryPaymentInsert = 'INSERT INTO payment (payment_id,method_id,user_id,amount,refund) VALUES (?,?,?,?,?);'; 
const queryPaymentSelectAll = "SELECT * FROM payment;"; 
const queryDeletePayment = "DELETE FROM payment where payment_id=?"




exports.makePayment = async function(req,res){
    /*
    This method will receive the amount and the user id 
    */
    const {user_id,amount} = req.body;
    const {refund} = req.refund === undefined ? {refund : false} : {refund : true} ; 
    const required_fiels = [user_id,amount]
    let errMessages = [];
    let valid_fields = true;
    for(let field in required_fiels){
        if (field === null || field === undefined){
            let errString = `All required fields were not filled : "${field}"`;
            errMessages.push(errString)
            valid_fields = false;
        }
    }

    if(valid_fields){
        // WE FIRST NEED TO SEE IF USER HAS A VALID PAYMENT METHOD

        await methodController.searchMethodByUserId(req,res);
        // ask methods table if there is a record with user id
        if(req.payment_method){
            const params = [
                cassandra.types.Uuid.random(),
                req.payment_method[0].method_id.buffer,
                user_id,
                amount,
                refund,
            ];
            connection.execute(queryPaymentInsert, params, { prepare: true })
            .then(result => {
                const success = `Payment succesfully registered`
                res.json(success)

            })
            .catch(error => {
                console.error('Error registering payment transaction:', error)
                res.status(500).json({message:error.message})
            });



        }
        else{
            res.status(400).json({"payment-service-error":"No valid payment method for this user "})
        }

    }else{
        res.status(400).json({"payment-service-error":errMessages})
    }
}



exports.listPayments = function (req,res){
    connection.execute(queryPaymentSelectAll, (err, result) => {
        if (err) {
          console.error('Error reading payment methods:', err);
          res.status(500).json({message : err})
        } else {
        //   console.log('Payment methods found:', result.rows);
          res.json({"result":result.rows})
        }
      });


}


exports.deletePayment = function (req,res){
    console.log( "wait")
    const id = req.params.payment_id;
    if(isNaN(id)){

        connection.execute(queryDeletePayment, [id], { prepare: true })
            .then(result => {
                const success = 'Payment deleted successfully'
                console.log(success)
                res.json(success)

            })
            .catch(error => {
                console.error('Error deleting payment transaction:', error)
                res.status(500).json({message:err.message})
            });
    }else{
        res.status(400).json({message:"Parameter 'id' must be a number"})
    }
}



exports.makeRefund = async function(req,res){
    /*
    Needs to receive the userId 
    */ 
    req.refund = true;
    paymentController.makePayment(req,res);
}