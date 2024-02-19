import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import MinusIcon from "../../assets/icons/Minus";
import ShopIcon from "../../assets/icons/ShopIcon";
import UserIcon from "../../assets/icons/UserIcon";
import LogOut from "../../assets/icons/LogOutIcon";
import Settings from "../../assets/icons/SettingsIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import logo from "../../assets/images/logo.png";
import notFound from "../../assets/images/notFound.png";
import { Link } from "react-scroll";
import { useCart } from "react-use-cart";
import { linksData } from "../../data/linksData";
import { NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import query from "../../services/api/api.service";

function Navbar() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  // States
  const [active, setActive] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLogged, setIsLogged] = useState();
  const [role, setRole] = useState();
  const [image, setImage] = useState([]);
  const [buyApi, setBuyApi] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [getProductId, setGetProductId] = useState("");
  const [buy, setBuy] = useState(false);
  const [buyProducts, setBuyProducts] = useState({
    name: localStorage.getItem("nameValue"),
    surname: localStorage.getItem("surnameValue"),
    middlename: localStorage.getItem("middlenameValue"),
    phone: localStorage.getItem("phoneValue"),
    address: "",
    comment: "",
    products: items,
    time: Date(),
    totalPrice: cartTotal,
    status: "Yangi",
  });

  // LocalStorages
  const name = localStorage.getItem("nameValue");
  const surname = localStorage.getItem("surnameValue");
  const localUsername = localStorage.getItem("usernameValue");
  const userID = localStorage.getItem("userIdValue");
  const phone = localStorage.getItem("phoneValue");

  // little Functions

  const isUserLogged = () => {
    if (userID === null) {
      setIsLogged(false);
    }

    if (userID !== null) {
      setIsLogged(true);
    }
  };

  const menuClose = () => {
    setActive(false);
  };

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  const menuOpen = () => {
    setActive(true);
  };

  const BacketBuyRender = () => {
    setBuy(true);
  };

  const BacketBuyClose = () => {
    setBuy(false);
  };

  const userModalToggle = () => {
    setShow(true);
  };

  const userModalClose = () => {
    setShow(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // APIs

  const imageApi = async () => {
    query.getAllImages().then((res) => setImage(res.data));
  };

  const roleApi = () => {
    query.getUserById(userID).then((res) => setRole(res.data.role));
  };

  query.getAllBoughtProducts().then((res) => setBuyApi(res.data));

  // Buy API and Functions

  const handleInput = (event) => {
    setBuyProducts({ ...buyProducts, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!buyProducts.phone.trim() || !buyProducts.address.trim()) {
      return alert("All of them are required");
    }
    console.log(buyProducts);
    query.buyProducts({
      ...buyProducts,
      products: items,
      totalPrice: cartTotal,
      status: "Yangi",
    });
    alert(
      `Hozir sizning ${buyProducts.phone} telefon raqamingizga operatorlarimiz bog'lanishadi!`
    );
    window.location.reload();
    emptyCart();
  }

  useEffect(() => {
    isUserLogged();
    imageApi();
    roleApi();
  }, []);

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo__list">
              <a href="/" className="nav-logo__list">
                <img src={logo} className="nav-logo" alt="Gold Burger" />
                <h1 className="nav-logo__title">Gold Burger</h1>
              </a>
            </div>
            <div className={active ? "nav-list active" : "nav-list"}>
              <button className="nav-menu__close" onClick={menuClose}>
                <CloseIcon />
              </button>
              <ul className="nav-links">
                {linksData.map((item, key) => (
                  <Link
                    key={item.id}
                    className="nav-link"
                    onClick={menuClose}
                    to={item.title}
                    smooth={true}
                    offset={0}
                    duration={600}
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </div>
            <div className="nav-items">
              <button className="nav-backet" onClick={modalOpen}>
                <span className="nav-backet_quantity">
                  {totalItems === 0 ? null : totalItems}
                </span>
                <ShopIcon />
                <h1 className="nav-backet__title">Savat</h1>
              </button>

              <button className="nav-menu" onClick={menuOpen}>
                <MenuIcon />
              </button>
              {!isLogged ? (
                <ul className="nav-user_modal nav-user">
                  <NavLink onClick={() => setShow(!show)}>
                    <UserIcon />
                  </NavLink>
                  <div
                    className={
                      show
                        ? "nav-user__edit_modal show"
                        : "nav-user__edit_modal"
                    }
                  >
                    <NavLink to="/login" className="nav-user_exit">
                      <FiLogIn fontSize={23} /> Kirish{" "}
                    </NavLink>
                  </div>
                </ul>
              ) : (
                <ul className="nav-user_modal nav-user">
                  <NavLink
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => setShow(!show)}
                  >
                    <UserIcon /> {name}
                  </NavLink>
                  <div
                    className={
                      show
                        ? "nav-user__edit_modal show"
                        : "nav-user__edit_modal"
                    }
                  >
                    <h1>
                      {name} {surname}
                    </h1>{" "}
                    <hr style={{ width: "100%" }} />
                    {/* {buyApi.map((buy, index) => {
                      return (
                        <>
                          {buy.phone == phone ? (
                            <>
                              {buy.status == "Yangi" ? (
                                "Navbatingiz kelmadi!"
                              ) : buy.status ==
                                "Yetqazildi" ? null : buy.status ==
                                "Bekor qilindi" ? null : (
                                <NavLink
                                  onClick={() => {
                                    setShow2(true), setGetProductId(buy._id);
                                  }}
                                >
                                  {buy.status}
                                </NavLink>
                              )}
                              <div
                                className={
                                  show2
                                    ? "nav-user__edit_modal2 show"
                                    : "nav-user__edit_modal2"
                                }
                              >
                                <NavLink onClick={() => setShow2(false)}>
                                  <CloseIcon />
                                </NavLink>
                                {buy._id == getProductId
                                  ? buy.products.map((product, index) => {
                                      return (
                                        <>
                                          {buy.status == "Yangi" ? (
                                            <div>
                                              <h1>{product.title}</h1>
                                              <h1>{product.desc}</h1>
                                              <h1>{product.price}so'm</h1>
                                              <h1>{product.quantity}ta</h1>
                                              <hr />
                                            </div>
                                          ) : buy.status ==
                                            "Yetqazildi" ? null : buy.status ==
                                            "Bekor qilindi" ? null : (
                                            <div>
                                              <h1>{product.title}</h1>
                                              <h1>{product.desc}</h1>
                                              <h1>{product.price}so'm</h1>
                                              <h1>{product.quantity}ta</h1>
                                            </div>
                                          )}
                                        </>
                                      );
                                    })
                                  : null}
                              </div>
                            </>
                          ) : null}
                        </>
                      );
                    })} */}
                    <NavLink
                      className={"nav-user__settings"}
                      to={"/user/orders"}
                    >
                      {" "}
                      <Settings />
                      Buyurtmalar
                    </NavLink>
                    {role !== "user" ? (
                      <NavLink className={"nav-user__settings"} to={role}>
                        <Settings /> {role}
                      </NavLink>
                    ) : (
                      ""
                    )}
                    <NavLink className={"nav-user__settings"} to={userID}>
                      {" "}
                      <Settings /> Sozlamalar
                    </NavLink>
                    <button className="nav-user_exit" onClick={() => logout()}>
                      <LogOut /> Chiqish{" "}
                    </button>
                  </div>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className={modal ? "backet show" : "backet"}>
        <div className="backet-scroll">
          <div>
            {isEmpty ? (
              <>
                <h1
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "30px",
                    border: "none",
                  }}
                >
                  Savatda mahsulotlar topilmadi
                </h1>
                <hr
                  style={{
                    position: "absolute",
                    top: "70px",
                    left: "30px",
                    right: "30px",
                  }}
                />
              </>
            ) : (
              <>
                <h1
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "30px",
                    border: "none",
                    fontFamily: "sans-serif",
                  }}
                >
                  Savatda{" "}
                  <span
                    style={{ fontWeight: 500, borderBottom: "1px solid black" }}
                  >
                    {totalItems}
                  </span>{" "}
                  ta Mahsulot bor <br /> Hamma Mahsulotlar{" "}
                  <span
                    style={{ fontWeight: 500, borderBottom: "1px solid black" }}
                  >
                    {cartTotal} so'm
                  </span>{" "}
                  bo'ldi
                </h1>
                <hr
                  style={{
                    position: "absolute",
                    top: "90px",
                    left: "30px",
                    right: "30px",
                  }}
                />
              </>
            )}
            <button className="backet-close" onClick={modalClose}>
              <CloseIcon />
            </button>
          </div>
          {isEmpty ? (
            <div className="backet-render active">
              <img src={notFound} className="backet-img" alt="" />
              <h1 className="backet-notfound">Hech nima topilmadi</h1>
            </div>
          ) : (
            <></>
          )}
          {items.map((item, index) => {
            return (
              <div className="backet-items">
                <div className="backet-item" key={index}>
                  {image.map((img, i) => {
                    return (
                      <>
                        {item.id === img.id ? (
                          <img src={img.img} className="backet-product_img" />
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <h1 className="backet-product_name">{item.title}</h1>
                      <h1 className="backet-product_desc">{item.desc}</h1>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <button
                        className="backet-plus"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <MinusIcon />
                      </button>
                      <span className="backet-products">
                        {item.quantity} ta
                      </span>
                      <button
                        className="backet-minus"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <PlusIcon />
                      </button>
                      <button
                        className="backet-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  <span className="backet-price">{item.itemTotal} so'm</span>
                </div>
              </div>
            );
          })}
        </div>
        {isEmpty ? (
          ""
        ) : (
          <button className={"backet-button active"} onClick={BacketBuyRender}>
            Sotib Olish
          </button>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className={buy ? "backet-modal show" : "backet-modal"}
      >
        <div className="backet-bg"></div>
        <div className="backet-buy_content">
          <NavLink className="backet-modal-close" onClick={BacketBuyClose}>
            <CloseIcon />
          </NavLink>
          {isLogged ? (
            <div>
              <NavLink className="backet-modal-close" onClick={BacketBuyClose}>
                <CloseIcon />
              </NavLink>
              <h1 className="backet-modal_title">Manzil</h1>
              <form className="backet-inputs">
                <input
                  type="text"
                  name="address"
                  onChange={handleInput}
                  placeholder="Uy / Office (Yozish talab qilinadi)"
                  className="backet-input"
                />
                <input
                  type="text"
                  name="comment"
                  onChange={handleInput}
                  placeholder="Izoh (Izoh yozish majburiy emas)"
                  className="backet-input_text"
                />
              </form>
              <button type="submit" className="backet-modal_submit">
                Yuborish
              </button>
            </div>
          ) : (
            <span>
              Mahsulot(lar)ni sotib olish uchun iltimos Accountingizga{" "}
              <NavLink style={{ borderBottom: "1px solid black" }} to="/login">
                Kiring <br />
              </NavLink>{" "}
              yoki
              <NavLink
                style={{ borderBottom: "1px solid black" }}
                to="/register"
              >
                {" "}
                Ro'yhatdan o'ting
              </NavLink>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Navbar;
