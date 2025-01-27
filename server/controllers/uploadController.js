const path = require("path")
const Product = require("../models/Product")
const CustomError = require("../errors")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded")
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image")
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please Upload Image smaller that 1MB"
    )
  }

  const imagePath = path.join(
    __dirname,
    "../../tailwind/public/uploads/" + `${productImage.name}`
  )

  await productImage.mv(imagePath)

  res.status(200).json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadProductImage = async (req, res) => {
  console.log(req.files)

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      folder: "file-upload",
    }
  )

  fs.unlinkSync(req.files.image.tempFilePath)

  console.log(result)

  res.status(200).json({ image: { src: result.secure_url } })
}

module.exports = {
  uploadProductImage,
}
