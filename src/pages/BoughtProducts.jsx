import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import { Link, useParams } from "react-router-dom";
import query from "../services/api/api.service";

function BoughtProducts() {
  const [uow, setUOW] = useState([]);
  const [active, setActive] = useState(false);
  const [allimage, setAllImage] = useState([]);
  const { id } = useParams();

  const OpenModal = () => {
    setActive(true);
  };

  const CloseModal = () => {
    setActive(false);
  };

  query.getAllImages().then((res) => setAllImage(res.data));
  query.getAllBoughtProducts().then((res) => setUOW(res.data));
  return (
    <div className="buy">
      <div className="container">
        {uow.map((item, index) => {
          return (
            <div style={{ display: "flex", gap: "10px" }} key={index}>
              <Link
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.227)",
                  padding: "20px",
                  display: "flex",
                  gap: "10px",
                }}
                to={item._id}
                onClick={OpenModal}
              >
                <li style={{ listStyle: "circle" }}>
                  {item.name} {item.surname}
                </li>
                {item.time}
              </Link>
              {item._id === id ? (
                <>
                  <form className={active ? "buy-modal show" : "buy-modal"}>
                    <div className="buy-card">
                      <div>
                        <Link
                          to="/admin/buying"
                          className="buy-modal-close"
                          onClick={CloseModal}
                        >
                          <CloseIcon />
                        </Link>
                        <div className="buy-bg"></div>
                        <div
                          style={{
                            fontSize: "19px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            margin: "20px",
                          }}
                        >
                          <h1>
                            Ism:{" "}
                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                          </h1>
                          <h1>
                            Familiya:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {item.surname}
                            </span>
                          </h1>
                          <h1>
                            Telefon:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {item.phone}
                            </span>
                          </h1>
                          <h1>
                            Address:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {item.address}
                            </span>
                          </h1>
                          {item.comment === "" ||
                          !item.comment.trim() ? null : (
                            <h1>
                              Comment:{" "}
                              <span style={{ fontWeight: 600 }}>
                                {item.comment}
                              </span>
                            </h1>
                          )}
                          <h1>
                            Jami{" "}
                            <span style={{ fontWeight: 600 }}>
                              {item.totalPrice} so'm
                            </span>
                          </h1>
                        </div>
                      </div>
                      <section
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "23px",
                        }}
                      >
                        {item.products.map((item, index) => {
                          return (
                            <div
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.227)",
                                height: "400px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "0px 30px",
                              }}
                            >
                              {allimage.map((image, i) => {
                                return (
                                  <>
                                    {item.id === image.id ? (
                                      <img
                                        src={image.img}
                                        width={100}
                                        className="products-img"
                                        alt="fast food"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <h1 className="products-name">{item.title}</h1>
                                <span className="products-description">
                                  {item.desc}
                                </span>
                                <span className="products-price">
                                  {item.price} so'm
                                </span>
                                <span>{item.quantity} ta</span>
                              </div>
                            </div>
                          );
                        })}
                      </section>
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoughtProducts;
