// import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Component/Home.jsx";
import Shop from "./Component/Shop.jsx";
import Aboutus from "./Component/Aboutus.jsx";
import Contactus from "./Component/Contactus.jsx";
import Order from "./Component/Order.jsx";
import SingleBlog from "./Component/SingleBlog.jsx";
import ProductPage from "./Component/ProductPage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path={"/shop"} element={<Shop />} />
        <Route
          path="/shop/productpage/:productCode"
          element={<ProductPage />}
        />
        <Route path={"/about-us"} element={<Aboutus />} />
        <Route path={"/contact-us"} element={<Contactus />} />
        <Route path={"/order"} element={<Order />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
