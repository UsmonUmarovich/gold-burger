import { Router } from "express";
import {
  allProducts,
  createProduct,
  deleteProduct,
  image,
} from "../services/products.service.js";
import products from "../services/products.service.js";

const productsRoutes = Router();
const _products = [];

productsRoutes.get("/products", (req, res) => {
  allProducts((product) => {
    res.json(product);
  });
});

productsRoutes.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const document = req.body;

  // Check if the request body is empty or doesn't contain valid data
  if (!document || Object.keys(document).length === 0) {
    return res.status(400).json({ error: "Request body is empty or invalid" });
  }

  products.update(
    { _id: id },
    { $set: document },
    {},
    (err, numReplaced, upsert) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (numReplaced === 0 && !upsert) {
          res.status(404).json({ message: "Product not found" });
        } else {
          if (upsert) {
            res.status(201).json({ message: "Product inserted successfully" });
          } else {
            res.json({ message: "Product updated successfully" });
          }
        }
      }
    }
  );
});

productsRoutes.put("/image/:id", (req, res) => {
  const id = req.params.id;
  const img = req.body;

  // Check if the request body is empty or doesn't contain valid data
  if (!img || Object.keys(img).length === 0) {
    return res.status(400).json({ error: "Request body is empty or invalid" });
  }

  image.update({ _id: id }, { $set: img }, {}, (err, numReplaced, upsert) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (numReplaced === 0 && !upsert) {
        res.status(404).json({ message: "Product not found" });
      } else {
        if (upsert) {
          res.status(201).json({ message: "Product inserted successfully" });
        } else {
          res.json({ message: "Product updated successfully" });
        }
      }
    }
  });
});

productsRoutes.get("/products/:id", (req, res) => {
  const id = req.params.id;

  products.findOne({ _id: id }, (err, document) => {
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

productsRoutes.post("/products/add", (req, res) => {
  const { img, title, desc, price, category } = req.body;
  createProduct(img, title, desc, price, category);
  res.json({ message: "posted successfully" });
});

productsRoutes.get("/get-image/", (req, res) => {
  image.find({}, (err, images) => {
    res.send(images);
  });
});

productsRoutes.delete("/products/:id", (req, res) => {
  deleteProduct(req.params.id);
  res.json({ message: "product deleted" });
});

export default productsRoutes;
