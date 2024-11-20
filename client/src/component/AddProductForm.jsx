import React, { useEffect, useRef, useState } from "react"
import Products from "./Products"

const AddProductForm = () => {
  const [imageURL, setImageURL] = useState("")
  const [products, setProducts] = useState([])
  const [image, setImage] = useState(null)
  const [lazyLoad, setLazyLoad] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0] // Get the selected file
    if (file) {
      setImage(file) // Store the file in the state
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/v1/products", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch products.")
      }

      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.log("Error fetching products", error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const name = useRef()
  const price = useRef()

  // Handle image upload
  const handleImageUpload = async () => {
    const formData = new FormData()

    formData.append("image", image) // Append the selected image file

    try {
      // const response = await axios.post("/api/v1/products/uploads", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data", // Set content type for file upload
      //   },
      // })

      const response = await fetch("/api/v1/products/uploads", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error uploading image.")
      }

      const data = await response.json()
      setImageURL(data.image.src)
    } catch (error) {
      console.log("Error uploading image:", error)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    setLazyLoad(true)
    e.preventDefault()

    // If image is provided, upload it first
    if (image) {
      await handleImageUpload()
    }

    // Once image is uploaded and imageURL is set, submit the form with name, price, and imageURL
    const finalFormData = {
      name: name.current.value,
      price: price.current.value,
      image: imageURL, // Include the imageURL in the final submission
    }

    try {
      const response = await fetch("/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit the form.")
      }

      const data = await response.json()
      setLazyLoad(false)
      fetchProducts()
    } catch (error) {
      setLazyLoad(false)
      console.log("Error submitting form:", error)
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              ref={name}
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              ref={price}
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Choose File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange} // Handle file selection
              className="mt-1 block w-full text-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {lazyLoad ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* Display the fetched products */}
      <Products products={products}></Products>
    </>
  )
}

export default AddProductForm
