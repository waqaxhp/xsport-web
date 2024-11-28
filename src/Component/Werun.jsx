import React, { useEffect, useState } from "react";

function Werun() {
  const [collectionData, setCollectionData] = useState(null);
  // Fetching JSON data
  useEffect(() => {
    fetch("/Data/Data.json") // Replace with the correct path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        setCollectionData(data.Werun); // Adjust to your JSON structure
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const backgroundImage = collectionData ? collectionData.backgroundImage : "";
  return (
    <>
      <div className="relative w-full h-[500px] bg-black text-white overflow-hidden">
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed opacity-30"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>

        {/* Content Overlay */}
        <div className="relative flex h-full items-center justify-end text-center px-4 sm:px-10 lg:px-20">
          <div className="space-y-4">
            {/* Subtitle */}
            <p className="text-lg font-semibold text-lime-400">
              {collectionData ? collectionData.subtitle : ""}
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold uppercase lg:text-5xl">
              {collectionData ? collectionData.title : ""}
            </h1>

            {/* Description */}
            <p className="text-md font-light">
              {collectionData ? collectionData.description : ""}
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button className="mt-4 transform rounded-md bg-white px-6 py-3 text-sm font-semibold uppercase italic text-black transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-lime-400">
                {collectionData ? collectionData.buttonLabels.men : "SHOP MEN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Werun;
