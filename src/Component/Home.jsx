import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion"; // For animation
import NewCollection from "./NewCollection";
import InteractiveCards from "./InteractiveCards";
import Whatsnew from "./Whatsnew";
import TrailColection from "./TrailColection";
import BestSellers from "./BestSellers";
import Blogs from "./Blogs";
import Werun from "./Werun";
import JoinInstagram from "./JoinInstagram";
import DeliveryAndReturns from "./DeliveryAndReturns";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0); // For progress display

  // Create a ref for the next section (NewCollection)
  const newCollectionRef = useRef(null);

  // Scroll to the next section
  const scrollToNextSection = () => {
    if (newCollectionRef.current) {
      newCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle scrolling to show the button and calculate scroll percentage
  const handleScrollEvent = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    setScrollPercentage(scrollPercent);

    // Show the button when scrolled down a bit
    if (scrollTop > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));

    // Add scroll event listener
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="relative w-full h-screen bg-black text-white overflow-hidden">
        {/* Background Image */}
        <img
          src={data.backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Radio Buttons (Fixed Position) */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
          {data.shoeImages.map((_, index) => (
            <label
              key={index}
              className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-125"
            >
              <input
                type="radio"
                name="shoeImage"
                checked={selectedImageIndex === index}
                onChange={() => setSelectedImageIndex(index)}
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedImageIndex === index
                    ? "bg-lime-500 border-lime-500"
                    : "bg-transparent border-white"
                }`}
              ></span>
            </label>
          ))}
        </div>

        <div className="w-full flex items-center justify-center flex-row h-full mx-4 sm:mx-16 md:mx-24 lg:mx-60">
          {/* Main Content */}
          <div className="relative flex flex-col items-center justify-center h-full sm:flex-row sm:space-x-20">
            <div className="text-center sm:mx-8">
              <p className="text-sm text-lime-500 sm:text-lg">
                {data.content.tagline}
              </p>
              <h1 className="text-3xl font-bold uppercase sm:text-5xl lg:text-6xl">
                {data.content.heading}
              </h1>
            </div>

            {/* Shoe Image Section */}
            <div
              className="relative transition-transform duration-500 transform scale-95 hover:scale-150 "
              key={`shoe-${selectedImageIndex}`}
            >
              <Link to="/shop">
                <img
                  src={data.shoeImages[selectedImageIndex].src}
                  alt={data.shoeImages[selectedImageIndex].alt}
                  className="w-2/3 sm:w-1/3"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div
          className="absolute bottom-10 w-full flex flex-col items-center justify-center cursor-pointer text-center animate-bounce"
          onClick={scrollToNextSection} // Trigger scroll on click
        >
          <p className="text-sm mt-2 text-gray-300">{data.content.subText}</p>
          <FaChevronDown className="ml-2 text-lime-500 text-xl animate-pulse" />
        </div>
      </div>

      {/* Sections */}
      <div ref={newCollectionRef}>
        <NewCollection />
      </div>
      <InteractiveCards />
      <Whatsnew />
      <TrailColection />
      <BestSellers />
      <Blogs />
      <Werun />
      <JoinInstagram />
      <DeliveryAndReturns />

      {/* Back to Top Button */}
      {showScrollButton && (
        <motion.div
          className="fixed bottom-5 right-5 z-50 cursor-pointer rounded-full p-5 shadow-lg"
          whileHover={{ scale: 1.2 }}
          onClick={scrollToTop}
          style={{
            background: `conic-gradient(
              #4caf50 ${scrollPercentage}%, 
              #ddd ${scrollPercentage}% 100%
            )`,
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaArrowUp className="text-lg text-black" />
        </motion.div>
      )}
    </>
  );
};

export default Home;
