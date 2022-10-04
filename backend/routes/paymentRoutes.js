const express = require('express');
const {
  processPayment,
  validatePayment,
  successfulPayment,
  failedPayment,
  cancelledPayment,
} = require('../controllers/paymentController');
const router = express.Router();
const { isUserAuthenticated } = require('../middleware/auth');

router.route('/payment/process').post(isUserAuthenticated, processPayment);

router.route('/payment/validate').post(validatePayment);

router.route('/payment/success').post(successfulPayment);
router.route('/payment/fail').post(failedPayment);
router.route('/payment/canel').post(cancelledPayment);

module.exports = router;
