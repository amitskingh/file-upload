require("dotenv").config()
require("express-async-errors")

const express = require("express")
const connect = require("./db/connect")
const app = express()

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const fileUpload = require("express-fileupload")

const cloudinary = require("cloudinary").v2

const productRouter = require("./routes/productRoute")
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

const cors = require("cors")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

app.use(cors())
app.use("/api/v1/products", productRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(3000, () => {
      console.log("server is listening at port 3000")
    })
  } catch (error) {
    console.log(error)
  }
}

start()
