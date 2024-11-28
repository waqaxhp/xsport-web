
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";

function Contactus() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading JSON data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { header, map, leftSection, formPlaceholders, button } = data;

  return (
    <>
      <Header name={header.name} />
      <iframe
        title="Google Map"
        src={`https://maps.google.com/maps?q=${map.latitude},${map.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        width="100%"
        height="500px"
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>

      <div className="bg-white px-4 py-10 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 md:flex-row">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="mb-4 text-4xl font-bold text-black">
              {leftSection.title}
            </h2>
            <p className="mb-8 text-base text-gray-700">
              {leftSection.description}
            </p>
            <div className="space-y-4">
              {leftSection.contactDetails.map((detail, index) => (
                <div key={index} className="flex items-center">
                  {detail.value && (
                    <>
                      <span className="mr-2 font-semibold text-black">
                        {detail.label}
                      </span>
                      <span className="text-gray-700">{detail.value}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <form className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={formPlaceholders.name}
                  className="w-full border-b-2 border-gray-300 pb-2 text-lg focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder={formPlaceholders.email}
                  className="w-full border-b-2 border-gray-300 pb-2 text-lg focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder={formPlaceholders.message}
                  className="h-32 w-full resize-none border-b-2 border-gray-300 pb-2 text-lg focus:border-gray-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-black px-6 py-3 font-semibold text-white transition duration-300 hover:bg-gray-700"
              >
                {button.text}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Contactus;
