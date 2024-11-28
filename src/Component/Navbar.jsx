import React, { useEffect, useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(""); // "cart" or "wishlist"
  const [logoPath, setLogoPath] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch navbar configuration from JSON
    fetch("/Data/Data.json") // Ensure JSON file is in the public/Data folder
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch navbar config");
        }
        return response.json();
      })
      .then((data) => {
        setLogoPath(data.logo || "");
        setMenuItems(data.menuItems || []);
        setWishlistItems(data.wishlistItems || []);
        setCartItems(data.cartItems || []);
      })
      .catch((error) => {
        console.error("Error fetching navbar config:", error);
      });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearchModal = () => setIsSearchModalOpen(!isSearchModalOpen);
  const openModal = (type) => {
    setActiveModal(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveModal("");
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Burger Icon */}
        <FiMenu
          className="text-lg hover:text-[#c8ff0b] cursor-pointer md:hidden"
          onClick={toggleSidebar}
        />
        {/* Logo */}
        <Link to="/">
          <img src={logoPath} alt="Logo" className="h-8" />
        </Link>
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.link}
              key={index}
              className="hover:text-[#c8ff0b]"
            >
              {item.name.toUpperCase()}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FiSearch
            className="text-lg hover:text-[#c8ff0b] cursor-pointer hidden sm:block"
            onClick={toggleSearchModal}
          />
          <span className="relative hidden lg:block">|</span>
          <div
            className="relative hidden sm:block"
            onClick={() => openModal("wishlist")}
          >
            <FiHeart className="text-lg hover:text-[#c8ff0b] cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-[#c8ff0b] text-black rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          </div>
          <span className="relative hidden lg:block">|</span>
          <div className="relative" onClick={() => openModal("cart")}>
            <FiShoppingCart className="text-lg hover:text-[#c8ff0b] cursor-pointer" />
            <span className="absolute -top-2 -right-4 bg-[#c8ff0b] text-black rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-black p-4 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="mb-4 text-gray-600" onClick={toggleSidebar}>
          <AiOutlineClose className="text-2xl" />
        </button>
        <nav>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block text-lg py-2 hover:text-[#c8ff0b]"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Search Modal */}
      <div
        className={`fixed inset-x-0 top-0 z-30 transform bg-white p-8 transition-transform ${
          isSearchModalOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute right-4 top-4">
          <button onClick={toggleSearchModal}>
            <AiOutlineClose className="text-2xl text-gray-800" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg italic text-gray-800">
            What Are You Looking For?
          </h2>
          <div className="mt-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Search for..."
              className="w-full rounded border border-gray-300 px-4 py-2 italic text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mt-8 text-center">
          <h3 className="text-lg italic text-gray-800">Popular Categories</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {[
              { name: "Asphalt Running", count: 10 },
              { name: "Casual Styles", count: 10 },
              { name: "Cushioned Shoes", count: 10 },
              { name: "Hiking Travelling", count: 10 },
              { name: "Sneakers", count: 11 },
              { name: "Trail Running", count: 10 },
            ].map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-24 w-24 bg-gray-200"></div>
                <h4 className="mt-3 text-sm italic text-gray-800">
                  {category.name}
                </h4>
                <p className="text-xs italic text-gray-600">
                  {category.count} products
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* View All Categories */}
        <div className="mt-8 flex justify-center">
          <button className="rounded bg-black px-8 py-2 text-sm italic text-white">
            View All Categories
          </button>
        </div>
      </div>

      {/* Cart/Wishlist Modal */}
      <div
        className={`fixed inset-y-0 z-40 right-0 bg-white text-black w-80 p-4 transition-transform ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <h2 className="italic">
            {activeModal === "cart" ? "Shopping Cart" : "Wishlist"}
          </h2>
          <button onClick={closeModal}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
        <div className="mt-4">
          {(activeModal === "cart" ? cartItems : wishlistItems).map(
            (item, index) => (
              <div key={index} className="flex justify-between py-2 border-b">
                <div>
                  <p>{item.name}Hiking Boots</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover"
                />
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
