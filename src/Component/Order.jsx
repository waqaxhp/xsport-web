import React, { useState, useEffect } from "react";
import Header from "./Header";

const Order = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData.Order[0])) // Access the first object in the Order array
      .catch((error) => console.error("Error loading JSON data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { header, content } = data;

  return (
    <>
      <div className="w-full">
        <Header name={header.name} />
      </div>
      <div className="flex flex-col items-center bg-white px-4 py-10 md:px-10 lg:px-20">
        <h1 className="mb-2 text-center text-2xl font-bold uppercase">
          {content.title}
        </h1>

        <div className="flex w-full max-w-[70%] flex-col items-center">
          <p className="text-center text-gray-600">{content.description}</p>
          {content.inputs.map((input) => (
            <div key={input.id} className="w-full">
              <label
                className="mb-1 block text-center text-gray-700"
                htmlFor={input.id}
              >
                {input.label}
              </label>
              <input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                className="mb-4 w-full border border-gray-300 px-4 py-2 italic outline-none focus:border-black"
              />
            </div>
          ))}
          <button className="w-60 items-center bg-black py-2 text-center font-semibold uppercase text-white transition duration-200 hover:bg-gray-800">
            {content.buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
