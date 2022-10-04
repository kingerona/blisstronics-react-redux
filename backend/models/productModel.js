const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  attributes: { type: Map, of: String },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
  },
  // slug: { type: String, required: true, unique: true },
  // type: { type: String, required: true },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  brand: String,
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  price: { type: Number, required: [true, 'Please enter product price'] },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [4, 'Stock cannot exceed 4 characters'],
  },
  ratings: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  isFeatured: Boolean,
  isVisible: Boolean,
  isOnSale: Boolean,
  salePrice: Number,
  saleStarts: Date,
  saleEnds: Date,
  variations: { type: [variationSchema] },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
