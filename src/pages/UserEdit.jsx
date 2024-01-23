import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../assets/icons/CloseIcon";
import query from "../services/api/api.service";

function UserEdit() {
  const [user, setUser] = useState([]);
  const [changeUser, setChangeUser] = useState({});
  const [oldpass, setOldPass] = useState("");
  const [cnewpass, setCnewPass] = useState("");
  const [active, setActive] = useState(false);

  const { id } = useParams();

  const userId = localStorage.getItem("userIdValue");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const OpenModal = () => {
    setActive(true);
  };

  const CloseModal = () => {
    setActive(false);
  };

  const handleChangeInput = (event) => {
    setChangeUser({
      ...changeUser,
      [event.target.name]: event.target.value,
    });
  };

  function handleChangeSubmit(event) {
    event.preventDefault();
    query.putUserValue(id, { ...changeUser });
    navigate(`/${id}`);
    window.location.reload();
  }

  function handleChangePassSubmit(event) {
    event.preventDefault();
    if (oldpass !== user.password) {
      return alert("Old password incorrect");
    }
    if (changeUser.password !== cnewpass) {
      return alert("Confirm the password");
    }
    query.putUserValue(id, { ...changeUser });
    navigate(`/${id}`);
    window.location.reload();
  }

  const handleDelete = async () => {
    const isConfirmed = confirm("Accauntingizni o'chirishga rozimisiz?");
    if (!isConfirmed) {
      return alert("Bekor qilindi!");
    }
    if (isConfirmed) {
      query.deleteUserById(id);
      navigate("/");
      logout();
    }
  };

  localStorage.setItem("nameValue", user.name);
  localStorage.setItem("surnameValue", user.surname);
  localStorage.setItem("middlenameValue", user.middlename);
  localStorage.setItem("phoneValue", user.phone);

  query.getUserById(userId).then((res) => setUser(res.data));
  return (
    <div className="user">
      <div className="container">
        {userId ? (
          <>
            {id == user._id ? (
              <form onSubmit={handleChangeSubmit} className="user-inputs">
                <p style={{ fontWeight: 100 }}>Mening Ma'lumotlarim</p>
                <div style={{ display: "flex", gap: "10px", fontWeight: 100 }}>
                  <div>
                    <h1>Name:</h1>
                    <input
                      type="text"
                      name="name"
                      className="user-input"
                      placeholder={user.name}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div>
                    <h1 className="user-title">Middle Name:</h1>
                    <input
                      type="text"
                      name="middlename"
                      placeholder={user.middlename}
                      className="user-input"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div>
                    <h1 className="user-title">Surname:</h1>
                    <input
                      type="text"
                      name="surname"
                      placeholder={user.surname}
                      className="user-input"
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <hr style={{ width: "100%" }} />
                <div style={{ display: "flex", gap: "10px", fontWeight: 100 }}>
                  <div>
                    <h1 className="user-title">Phone:</h1>
                    <input
                      type="text"
                      name="phone"
                      placeholder={user.phone}
                      className="user-input"
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <hr style={{ width: "100%" }} />

                <Link
                  to={`/changepass/${id}`}
                  onClick={OpenModal}
                  style={{ borderBottom: "1px solid black" }}
                >
                  Parolni O'zgartirish
                </Link>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "400px",
                  }}
                >
                  <button
                    onClick={() => handleDelete()}
                    type="submit"
                    className="user-button-del"
                  >
                    Accauntni O'chirish
                  </button>
                  <button type="submit" className="user-button">
                    O'zgartish
                  </button>
                </div>
                <form className={active ? "user-modal show" : "user-modal"}>
                  <>
                    <div className="user-card">
                      <Link
                        to={`/${id}`}
                        className="user-modal-close"
                        onClick={CloseModal}
                      >
                        <CloseIcon />
                      </Link>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          fontWeight: 100,
                        }}
                      >
                        <div>
                          <h1 className="user-title">Eski Parol:</h1>
                          <input
                            type="password"
                            placeholder="Eski Parol"
                            className="user-input"
                            onChange={(e) => setOldPass(e.target.value)}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          fontWeight: 100,
                        }}
                      >
                        <div>
                          <h1 className="user-title">Yangi Parol:</h1>
                          <input
                            type="password"
                            name="password"
                            placeholder="Yangi Parol"
                            className="user-input"
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div>
                          <h1 className="user-title">
                            Yangi Parolni Tasdiqlash:
                          </h1>
                          <input
                            type="password"
                            placeholder="Yangi Parolni Tasdiqlash"
                            className="user-input"
                            onChange={(e) => setCnewPass(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleChangePassSubmit}
                        type="submit"
                        className="user-button"
                      >
                        Parolni O'zgartirish
                      </button>
                    </div>
                  </>
                </form>
              </form>
            ) : (
              <div>Bu sahifaga kirishga ruhsatingiz yoq (Forbidden)</div>
            )}
          </>
        ) : (
          <div>Bu sahifaga kirish mumkin emas</div>
        )}
      </div>
    </div>
  );
}

export default UserEdit;
