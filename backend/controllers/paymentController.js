const Order = require('../models/orderModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const SSLCommerzPayment = require('sslcommerz-lts');
const storeId = process.env.SSLCOMMERZ_STORE_ID;
const storeSecret = process.env.SSLCOMMERZ_STORE_SECRET;
const isLive = false;

const frontendUrl = process.env.FRONTEND_URL;
const backendUrl = process.env.BACKEND_URL;

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const {
    tranId,
    totalAmount,
    customerName,
    customerEmail,
    address,
    city,
    pinCode,
    state,
    country,
    phoneNo,
    orderedProducts,
  } = req.body;

  const data = {
    total_amount: totalAmount,
    currency: 'BDT',
    tran_id: tranId, // use unique tran_id for each api call
    success_url: `${backendUrl}/payment/success`,
    fail_url: `${backendUrl}/payment/fail`,
    cancel_url: `${backendUrl}/payment/cancel`,
    ipn_url: `${backendUrl}/payment/validate`,
    shipping_method: 'Courier',
    product_name: orderedProducts,
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: customerName,
    cus_email: customerEmail,
    cus_add1: address,
    cus_add2: '',
    cus_city: city,
    cus_state: state,
    cus_postcode: pinCode,
    cus_country: country,
    cus_phone: phoneNo,
    cus_fax: '',
    ship_name: customerName,
    ship_add1: address,
    ship_add2: '',
    ship_city: city,
    ship_state: state,
    ship_postcode: pinCode,
    ship_country: country,
  };

  const sslcz = new SSLCommerzPayment(storeId, storeSecret, isLive);

  const apiResponse = await sslcz.init(data);

  res.status(200).json({
    success: true,
    apiResponse,
    url: apiResponse.GatewayPageURL,
    sessionKey: apiResponse.sessionkey,
    status: apiResponse.status,
  });
});

// Validate payment
exports.validatePayment = catchAsyncErrors(async (req, res, next) => {
  const { val_id } = req.body;

  const ssclz = new SSLCommerzPayment(storeId, storeSecret, isLive);

  const response = await ssclz.validate({ val_id });

  res.status(200).json({
    success: true,
    response,
  });
});

// Payment success
exports.successfulPayment = catchAsyncErrors(async (req, res, next) => {
  const { val_id, tran_id } = req.body;

  const ssclz = new SSLCommerzPayment(storeId, storeSecret, isLive);

  const response = await ssclz.validate({ val_id });

  const order = await Order.findById(tran_id);

  if (response.status === 'VALID') {
    order.paidAt = response.tran_date;
    order.paymentInfo.id = tran_id;
    order.paymentInfo.status = 'Paid';
  }

  await order.save();

  res.redirect(`${frontendUrl}/order-confirmation/success`);
});

// Payment fail
exports.failedPayment = catchAsyncErrors(async (req, res, next) => {
  res.redirect(`${frontendUrl}/order-confirmation/fail`);
});

// Payment cancel
exports.cancelledPayment = catchAsyncErrors(async (req, res, next) => {
  res.redirect(`${frontendUrl}/order-confirmation/cancel`);
});
