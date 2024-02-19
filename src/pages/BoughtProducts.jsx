import React, { useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import query from "../services/api/api.service";

function BoughtProducts() {
  const [uow, setUOW] = useState([]);
  const [active, setActive] = useState(false);
  const [allimage, setAllImage] = useState([]);
  const [all, setAll] = useState(true);
  const [yangi, setYangi] = useState(false);
  const [process, setProcess] = useState(false);
  const [findbyphone, setFindByPhone] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const OpenModal = () => {
    setActive(true);
  };

  const CloseModal = () => {
    setActive(false);
  };

  query.getAllImages().then((res) => setAllImage(res.data));
  query.getAllBoughtProducts().then((res) => setUOW(res.data));

  const handleChefSubmit = (event) => {
    event.preventDefault();
    query
      .postChefByBuyId(id)
      .then((res) => query.putChef(res.data._id, { status: "Yangi" }));
    query.putBuyProducts(id, { status: "Pishirilmoqda..." });
    alert("Bu Productlar Cheflarga yetib boradi...");
  };

  const handleDriverSubmit = (event) => {
    event.preventDefault();
    query.putBuyProducts(id, { status: "Yetkazilmoqda" });
    query.postDeliver(id, { phone: findbyphone, status: "Yangi" });
    query
      .getUserByPhone(findbyphone)
      .then((res) => query.putUserValue(res.data._id, { role: "deliver" }));
    alert("Works");
  };

  return (
    <div className="buy">
      <div className="container">
        <button
          onClick={() => {
            setProcess(false);
            setAll(true);
            setYangi(false);
          }}
          className={all == true ? "user-button-active" : "user-button"}
        >
          Hammasi
        </button>
        <button
          onClick={() => {
            setProcess(false);
            setAll(false);
            setYangi(true);
          }}
          className={yangi == true ? "user-button-active" : "user-button"}
        >
          Faqat Yangilari
        </button>
        <button
          onClick={() => {
            setProcess(true);
            setAll(false);
            setYangi(false);
          }}
          className={process == true ? "user-button-active" : "user-button"}
        >
          On the Process
        </button>
        <h1>All: {all == true ? "true" : "false"}</h1>
        <h1>Yangi: {yangi == true ? "true" : "false"}</h1>
        <h1>Process: {process == true ? "true" : "false"}</h1>
        <Link onClick={() => navigate(-1)}>🔙</Link>
        {uow.map((item, index) => {
          const bought = (
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
                <hr />
                {item.status}
              </Link>
              {item._id === id ? (
                <>
                  <form className={active ? "buy-modal show" : "buy-modal"}>
                    <div className="buy-card">
                      <div style={{ display: "flex" }}>
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
                        <div>
                          {item.status !== "Yangi" ? (
                            <button
                              disabled
                              onClick={handleChefSubmit}
                              type="submit"
                              className="user-button"
                            >
                              Pishirish
                            </button>
                          ) : (
                            <button
                              onClick={handleChefSubmit}
                              type="submit"
                              className="user-button"
                            >
                              Pishirish
                            </button>
                          )}
                          {item.status !== "Pishirildi!" ? (
                            <div>
                              <input
                                disabled
                                type="number"
                                className="user-input"
                                placeholder="Deliver's number"
                              />
                              <button
                                disabled
                                type="submit"
                                className="user-button"
                              >
                                Yetkazish
                              </button>
                            </div>
                          ) : (
                            <div>
                              <input
                                type="number"
                                className="user-input"
                                placeholder="Deliver's number"
                                name="phone"
                                onChange={(e) => setFindByPhone(e.target.value)}
                              />
                              <button
                                onClick={handleDriverSubmit}
                                type="submit"
                                className="user-button"
                              >
                                Yetkazish
                              </button>
                            </div>
                          )}
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
          return (
            <div>
              {all ? bought : ""}
              {yangi ? (item.status == "Yangi" ? bought : "") : ""}
              {process ? (item.status == "Pishirilmoqda..." ? bought : "") : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoughtProducts;
