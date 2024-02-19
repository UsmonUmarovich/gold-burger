import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import query from "../services/api/api.service";

function UserOrders() {
  const [buyAPI, setBuyAPI] = useState([]);
  const [allimage, setAllimage] = useState([]);
  // console.log(buyAPI);

  const userId = localStorage.getItem("userIdValue");
  const phoneValue = localStorage.getItem("phoneValue");

  query.getAllImages().then((res) => setAllimage(res.data));
  query.getAllBoughtProducts().then((res) => setBuyAPI(res.data));
  return (
    <div className="user">
      <div className="user_menu">
        <ul className="user_menu-list">
          <NavLink to="/user/orders">Buyurtmalar</NavLink>
          <NavLink to={`/${userId}`}>Sozlamalar</NavLink>
        </ul>
      </div>
      <div className="user_change">
        {userId ? (
          <div className="user-inputs">
            <ul className="user_category">
              <button className="user_category-btn">Barcha</button>
              <button className="user_category-btn">Bekor qilingan</button>
              <button className="user_category-btn">Faol</button>
            </ul>
            {buyAPI.map((buy, indexBuy) => {
              return (
                <>
                  {buy.phone == phoneValue ? (
                    <div>
                      <div className="user_orders">
                        <div className="user_order">
                          <div className="user_orders-title">
                            <h1>Holat:</h1>
                            <h1>Buyurtma qilingan vaqt:</h1>
                            <h1>Address:</h1>
                            <h1>Narxi:</h1>
                          </div>
                          <div className="user_orders-value">
                            <h1>{buy.status}</h1>
                            <h1>{buy.time}</h1>
                            <h1>{buy.address}</h1>
                            <h1>{buy.totalPrice} so'm</h1>
                          </div>
                        </div>
                      </div>
                      <div className="user_orders">
                        {buy.products.map((product, indexProduct) => {
                          return (
                            <div className="user_order">
                              {allimage.map((image, i) => {
                                return (
                                  <>
                                    {product.id === image.id ? (
                                      <img
                                        src={image.img}
                                        className="user-img"
                                        alt="fast food"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                              <div className="user_orders-title">
                                <h1>Nomi:</h1>
                                <h1>Izoh:</h1>
                                <h1>Soni:</h1>
                                <h1>Narxi:</h1>
                              </div>
                              <div className="user_orders-value">
                                <h1>{product.title}</h1>
                                <h1>{product.desc}</h1>
                                <h1>{product.quantity}</h1>
                                <h1>
                                  {product.quantity > 1
                                    ? `${product.itemTotal} so'm (donasi ${product.price} so'm)`
                                    : `${product.itemTotal} so'm`}
                                </h1>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1>Siz hech nima buyurtma qilmagansiz :(</h1>
                      <NavLink to="/" className="user-button">
                        Harid qilish
                      </NavLink>
                    </>
                  )}
                </>
              );
            })}
          </div>
        ) : (
          <div>Bu sahifaga kirish mumkin emas</div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
