import React, { useState, useEffect } from "react";

const NewCollection = () => {
  const [data, setData] = useState(null);

  // Fetch data from the JSON file
  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        console.log(json); // Log the fetched data to check
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // If data is not yet loaded, show loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black px-5 py-10 text-white" id="scroll_down">
      <h1 className="mb-5 text-center text-4xl font-bold text-white md:text-6xl">
        {data.newCollection.title}
      </h1>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        {data.newCollection.sections.map((section, index) => (
          <div
            key={index}
            className="w-full bg-black p-5 text-white shadow-lg md:w-1/3"
          >
            <div className="overflow-hidden">
              <img
                src={section.image}
                alt={section.name}
                className="h-50 mb-4 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-bold">{section.name}</h3>
            <p className="mb-4 text-sm">{section.description}</p>
            <a href={section.buttonLink}>
              <button className="transform rounded-md bg-white px-4 py-2 font-bold text-black transition-colors duration-300 ease-in-out hover:bg-[#c8ff0b] hover:text-black">
                {section.buttonText}
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
