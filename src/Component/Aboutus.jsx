import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";

function Aboutus() {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch about us data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Check if data is fetched
        setAboutUsData(data.Aboutus[0]); // Assuming there's one item in the Aboutus array
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header name={"About Us"} />
      <div className="bg-white pb-10">
        <div className="relative p-5">
          {/* Main Image from JSON */}
          <img
            src={aboutUsData.mainImage} // Dynamically using main image from JSON
            alt="Main About Us"
            className="w-full object-cover"
            style={{ maxHeight: "500px" }}
          />
        </div>

        {/* Text and Icons Section */}
        <div className="px-6 text-center md:px-12 md:text-left lg:px-24">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4 mt-10 text-3xl font-bold text-black"
          >
            {aboutUsData.title}
          </motion.h2>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-sm text-gray-600"
          >
            {aboutUsData.description}
          </motion.p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {/* Icon Text Blocks */}
            {aboutUsData.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center md:items-start"
              >
                <img
                  src={section.icon} // Directly use the image path from JSON
                  alt={section.title}
                  className="mb-2 h-10 w-10"
                />
                <span className="font-semibold text-black">
                  {section.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
