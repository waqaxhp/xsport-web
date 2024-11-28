import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Simulating fetching data from JSON
    const fetchData = async () => {
      const response = await fetch("/Data/Data.json");
      const data = await response.json();
      setFooterData(data.footer);
    };
    fetchData();
  }, []);

  if (!footerData) return <p>Loading...</p>;

  const { availability, socialMedia, links, subscription, copyright } =
    footerData;

  return (
    <footer
      className="footer_main bg-cover bg-center px-4 py-10 text-white"
      style={{
        backgroundImage: `url('/content/Images/\Pattern.jpg')`,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* {/ Top section with availability and contact number /} */}
        <div className="footer-top mb-8 flex flex-col items-center justify-between space-y-4 border-b border-gray-700 pb-6 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 text-center text-sm md:flex-row md:space-x-4 md:space-y-0 md:text-left">
            <p>We are available</p>
            <span className="font-bold">{availability.hours}</span>
            <div className="flex items-center space-x-2">
              <FaPhone />
              <span>{availability.phone}</span>
            </div>
          </div>

          {/* {/ Social media icons /} */}
          <div className="flex space-x-4 text-lg">
            {socialMedia.map((social, index) => {
              const Icon = {
                FaFacebookF,
                FaXTwitter,
                FaInstagram,
                FaYoutube,
                FaTelegramPlane,
              }[social.icon];
              return (
                <a key={index} href={social.link} aria-label={social.name}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* {/ Main footer links and subscription /} */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* {/ Company Links /} */}
          <div>
            <h4 className="mb-2 font-bold">COMPANY</h4>
            <ul>
              {links.company.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* {/ Support Links /} */}
          <div>
            <h4 className="mb-2 font-bold">SUPPORT</h4>
            <ul>
              {links.support.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* {/ Subscription Form /} */}
          <div>
            <h4 className="mb-2 font-bold">SUBSCRIBE</h4>
            <p className="mb-4 text-sm">
              Enter your email address to get{" "}
              <span className="font-bold">{subscription.offerText}</span>
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder={subscription.placeholder}
                className="mb-2 w-full rounded bg-white p-2 text-black placeholder-gray-600 sm:mb-0 sm:mr-2"
              />
              <button
                type="submit"
                className="w-full rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 sm:w-auto"
              >
                {subscription.buttonText}
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-300">
              {subscription.disclaimer}
            </p>
          </div>
        </div>

        {/* {/ Bottom copyright section /} */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm md:text-left">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
