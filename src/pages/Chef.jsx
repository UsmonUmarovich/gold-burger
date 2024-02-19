import React, { useEffect, useState } from "react";
import query from "../services/api/api.service";

function Chef() {
  const [chef, setChef] = useState([]);
  const [allimage, setAllimage] = useState([]);
  const [hidden, setHidden] = useState();
  const [buy, setBuy] = useState([]);

  const backToBuy = (id, _id) => {
    const isConfirmed = confirm("Mahsulot rostan ham tayyormi?");
    if (isConfirmed) {
      query.putBuyProducts(id, { status: "Pishirildi!" });
      query.putChef(_id, { status: "Pishirilgan" });
      alert("Pishirildi");
      window.location.reload();
    } else {
      alert("Bekor qilindi❗️");
    }
  };

  useEffect(() => {
    query.getAllChefsProducts().then((res) => setChef(res.data));
    query.getAllBoughtProducts().then((res) => setBuy(res.data));
    query.getAllImages().then((res) => setAllimage(res.data));
  }, []);
  return (
    <div>
      <button
        onClick={() => setHidden(!hidden)}
        style={{ marginTop: "100px" }}
        className={hidden ? "user-button-active" : "user-button"}
      >
        Faqat Yangilarini Ko'rsatish
      </button>
      {chef.map((ch, index) => {
        return (
          <div>
            {buy.map((product, i) => {
              return (
                <>
                  {ch.buyId == product._id ? (
                    <div>
                      {hidden ? (
                        ch.status !== "Yangi" ? (
                          ""
                        ) : (
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
                                    <h1 className="products-name">
                                      {item.title}
                                    </h1>
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
                            {ch.status !== "Yangi" ? (
                              <button
                                disabled
                                onClick={() => backToBuy(product._id)}
                                type="submit"
                                className="user-button"
                              >
                                Pishirish
                              </button>
                            ) : (
                              <button
                                onClick={() => backToBuy(product._id, ch._id)}
                                type="submit"
                                className="user-button"
                              >
                                Pishirish
                              </button>
                            )}
                            <h1>{ch.status}</h1>
                          </div>
                        )
                      ) : (
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
                                  <h1 className="products-name">
                                    {item.title}
                                  </h1>
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
                          {ch.status !== "Yangi" ? (
                            <button
                              disabled
                              onClick={() => backToBuy(product._id)}
                              type="submit"
                              className="user-button"
                            >
                              Pishirish
                            </button>
                          ) : (
                            <button
                              onClick={() => backToBuy(product._id, ch._id)}
                              type="submit"
                              className="user-button"
                            >
                              Pishirish
                            </button>
                          )}
                          <h1>{ch.status}</h1>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Chef;
