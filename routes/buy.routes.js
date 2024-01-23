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
  };
  buy.insert(doc, (err, newDocs) => {
    console.log("successfully bought products", newDocs);
  });

  res.json({ message: "you successfully bought products" });
});

export default Buy;
