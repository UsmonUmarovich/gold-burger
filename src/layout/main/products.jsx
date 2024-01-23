import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useCart } from "react-use-cart";
import query from "../../services/api/api.service";

function Products() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState([]);

  const categories = [
    "Burger",
    "Lavash",
    "Pitsa",
    "Sous",
    "Ichimlik",
    "Desert",
  ];

  useEffect(() => {
    query.getAllProducts().then((res) => setProducts(res.data));
    query.getAllImages().then((res) => setImage(res.data));
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      {categories.map((category, index) => {
        return (
          <section key={index} className="products" id={category}>
            <div>
              <h1 className="products-title">{category}</h1>
              <div className="products-cont">
                {products.map((item, index) => {
                  return (
                    <>
                      {category == item.category ? (
                        <div key={index} className="products-content">
                          <div className="products-card" data-aos="fade-right">
                            {image.map((img, i) => {
                              return (
                                <>
                                  {item.id === img.id ? (
                                    <img
                                      key={i}
                                      src={img.img}
                                      className="products-img"
                                      alt="fast food"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                            <h1 className="products-name">{item.title}</h1>
                            <span className="products-description">
                              {item.desc}
                            </span>
                            <span className="products-price">
                              {item.price} so'm
                            </span>
                            <button
                              className="products-backet"
                              onClick={() => addItem(item)}
                            >
                              Savatga qo'shish
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default Products;
