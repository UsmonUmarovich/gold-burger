import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import query from "../services/api/api.service";

function Register() {
  const [isValidPhone, setIsValidPhone] = useState();
  const [cpass, setCpass] = useState("");
  const [postUser, setPostUser] = useState({
    name: "",
    surname: "",
    middlename: "",
    password: "",
    phone: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setPostUser({ ...postUser, [event.target.name]: event.target.value });
  };

  const handlePhoneInput = (event) => {
    setPostUser({ ...postUser, phone: event.target.value });
    setIsValidPhone(/^\d{9}$/.test(event.target.value));
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !postUser.password.trim() ||
      !postUser.name.trim() ||
      !postUser.phone.trim()
    ) {
      return alert("All of them are required");
    }

    if (!isValidPhone) {
      return alert("Please enter valid phone number");
    }

    if (postUser.password !== cpass) {
      return alert("Confirm the password");
    }
    query.registerApi({ ...postUser });
    navigate("/login");
    window.location.reload();
  }

  return (
    <div className="login">
      <div className="login-content">
        <h1 className="login-logo">Ro'yhatdan o'tish</h1>
        <form onSubmit={handleSubmit} className="admin-card">
          <input
            className="admin-input"
            type="text"
            placeholder="Ism"
            name="name"
            onChange={handleInput}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="admin-input"
            onChange={handlePhoneInput}
            name="phone"
          />
          {!isValidPhone ? (
            <a>Please enter valid Phone number</a>
          ) : (
            <a>This phone number is valid</a>
          )}
          <input
            type="password"
            placeholder="Password"
            className="admin-input"
            onChange={handleInput}
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="admin-input"
            onChange={(e) => setCpass(e.target.value)}
            name="cpassword"
          />
          <button className="products-backet">Qo'shish</button>
          <Link to="/login" className="products-backet">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
