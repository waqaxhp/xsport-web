import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function DeliveryAndReturns() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch("/Data/Data.json") // Adjust the path if JSON file is not in the public folder
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData.DeliveryAndReturns))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="px-6 text-center md:px-12 md:text-left lg:px-24">
      <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4 md:gap-8">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start"
          >
            <img src={item.image} alt={item.title} className="mb-2 h-20 w-20" />
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 mt-10 text-3xl font-bold text-black"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 text-sm text-gray-600"
            >
              {item.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DeliveryAndReturns;
