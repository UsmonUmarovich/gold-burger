import { Router } from "express";
import users, { registerUser } from "../services/register.service.js";

const registerRoutes = Router();

registerRoutes.get("/register", (req, res) => {
  users.find({}, (err, allUsers) => {
    res.json(allUsers);
  });
});

registerRoutes.post("/register", (req, res) => {
  const { password, name, surname, middlename, phone, role } = req.body;

  if (!password || !name || !phone) {
    return res.status(400).json("All of them are required");
  }

  registerUser(
    password,
    name,
    surname,
    middlename,
    phone,
    role,
    (err, newUser, message) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!newUser) {
        return res.status(400).json({ message });
      }

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    }
  );
});

// Put request with "id"
registerRoutes.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const document = req.body;

  if (!document || Object.keys(document).length === 0) {
    return res.status(400).json({ error: "Request body is empty or invalid" });
  }

  users.update(
    { _id: id },
    { $set: document },
    {},
    (err, numReplaced, upsert) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (numReplaced === 0 && !upsert) {
          res.status(404).json({ message: "User not found" });
        } else {
          if (upsert) {
            res.status(201).json({ message: "User inserted successfully" });
          } else {
            res.send(document);
          }
        }
      }
    }
  );
});

registerRoutes.get("/users/:id", (req, res) => {
  const id = req.params.id;

  users.findOne({ _id: id }, (err, document) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (document) {
        res.send(document);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
});

registerRoutes.get("/usersp/:phone", (req, res) => {
  const phone = req.params.phone;

  users.findOne({ phone: phone }, (err, document) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (document) {
        res.send(document);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
});

registerRoutes.delete("/register/:id/", (req, res) => {
  const id = req.params.id;
  users.remove({ _id: id });
  res.json("registered user deleted");
});
export default registerRoutes;
