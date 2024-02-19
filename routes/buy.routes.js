import { Router } from "express";
import buy, { AllBoughtProducts } from "../services/buy.service.js";

const Buy = Router();
const _buy = [];

Buy.get("/buy", (req, res) => {
  AllBoughtProducts((BoughtProducts) => {
    res.json(BoughtProducts);
  });
});

Buy.get("/buy/:id", (req, res) => {
  const id = req.params.id;

  buy.findOne({ _id: id }, (err, document) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (document) {
        res.json(document);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    }
  });
});

Buy.post("/buy/", (req, res) => {
  const {
    name,
    surname,
    middlename,
    phone,
    address,
    comment,
    products,
    time,
    totalPrice,
    status
  } = req.body;
  const doc = {
    address,
    comment,
    products,
    name,
    surname,
    middlename,
    phone,
    time,
    totalPrice,
    status
  };
  buy.insert(doc, (err, newDocs) => {
    console.log("successfully bought products", newDocs);
  });

  res.json({ message: "you successfully bought products" });
});

Buy.put("/buy/:id", (req, res) => {
  const id = req.params.id;
  const document = req.body;

  if (!document || Object.keys(document).length === 0) {
    return res.status(400).json({ error: "Request body is empty or invalid" });
  }

  buy.update(
    { _id: id },
    { $set: document },
    {},
    (err, numReplaced, upsert) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (numReplaced === 0 && !upsert) {
          res.status(404).json({ message: "not found" });
        } else {
          if (upsert) {
            res.status(201).json({ message: "inserted successfully" });
          } else {
            res.send(document);
          }
        }
      }
    }
  );
});

export default Buy;
