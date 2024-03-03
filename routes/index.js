var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay')
var instance = new Razorpay({
  key_id: "rzp_test_OjrvQOSZyDk5Au",
  key_secret: "pYHwbRI00wkjDatfLWX9kDw8",
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/create/orderId', (req, res) => {
  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order)
  });
})
router.post('/api/payment/verify', (req, res) => {
  var razorpayOrderId = req.body.response.razorpay_order_id
  var razorpayPaymentId = req.body.response.razorpay_payment_id;
  var signature = req.body.response.razorpay_signature;
  var secret = "pYHwbRI00wkjDatfLWX9kDw8";

  var {
    validatePaymentVerification,
    validateWebhookSignature,
  } = require("../node_modules/razorpay/dist/utils/razorpay-utils");
  var checkStatus =  validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    signature,
    secret
  );
  console.log(checkStatus);
  res.send(checkStatus)

})
router.get('/success', (req, res) => {
  res.render('success')
})
module.exports = router;
