import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import query from "../services/api/api.service";

function Admin() {
  // States
  const [active, setActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState([]);
  const [postProduct, setPostProduct] = useState({});
  const [changeProduct, setChangeProduct] = useState({});
  const [changeImage, setChangeImage] = useState();
  const [changeRole, setChangeRole] = useState("");
  const [findUser, setFindUser] = useState("");

  const categories = [
    "Burger",
    "Lavash",
    "Pitsa",
    "Sous",
    "Ichimlik",
    "Desert",
  ];

  const navigate = useNavigate();
  const { id } = useParams();
  const OpenModal = () => {
    setActive(true);
  };

  const CloseModal = () => {
    setActive(false);
  };

  const handleChangeRoleSubmit = () => {
    query
      .getUserByPhone(findUser)
      .then((res) => query.putUserValue(res.data._id, { role: changeRole }));
    alert(`Owner of ${findUser} changed role to ${changeRole}`);
  };

  const handleInput = (e) => {
    setPostProduct({ ...postProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    query.postProduct({ ...postProduct, img: changeImage });
    window.location.reload();
  };

  const handleImage = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setChangeImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleChangeSubmitImage = (e) => {
    e.preventDefault();
    query.putImage(id, { img: changeImage });
    navigate("/admin");
    window.location.reload();
  };

  const handleChangeInput = (event) => {
    setChangeProduct({
      ...changeProduct,
      [event.target.name]: event.target.value,
    });
  };

  function handleChangeSubmit(event) {
    event.preventDefault();
    query.putProduct(id, { ...changeProduct });
    localStorage.removeItem("image");
    navigate("/admin");
    window.location.reload();
  }

  const handleDelete = async (id) => {
    query.deleteProductById(id);
    window.location.reload();
  };

  useEffect(() => {
    query.getAllProducts().then((res) => setProducts(res.data));
    query.getAllImages().then((res) => setImage(res.data));
  }, []);
  return (
    <div className="admin">
      <div className="container">
        <Link to="/admin/buying" className="user-button">
          Zakalar ro'yhati
        </Link>
        <Link to="/chef" className="user-button">
          Oshpazlar
        </Link>
        <input
          type="number"
          className="user-input"
          placeholder="Phone number"
          onChange={(e) => setFindUser(e.target.value)}
        />
        <select
          className="user-input"
          onChange={(e) => setChangeRole(e.target.value)}
        >
          <option>tanlang</option>
          <option>admin</option>
          <option>user</option>
          <option>deliver</option>
        </select>
        <button onClick={handleChangeRoleSubmit} className="user-button">
          Role ni o'zgartirish
        </button>
        <div className="admin-content">
          <form className="admin-card">
            <input
              className="admin-input"
              type="file"
              placeholder="rasm"
              name="img"
              accept="img/*"
              onChange={handleImage}
            />
            Rasm:
            <img src={changeImage} width={100} alt="" />
            <input
              type="text"
              placeholder="mahsulot nomi"
              className="admin-input"
              onChange={handleInput}
              name="title"
            />
            <input
              type="text"
              placeholder="description"
              className="admin-input"
              onChange={handleInput}
              name="desc"
            />
            <input
              type="number"
              placeholder="mahsulot narxi"
              className="admin-input"
              onChange={handleInput}
              name="price"
            />
            <select name="category" onChange={handleInput}>
              <option>Tanlang</option>
              <option>Burger</option>
              <option>Lavash</option>
              <option>Pitsa</option>
              <option>Sous</option>
              <option>Ichimlik</option>
              <option>Desert</option>
            </select>
            <button
              type="submit"
              onClick={handleSubmit}
              className="products-backet"
            >
              Qo'shish
            </button>
          </form>
          <>
            {categories.map((category, index) => {
              return (
                <section className="products" id={category}>
                  <div key={index}>
                    <h1 className="products-title">{category}</h1>
                    <div className="products-cont">
                      {products.map((item, index) => {
                        return (
                          <>
                            {category == item.category ? (
                              <div className="products-content">
                                <div className="products-cards">
                                  <div className="products-card">
                                    {image.map((img, i) => {
                                      return (
                                        <div>
                                          {item.id === img.id ? (
                                            <img
                                              src={img.img}
                                              className="products-img"
                                              alt="fast food"
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      );
                                    })}
                                    <h1 className="products-name">
                                      {item.title}
                                    </h1>
                                    <span className="products-description">
                                      {item.desc}
                                    </span>
                                    <span className="products-price">
                                      {item.price} so'm
                                    </span>

                                    <Link
                                      to={item._id}
                                      className="products-backet"
                                      onClick={OpenModal}
                                    >
                                      Update
                                    </Link>
                                    <Link
                                      className="products-backet"
                                      onClick={(e) => handleDelete(item._id)}
                                    >
                                      Delete
                                    </Link>
                                  </div>
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

          <div>
            <form className={active ? "admin-modal show" : "admin-modal"}>
              <div className="admin-bg"></div>
              <div className="admin-modal_content">
                <Link
                  to="/admin"
                  className="backet-modal-close"
                  onClick={CloseModal}
                >
                  <CloseIcon />
                </Link>
                <div className="admin-modal_items">
                  <input
                    type="file"
                    accept="img/*"
                    placeholder="mahsulot rasmi"
                    className="admin-input"
                    name="img"
                    onChange={handleImage}
                  />
                  <button onClick={handleChangeSubmitImage}>SUBB</button>
                  <img src={changeImage} width={100} alt="" />
                  <input
                    type="text"
                    placeholder="mahsulot nomi"
                    className="admin-input"
                    name="title"
                    onChange={handleChangeInput}
                  />
                  <input
                    type="text"
                    placeholder="description"
                    className="admin-input"
                    name="desc"
                    onChange={handleChangeInput}
                  />
                  <input
                    type="text"
                    placeholder="mahsulot narxi"
                    className="admin-input"
                    name="price"
                    onChange={handleChangeInput}
                  />
                  <select
                    style={{ marginBottom: "30px" }}
                    name="category"
                    onChange={handleChangeInput}
                  >
                    <option>Tanlang</option>
                    <option>Burger</option>
                    <option>Lavash</option>
                    <option>Pitsa</option>
                    <option>Sous</option>
                    <option>Ichimlik</option>
                    <option>Desert</option>
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={handleChangeSubmit}
                  className="products-backet"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
