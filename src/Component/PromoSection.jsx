import React, { useEffect, useState } from "react";

const PromoSection = () => {
  const [promoData, setPromoData] = useState([]);

  // Fetching the PromoSection data from JSON
  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((data) => setPromoData(data.PromoSection)) // Accessing the PromoSection key
      .catch((error) => console.error("Error fetching promo data:", error));
  }, []);

  return (
    <section className="py-10 px-4 md:px-10 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {promoData.map((promo, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md overflow-hidden h-64"
          >
            {/* Card Image */}
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white p-4">
              <h2 className="text-lg font-semibold">{promo.title}</h2>
              <p className="mt-2 text-sm">{promo.description}</p>
              <a
                href={promo.link}
                className="mt-4 px-6 py-2 bg-lime-500 text-white font-medium rounded hover:bg-lime-600 transition-colors"
              >
                {promo.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
