const Product = require("../models/Product")

const createProduct = async (req, res) => {
  console.log(req.body)

  const product = await Product.create(req.body)

  console.log(product)

  res.status(201).json({ product })
}

const getAllProduct = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products })
}

module.exports = {
  createProduct,
  getAllProduct,
}
