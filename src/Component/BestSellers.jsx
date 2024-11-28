import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomArrowNext from "./Coustomarrow/CustomArrowNext";
import CustomArrowPrevious from "./Coustomarrow/CustomArrowPrevius";

// Slick Slider settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <CustomArrowNext />,
  prevArrow: <CustomArrowPrevious />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

// Product Card Component
function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        <img
          src={isHovered ? product.hoverImageUrl : product.imageUrl}
          alt={product.title}
          className="mx-auto transform transition-transform duration-300 ease-in-out hover:scale-105"
        />
        {isHovered && (
          <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-sm font-semibold text-white transition-opacity duration-300 ease-in-out">
            👁️ Quick View
          </button>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">{product.category}</p>
        <h3 className="font-bold">{product.title}</h3>
        <div className="text-yellow-500">
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
        </div>
        <p className="font-semibold text-gray-700">{product.price}</p>
      </div>
    </div>
  );
}

// Best Sellers Component
const BestSellers = () => {
  // State to store products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from JSON or API
  useEffect(() => {
    // Assuming your JSON file is located in 'public/Data/BestSellers.json'
    fetch("/Data/BestSellers.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black text-white w-full p-10 m-auto">
      <h2 className="mb-6 text-center text-2xl font-bold">Best Sellers</h2>
      <p className="mb-10 text-center">
        <a href="/" className="underline">
          VIEW ALL ITEMS
        </a>
      </p>
      <div className="container relative mx-auto py-10">
        <Slider {...settings}>
          {products.map((product) => (
            <a href={`/shop/productpage/${product.code}`} key={product.code}>
              <ProductCard product={product} />
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSellers;
