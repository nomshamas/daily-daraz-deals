const DealCard = ({ deal }) => {
  const { title, image, price, originalPrice, category, link } = deal

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <div className="mb-3">
          <span className="text-xl font-bold text-green-600">
            Rs. {price}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              Rs. {originalPrice}
            </span>
          )}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          View Deal
        </a>
      </div>
    </div>
  )
}

export default DealCard
