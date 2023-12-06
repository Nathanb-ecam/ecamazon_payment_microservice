// let Method = require('../models/methodModel.js')
const {process_payment_method_input} = require('../utils/utils.js');

const cassandra = require('cassandra-driver');
const connection = require('../db.js');

// CASSANDRA QUERIES 
const queryInsert = 'INSERT INTO messages (id, sender, message) VALUES (?,?,?);'; 


// CRUD : payment method 
const queryDeleteMethod = "DELETE FROM method where method_id=?"
const queryFindMethodById = "SELECT * FROM method where method_id=?"
const queryMethodSelect = "SELECT * FROM method WHERE method_id=?;"; 
const querySearchMethodByUserId = "SELECT * FROM method where user_id= ? LIMIT 1 ALLOW FILTERING;"
const queryMethodSelectAll = "SELECT * FROM method;"; 
const queryMethodInsert = 'INSERT INTO method (method_id,type,cardNumber, threeDigitCode,user_id) VALUES (?,?,?,?,?);'; 





exports.addPaymentMethod = async function(req,res){
    /*
    Needs to receive a card number and the 3 digit code, and the userid
    */
    // const {type,cardNumber,threeDigitCode,userId} = req.body;
    const body = req.body;
    const [areInputsValid,inputErrMessages] = process_payment_method_input(body)

    if(areInputsValid){
        let params = [
            cassandra.types.Uuid.random(),
            body["type"],
            body["cardNumber"],
            body["threeDigitCode"],
            body["user_id"]
        ];
        connection.execute(queryMethodInsert, params, { prepare: true }, (err, result) => {
            if (err) {
              console.error('Error inserting new method payment:', err);
              res.json({message: err})
            } else {
              console.log('Payment method inserted successfully');
              res.json({message: "Succesfully added payment method"});
            }
          });
    }
    else{
        res.status(401).json({"payment-method-error":inputErrMessages})
    }
    
}

exports.listMethods = function (req,res){
    connection.execute(queryMethodSelectAll, (err, result) => {
        if (err) {
          console.error('Error reading payment methods:', err);
          res.status(500).json({message : err})
        } else {
        //   console.log('Payment methods found:', result.rows);
          res.status(200).json({"result":result.rows})
        }
      });



}



exports.searchMethodByUserId = async function (req,res){
    const user_id = req.body.user_id;
    if(!isNaN(user_id)){ 
        await connection.execute(querySearchMethodByUserId, [user_id], { prepare: true })
            .then(result => {
                // const success = `Method found for user ${user_id}`
                if(result.rows.length != 0){
                    req.payment_method = result.rows;
                }
                // console.log(success)
            })
            .catch(error => {
                console.error('Error deleting payment method:', error)
            });



    }else{
        const errMessage = "Parameter 'id' must be a number"
        console.log(errMessage)
    }
}



exports.searchMethodById = function (req,res){
    const id = req.params.method_id;
    if(isNaN(id)){

        connection.execute(queryFindMethodById, [id], { prepare: true })
            .then(result => {
                res.json(result.rows)

            })
            .catch(error => {
                console.error('Error finding payment method:', error)
                res.status(500).json({message:err.message})
            });
    }else{
        res.status(400).json({message:"Parameter 'id' must be a number"})
    }
}

exports.deleteMethod = function (req,res){
    const id = req.params.method_id;
    if(isNaN(id)){

        connection.execute(queryDeleteMethod, [id], { prepare: true })
            .then(result => {
                const success = 'Method deleted successfully'
                console.log(success)
                res.json(success)

            })
            .catch(error => {
                console.error('Error deleting payment method:', error)
                res.status(500).json({message:err.message})
            });
    }else{
        res.status(400).json({message:"Parameter 'id' must be a number"})
    }
}