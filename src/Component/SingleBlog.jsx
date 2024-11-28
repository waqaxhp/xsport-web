import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import Header from "./Header";

function SingleBlog() {
  const { id } = useParams(); // Get the id from the URL
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    // Fetch the blog data based on the id
    fetch("/Data/Blogs.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedBlog = data.find((blog) => blog.id === parseInt(id));
        setBlogData(selectedBlog);
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, [id]);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header name={blogData.title} />
      <div className="max-w-5xl mx-auto p-4">
        {/* Main Image */}
        <div className="mb-8">
          <img
            src={blogData.mainImage}
            alt="Main Blog"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Title and Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {blogData.date} | Posted by {blogData.author} |{" "}
            {blogData.commentsCount} Comments
          </p>
          <div className="space-y-4 text-gray-700">
            {blogData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Secondary Image with Text */}
        <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
          <div className="flex-1">
            <img
              src={blogData.secondaryImage}
              alt="Secondary Blog"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">{blogData.quote}</h2>
            <p className="text-gray-700">{blogData.secondaryParagraph}</p>
          </div>
        </div>

        {/* Footer Social Icons */}
        <div className="flex justify-center space-x-6 text-gray-500 text-xl">
          {blogData.socialIcons.map((icon, index) => {
            const IconComponent = getIconComponent(icon.name);
            return (
              <a
                key={index}
                href={icon.link}
                className="hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

function getIconComponent(name) {
  switch (name) {
    case "facebook":
      return FaFacebookF;
    case "twitter":
      return FaTwitter;
    case "instagram":
      return FaInstagram;
    case "linkedin":
      return FaLinkedinIn;
    case "pinterest":
      return FaPinterestP;
    default:
      return null;
  }
}

export default SingleBlog;
