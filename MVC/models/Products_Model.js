const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 1,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  discountPercentage: {
    type: Number,
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  stock: {
    type: Number,
    required: true,
  },

  brand: {
    type: String,
  },
  sku: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
  },
  reviews: [reviewSchema],
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
    default: 1,
  },

  meta: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    barcode: {
      type: String,
    },
    qrCode: {
      type: String,
    },
  },
  images: {
    type: [String],
  },
  colors: {
    type: [String],
  },
  size: {
    type: [String],
  },
  tags: [String],
  thumbnail: {
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
