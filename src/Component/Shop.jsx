import React, { useEffect, useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import PromoSection from "./PromoSection";
import Header from "./Header";

const NewCollection = () => {
  const [collections, setCollections] = useState([]); // State for all collections
  const [filteredCollections, setFilteredCollections] = useState([]); // State for filtered data
  const [activeFilter, setActiveFilter] = useState("All"); // Active filter
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [itemsPerPage] = useState(6); // Number of items per page

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/Products.json"); // Fetch JSON file
        const data = await response.json();
        setCollections(data); // Set full data
        setFilteredCollections(data); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Filter Change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredCollections(collections); // Show all
    } else {
      const filtered = collections.filter((item) => item.category === filter);
      setFilteredCollections(filtered); // Show filtered
    }
    setCurrentPage(1); // Reset page to 1 when filter changes
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header name={"Shop"} />
      <PromoSection className="pt-20" />
      <div className="flex min-h-screen bg-gray-100 relative">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-6 text-center">
          <h2 className="text-2xl font-semibold mb-6">Filter By Category</h2>
          <div className="space-y-4">
            {["All", "Men", "Shoes", "Women"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`w-full text-left px-4 py-2 rounded-md text-white font-medium transition-colors duration-300 ${
                  activeFilter === filter
                    ? "bg-lime-500 text-gray-900"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6 overflow-y-auto ">
          {" "}
          {/* Added margin-top to avoid navbar overlap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((collection) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <img
                  src={collection.images[0]} // Display the first image from the images array
                  alt={collection.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" // Reduced height for card
                />

                {/* Content */}
                <div className="p-4 text-center">
                  <div className="flex justify-between items-center">
                    <button className="text-gray-600 hover:text-[#c8ff0b] transition-colors duration-300">
                      <FaCartPlus size={20} />
                    </button>

                    <h3 className="text-sm font-semibold mb-2">
                      {collection.title}
                    </h3>

                    <button className="text-gray-600 hover:text-[#c8ff0b] transition-colors duration-300">
                      <FaHeart size={20} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600">
                    {collection.description}
                  </p>

                  {/* Price */}
                  <p className="text-lg font-semibold text-gray-800">
                    {collection.price}
                  </p>

                  {/* Cart and Wishlist Icons */}
                  <div className="flex justify-center items-center mb-4 space-x-4"></div>

                  {/* View Details Button */}

                  <Link to={`/shop/productpage/${collection.code}`}>
                    <button className="w-full py-1 px-4 border-2 border-gray-800 text-sm bg-gray-800 text-white font-medium uppercase transition-colors duration-300 hover:bg-[#c8ff0b] hover:text-gray-900">
                      Show Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 w-full">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-md mr-2 disabled:bg-gray-500"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md mr-2 ${
                  currentPage === index + 1
                    ? "bg-[#c8ff0b] text-gray-900"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-md ml-2 disabled:bg-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCollection;
