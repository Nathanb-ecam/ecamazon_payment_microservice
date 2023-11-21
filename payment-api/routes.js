let express = require('express');
let router = express.Router();


let paymentController = require('./controllers/paymentController');
let methodController = require('./controllers/methodController');






// SHOP SERVICE 
//payment request from shop service : need to send back a payment confirmation
router.post('/payment',paymentController.makePayment);
router.delete('/payment/:payment_id',paymentController.deletePayment);
router.get('/payments',paymentController.listPayments);


// USER SERVICE 
//to handle method of payment requested by the user service : need to send back a validation of the payment method 
router.get('/payment-method',methodController.listMethods);
router.get('/payment-method/:method_id',methodController.searchMethodById);
router.post('/payment-method',methodController.addPaymentMethod);
router.delete('/payment-method/:method_id',methodController.deleteMethod);


// SHIPPING SERVICE
// to handle refunds 
router.post('/refund',paymentController.makeRefund);



module.exports = router;