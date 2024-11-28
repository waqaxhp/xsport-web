import React, { useState, useEffect } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((jsonData) => setBrands(jsonData.brands))
      .catch((error) => console.error("Error loading JSON data:", error));
  }, []);

  if (!brands.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gray-100 px-4 py-6">
      {brands.map((brand) => (
        <img
          key={brand.id}
          src={brand.imageSrc}
          alt={brand.altText}
          className="h-12 sm:h-16 md:h-20 lg:h-24"
        />
      ))}
    </div>
  );
}
