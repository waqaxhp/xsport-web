import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TopTrending() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch JSON data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/Data/Data.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  if (!products.length) {
    return <p>Loading...</p>;
  }

  const currentProduct = products[currentIndex];

  return (
    <motion.div
      className="m-10 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-6 shadow-md md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Left side image */}
      <motion.div
        className="flex w-full justify-center p-4 md:w-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={Topgirl}
          alt="Top Trending"
          className="h-100 w-full max-w-sm rounded-lg object-cover"
        />
      </motion.div>

      {/* Right side slider */}
      <div className="flex w-full flex-col items-center p-4 md:w-1/2">
        <motion.h2
          className="mb-4 text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          TOP TRENDING
        </motion.h2>

        <motion.div
          className="relative flex h-80 w-full max-w-sm items-center justify-center rounded-lg bg-white shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={prevImage}
            className="absolute left-0 z-10 p-3 text-2xl text-gray-500 hover:text-black"
          >
            &#8249;
          </button>
          <Link to="/shop">
            <motion.img
              key={currentIndex}
              src={currentProduct.imageUrl}
              alt={currentProduct.title}
              className="h-full w-full rounded-lg object-contain"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
          <button
            onClick={nextImage}
            className="absolute right-0 z-10 p-3 text-2xl text-gray-500 hover:text-black"
          >
            &#8250;
          </button>
        </motion.div>

        {/* Product details */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">{currentProduct.category}</p>
          <h3 className="text-lg font-semibold">{currentProduct.title}</h3>
          <motion.div
            className="mt-2 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {[...Array(Math.round(currentProduct.rating))].map((_, index) => (
              <motion.span
                key={index}
                className="text-xl text-yellow-500"
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                &#9733;
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            className="mt-2 font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            ${currentProduct.price.toFixed(2)}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
