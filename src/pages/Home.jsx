import React from "react";
import Header from "../layout/header/Header";
import Products from "../layout/main/products";
import { CartProvider } from "react-use-cart";
import Footer from "../layout/footer/footer";
import Navbar from "../layout/header/Navbar";

function Home() {
  return (
    <div className="main">
      <CartProvider>
        <Navbar />
        <Header />
        <Products />
        <Footer />
      </CartProvider>
    </div>
  );
}

export default Home;
