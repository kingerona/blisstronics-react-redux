const Category = require('../models/categoryModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(200).json({
    success: true,
    category,
  });
});

// Get all categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(201).json({
    success: true,
    categories,
  });
});

// Get category details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  res.status(201).json({
    success: true,
    category,
  });
});

// Update category
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found!', 404));
  }

  category.name = req.body.name;
  await category.save();

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: 'Category deleted',
  });
});
