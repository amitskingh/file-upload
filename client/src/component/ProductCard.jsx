const ProductCard = ({ product }) => (
  <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded-md"
    />
    <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-600 text-sm">${product.price}</p>{" "}
    {/* Displaying price */}
  </div>
)

export default ProductCard
