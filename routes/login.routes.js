import { Router } from "express";
import users from "../services/register.service.js";

const LoginRoutes = Router();

LoginRoutes.post("/login", (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  users.findOne({ phone, password }, (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!user) {
      return res.json("Invalid phone or password");
    }

    res.send(user);
  });
});

export default LoginRoutes;
