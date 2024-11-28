import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function JoinInstagram() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch JSON data
    fetch("/Data/Data.json") // Update path if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData.JoinInstagram[0])) // Access the first item in the array
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    // Loading state
    return <div>Loading...</div>;
  }

  const { heading, username, description, website, imageUrl } = data;

  return (
    <motion.section
      className="flex flex-col items-center px-4 py-10 lg:flex-row lg:justify-between lg:px-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Left Side Text */}
      <motion.div
        className="w-full text-center lg:w-1/2 lg:text-left"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        <motion.h2
          className="mb-4 text-3xl font-bold lg:text-5xl"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="mb-4 text-2xl font-semibold"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {username}
        </motion.p>
        <motion.p
          className="text-gray-600"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {description}
        </motion.p>
        <motion.p
          className="mt-4 text-gray-600"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {website}
        </motion.p>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        className="mt-8 flex w-full lg:mt-0 lg:w-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={imageUrl}
          alt="Instagram collage of xsportshoes"
          className="h-full w-full rounded object-cover"
        />
      </motion.div>
    </motion.section>
  );
}

export default JoinInstagram;
