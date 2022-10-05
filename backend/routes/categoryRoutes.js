const express = require('express');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryDetails,
} = require('../controllers/categoryController');
const { isUserAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/categories').get(getAllCategories);

router
  .route('/admin/category/new')
  .post(isUserAuthenticated, authorizeRoles('admin'), createCategory);

router.route('/category/:id').get(getCategoryDetails);

router
  .route('/admin/category/:id')
  .put(isUserAuthenticated, authorizeRoles('admin'), updateCategory)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteCategory);

module.exports = router;
