const experss = require('express');
const router = experss.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const { isUserAuthenticated, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isUserAuthenticated, newOrder);

router.route('/order/:id').get(isUserAuthenticated, getSingleOrder);

router.route('/orders/me').get(isUserAuthenticated, myOrders);

router
  .route('/admin/orders')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAllOrders);

router
  .route('/admin/order/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateOrder)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrder);

module.exports = router;
