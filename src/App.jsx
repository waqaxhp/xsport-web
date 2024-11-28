import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import SingleBlog from "./Component/SingleBlog";
import ProductPage from "./Component/ProductPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <ProductPage /> */}
      <Footer />
    </>
  );
}
