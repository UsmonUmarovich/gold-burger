import React, { useEffect, useState } from "react";
import query from "../services/api/api.service";

function Deliver() {
  const [deliver, setDeliver] = useState([]);
  const [buy, setBuy] = useState([]);
  const [allimage, setAllimage] = useState([]);

  const userID = localStorage.getItem("userIdValue");

  const backToBuy = (buyId, deliverId) => {
    const isConfirmed = confirm("Mahsulot rostan ham yetkazildimi?");
    if (isConfirmed) {
      query.putBuyProducts(buyId, { status: "Yetqazildi" });
      query.putDeliver(deliverId, { status: "Yetkazilgan" });
      alert("Yetkazildi");
    } else {
      alert("OK");
    }
  };

  const backToBuyUnsuccess = (buyId, deliverId) => {
    const isConfirmed = confirm("Mahsulot rostan ham bekor qilindimi?");
    if (isConfirmed) {
      query.putBuyProducts(buyId, { status: "Bekor qilindi" });
      query.putDeliver(deliverId, { status: "Bekor qilingan" });
      alert("Bekor qilindi");
      window.location.reload();
    } else {
      alert("OK");
    }
  };

  useEffect(() => {
    query.getAllDelivers().then((res) => setDeliver(res.data));
    query.getAllBoughtProducts().then((res) => setBuy(res.data));
    query.getAllImages().then((res) => setAllimage(res.data));
  }, []);
  return (
    <div style={{ marginTop: "150px" }}>
      {deliver.map((d, index) => {
        return d.id == userID ? (
          <div>
            {buy.map((product, index) => {
              return (
                <div>
                  {d.products == product._id ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.227)",
                        width: "80%",
                        margin: "150px auto",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        padding: "30px 0px",
                      }}
                    >
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
                          <span style={{ fontWeight: 600 }}>
                            {product.name}
                          </span>
                        </h1>
                        {product.surname === "" ||
                        !product.surname.trim() ? null : (
                          <h1>
                            Familiya:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {product.surname}
                            </span>
                          </h1>
                        )}
                        {product.middlename === "" ||
                        !product.middlename.trim() ? null : (
                          <h1>
                            Ochestva:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {product.middlename}
                            </span>
                          </h1>
                        )}
                        <h1>
                          Telefon:{" "}
                          <span style={{ fontWeight: 600 }}>
                            {product.phone}
                          </span>
                        </h1>
                        <h1>
                          Address:{" "}
                          <span style={{ fontWeight: 600 }}>
                            {product.address}
                          </span>
                        </h1>
                        {product.comment === "" ||
                        !product.comment.trim() ? null : (
                          <h1>
                            Comment:{" "}
                            <span style={{ fontWeight: 600 }}>
                              {product.comment}
                            </span>
                          </h1>
                        )}
                        <h1>
                          Jami{" "}
                          <span style={{ fontWeight: 600 }}>
                            {product.totalPrice} so'm
                          </span>
                        </h1>
                      </div>
                      {product.products.map((item, i) => {
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
                      <br />
                      {d.status !== "Yangi" ? (
                        <div>
                          <button
                            disabled
                            type="submit"
                            className="user-button"
                          >
                            Yetkazildi
                          </button>
                          <button
                            disabled
                            type="submit"
                            className="user-button-del"
                          >
                            Bekor qilindi
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => backToBuy(product._id, d._id)}
                            type="submit"
                            className="user-button"
                          >
                            Yetkazildi
                          </button>
                          <button
                            onClick={() =>
                              backToBuyUnsuccess(product._id, d._id)
                            }
                            type="submit"
                            className="user-button-del"
                          >
                            Bekor qilindi
                          </button>
                        </div>
                      )}
                      {d.status ? (
                        <h1>{d.status}</h1>
                      ) : (
                        <h1>2{product.products.status}</h1>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default Deliver;
