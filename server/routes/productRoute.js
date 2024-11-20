const expres = require("express")
const router = expres.Router()

const {
  createProduct,
  getAllProduct,
} = require("../controllers/productController")

const { uploadProductImage } = require("../controllers/uploadController")

router.route("/").post(createProduct).get(getAllProduct)
router.route("/uploads").post(uploadProductImage)

module.exports = router
