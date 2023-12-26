import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from "../pages/Home";
const Layout = () => {
  console.log("hi")
  return (
    <>
      <Header />
      {/* <Outlet /> */}
      <Home />
      <Footer />
    </>
  );
};

export default Layout;
