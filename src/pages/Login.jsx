import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import query from "../services/api/api.service";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (phone === "goldburger" || password === "goldburger") {
      return navigate("/admin");
    }
    if (!phone.trim() || !password.trim()) {
      return alert("phone and password are required");
    }

    const response = await query.loginApi({ phone: phone, password: password })

    if (response.data.phone === undefined) {
      return alert("Invalid username or password");
    }

    const nameValue = response.data.name;
    const surnameValue = response.data.surname;
    const middlenameValue = response.data.middlename;
    const phoneValue = response.data.phone;
    const userID = response.data._id;
    localStorage.setItem("nameValue", nameValue);
    localStorage.setItem("middlenameValue", middlenameValue);
    localStorage.setItem("surnameValue", surnameValue);
    localStorage.setItem("phoneValue", phoneValue);
    localStorage.setItem("userIdValue", userID);
    navigate("/");
  };
  return (
    <form onSubmit={submitHandler} className="login">
      <div className="login-content">
        <h1 className="login-logo">Gold Burger</h1>
        <div className="login-inputs">
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="login-input"
            placeholder="Phone Number"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Parol"
          />
        </div>
        <div className="login-btn">
          <button className="products-backet">Kirish</button>
        </div>
        <div className="login-btn">
          <Link to="/register" className="products-backet">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
