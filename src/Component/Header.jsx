import { FaChevronRight } from "react-icons/fa6";

function Header({ name }) {
  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: 'url("/content/Images/Background.jpg")',
          height: "40vh",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <p className="mb-2 flex items-center justify-center text-sm text-lime-300">
            <a href={"/"} className="mr-1">
              HOME
            </a>{" "}
            <FaChevronRight className="mx-1" />
          </p>
          <h1 className="text-4xl font-bold italic">{name}</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
