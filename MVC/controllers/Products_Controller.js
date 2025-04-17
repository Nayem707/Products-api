const asyncHandler = require('express-async-handler');
const Product = require('../models/Products_Model');

//---> GET:: api/v1/product - GET ALL PRODUCTS
const getAllProduct = asyncHandler(async (req, res) => {
  const {
    category,
    title,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 10,
    colors,
    size,
  } = req.query;

  // Initialize query object
  let queryObject = {};

  // Apply category filter
  if (category) queryObject.category = category;

  // Apply title filter
  if (title) queryObject.title = { $regex: title, $options: 'i' };

  // Apply price range filter
  if (minPrice || maxPrice) {
    queryObject.price = {};
    if (minPrice) queryObject.price.$gte = Number(minPrice);
    if (maxPrice) queryObject.price.$lte = Number(maxPrice);
  }

  // Apply colors filter (array of colors or single color)
  if (colors) {
    const colorsArray = colors.split(',');
    queryObject.colors = { $in: colorsArray };
  }

  // Apply Size filter (array of Size or single Size)
  if (size) {
    const sizeArray = size.split(',');
    queryObject.size = { $in: sizeArray };
  }

  // Get total number of matching products
  const totalProducts = await Product.countDocuments(queryObject);

  // Execute the query
  let result = Product.find(queryObject);

  // Apply sorting
  if (sort) {
    const sortBy = sort.split(',').join(' ');
    result = result.sort(sortBy);
  } else {
    result = result.sort('createdAt');
  }

  // Apply pagination
  const pageNumber = Number(page);
  const pageLimit = Number(limit);
  const skip = (pageNumber - 1) * pageLimit;

  result = result.skip(skip).limit(pageLimit);

  // Fetch the products
  const products = await result;

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / pageLimit);

  // Send response with products and pagination info
  res.status(200).json({
    success: true,
    totalProducts,
    showProducts: products.length,
    totalPages,
    activePage: pageNumber,
    limit: pageLimit,
    skip,
    data: products,
  });
});

//---> POST:: api/v1/product -> CREATE PRODUCTS
const createProduct = asyncHandler(async (req, res) => {
  // Extract product data from the request body
  const {
    amount,
    featured,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    minimumOrderQuantity,
    images,
    colors,
    size,
    thumbnail,
  } = req.body;

  // Create a new product document
  const product = await Product.create({
    amount,
    featured,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    minimumOrderQuantity,
    images,
    colors,
    size,
    thumbnail,
    reviews: [],
    numOfReviews: 0,
  });

  // Return success response with created product data
  res.status(201).json({
    success: true,
    message: 'Product created successfully!',
    data: product,
  });
});

//---> GET:: api/v1/product/id
const singleProduct = asyncHandler(async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by its ID in the database
    const product = await Product.findById(id);

    // Check if the product was found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Return the product details in the response
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//---> PATCH:: api/v1/product/:id
const updateProduct = async (req, res) => {
  res.send('Update Products');
};

//---> DELETE:: api/v1/product/:id
const deleteProduct = async (req, res) => {
  res.send('Delete Products');
};

module.exports = {
  getAllProduct,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
