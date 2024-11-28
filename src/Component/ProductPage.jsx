import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ProductDetail = () => {
  const { productCode } = useParams(); // Get product code from URL
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // For selecting the number of products
  const [cart, setCart] = useState([]); // Cart state to track items

  useEffect(() => {
    // Fetch product data
    fetch("/Data/Products.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item) => item.code === productCode);
        setProduct(foundProduct);
        if (foundProduct) {
          setActiveImage(foundProduct.images[0]);
        }
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [productCode]);

  if (!product) {
    return (
      <div className="text-center text-red-500">Product was not found.</div>
    );
  }

  const handleAddToCart = () => {
    const itemInCart = cart.find((item) => item.code === product.code);
    if (itemInCart) {
      // Update quantity if the item is already in the cart
      const updatedCart = cart.map((item) =>
        item.code === product.code
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new item to the cart
      setCart([...cart, { ...product, quantity }]);
    }
    alert(`${quantity} ${product.title}(s) added to cart.`);
  };

  const handleImageClick = (image) => {
    setActiveImage(image); // Set the clicked image as the active image
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <Header name={product.title} />
      <div className="max-w-7xl mx-auto p-6 md:flex md:space-x-6">
        {/* Left Section: Product Images */}
        <div className="md:w-1/2">
          <div className="relative">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(activeImage)}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setActiveImage(image)}
                className={`w-16 h-16 object-cover rounded-lg border ${
                  image === activeImage ? "border-black" : "border-gray-300"
                } hover:scale-110 transition-transform cursor-pointer`}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-1/2 space-y-4">
          <div>
            <span className="text-gray-500 text-sm">{product.category}</span>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold text-green-600">
              {product.price}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-yellow-500">{product.rating}</p>
            <span className="text-gray-500">{product.reviews}</span>
          </div>
          <div>
            <p className="text-gray-500">
              👁️ {product.viewers} people are viewing this product right now
            </p>
            <p className="text-gray-500">
              🔥 {product.sold} items sold in the last 3 hours
            </p>
          </div>
          <p className="text-gray-700">
            Estimated delivery: {product.deliveryEstimate}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 text-center border rounded-lg"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition">
              Buy Now
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold">Delivery</h2>
            <p className="text-gray-500">{product.freeDelivery}</p>
            <p className="text-gray-500">{product.deliveryInfo}</p>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
              <button
                className="absolute top-2 right-2 text-black text-lg font-bold"
                onClick={closeModal}
              >
                ✕
              </button>
              <img
                src={activeImage}
                alt="Full Image"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
