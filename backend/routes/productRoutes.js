const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require('../controllers/productController');
const { isUserAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);

router
  .route('/admin/products')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAdminProducts);

router
  .route('/admin/product/new')
  .post(isUserAuthenticated, authorizeRoles('admin'), createProduct);

router
  .route('/admin/product/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isUserAuthenticated, createProductReview);

router
  .route('/reviews')
  .get(getProductReviews)
  .delete(isUserAuthenticated, deleteReview);

module.exports = router;
