import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetching the blog data from Data.json
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/Data.json");
        const data = await response.json();
        setBlogPosts(data.blogPosts); // Assuming 'blogPosts' is the key in your JSON
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 3 posts per page on large screens
  const itemsPerPage = 3;

  // Calculate the visible items based on current index and items per page
  const visiblePosts = blogPosts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  // Go to the next set of items
  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + itemsPerPage) % blogPosts.length
    );
  };

  // Go to the previous set of items
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - itemsPerPage + blogPosts.length) % blogPosts.length
    );
  };

  return (
    <div className="relative rounded-lg bg-gray-100 px-4 py-6 shadow-md">
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
      >
        &#8249;
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={post.image}
              alt="Blog Post"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              {/* {/ Date and Category /} */}
              <div className="mb-2 flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-gray-800 shadow-lg">
                  <p className="text-center text-xs">{post.date}</p>
                </div>
                <span className="ml-3 rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
              </div>
              {/* {/ Title /} */}
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                {post.title}
              </h5>
              {/* {/ Description /} */}
              <p className="mb-3 text-sm text-gray-700">{post.description}</p>
              {/* {/ Continue Reading Button /} */}
              <Link to={`/blog/${post.id}`}>
                <button className="mt-2 rounded bg-black px-4 py-2 text-xs font-bold uppercase text-white transition hover:bg-gray-800">
                  Continue Reading
                </button>
              </Link>
              {/* {/ Author Info /} */}
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>by {post.author}</span>
                <span className="ml-4">&#x1F4AC; 0</span>
                <span className="ml-4">&#x1F5E8; 0</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
      >
        &#8250;
      </button>
    </div>
  );
}

export default Blogs;
