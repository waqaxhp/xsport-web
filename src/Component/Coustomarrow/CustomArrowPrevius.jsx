import React from "react";

function CustomArrowPrevious({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 z-50 -translate-y-1/2 transform cursor-pointer rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-600"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        marginLeft: "10px", // Optional: adds spacing from the left edge
      }}
    >
      {/* Left arrow SVG icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default CustomArrowPrevious;
