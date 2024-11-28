import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function InteractiveCards() {
  const [productData, setProductData] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [hoverTimeout, setHoverTimeout] = useState(null); // For managing the timeout

  useEffect(() => {
    // Fetching the JSON data from the public folder
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/Data.json"); // Path to your JSON file
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Extract background image and product data
        setBackgroundImage(data.InteractiveCards[0].backgroundImage); // Get the background image from the first object
        setProductData(data.InteractiveCards.slice(1)); // Get product data, skipping the first element which contains the background image
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (product) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the hover card after 5 seconds
    const timeout = setTimeout(() => {
      setHoveredProduct(null);
    }, 5000);
    setHoverTimeout(timeout);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="pluscard_main relative h-2/4 w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Using background image from JSON
        height: "80vh",
      }}
    >
      {productData.map((product) => (
        <Link to="/shop">
          <div
            key={product.id}
            className="glow absolute flex h-16 w-16 transform cursor-pointer items-center justify-center rounded-full p-4 transition-transform hover:scale-110"
            style={{
              top: product.iconPosition.top,
              left: product.iconPosition.left,
              borderRadius: "50%",
              backgroundColor: "#84cc16", // Green background for the glow
              animation: "glow 1.5s infinite", // Glow animation
            }}
            onMouseEnter={() => handleMouseEnter(product)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-lg font-bold text-white">+</span>
          </div>
        </Link>
      ))}

      {hoveredProduct && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 ease-in-out">
          <div
            className="max-w-xs scale-105 transform rounded-lg bg-white p-2 text-center shadow-lg transition-transform"
            style={{
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={hoveredProduct.imageUrl}
              alt={hoveredProduct.name}
              className="mb-4 h-40 w-full object-contain"
            />
            <h3 className="text-sm text-gray-500">{hoveredProduct.title}</h3>
            <h2 className="text-lg font-semibold text-gray-800">
              {hoveredProduct.name}
            </h2>
            <p className="text-lg font-bold text-gray-700">
              {hoveredProduct.price}
            </p>
            <div className="mt-2 text-yellow-500">
              {"★".repeat(hoveredProduct.rating)}
              {"☆".repeat(5 - hoveredProduct.rating)}
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes glow {
            0%, 100% {
              box-shadow:
                0 0 10px rgba(255, 215, 0, 0.5),
                0 0 20px rgba(255, 215, 0, 0.3),
                0 0 30px rgba(255, 215, 0, 0.2);
            }
            50% {
              box-shadow:
                0 0 20px rgba(255, 215, 0, 0.7),
                0 0 30px rgba(255, 215, 0, 0.5),
                0 0 40px rgba(255, 215, 0, 0.3);
            }
          }
        `}
      </style>
    </div>
  );
}

export default InteractiveCards;
