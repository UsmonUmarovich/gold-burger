import { Router } from "express";
import Datastore from "nedb";
import buy from "../services/buy.service.js";
import users from "../services/register.service.js";

const deliver = new Datastore({ filename: "./data/deliver.json" });
deliver.loadDatabase((err) => console.log(err));

const deliverRoutes = Router();

deliverRoutes.get("/deliver/", (req, res) => {
  deliver.find({}, (err, all) => {
    res.json(all);
  });
});

deliverRoutes.get("/deliver/:id", (req, res) => {
  const id = req.params.id;
  deliver.findOne({ _id: id }, (err, all) => {
    if (all) {
      res.json(all);
    } else {
      res.status(404).json({ message: "Deliver not found" });
    }
  });
});

deliverRoutes.get("/deliverp/:phone", (req, res) => {
  const phone = req.params.phone;
  deliver.findOne({ phone: phone }, (err, all) => {
    if (all) {
      res.json(all);
    } else {
      res.status(404).json({ message: "Deliver not found" });
    }
  });
});

deliverRoutes.post("/deliver/:id", (req, res) => {
  const id = req.params.id;
  const { phone, status } = req.body;

  buy.findOne({ _id: id }, (err, bought) => {
    users.findOne({ phone: phone }, (err, phonenum) => {
      const doc = {
        id: phonenum._id,
        status: status,
        products: bought._id,
      };
      if (phonenum) {
        if (bought) {
          deliver.insert(doc, (err, newDoc) => {
            res.status(200).json(newDoc);
          });
        } else {
          res.status(404).json({ message: "Deliver product not found" });
        }
      } else {
        res.status(404).json({ message: "Number not found" });
      }
    });
  });
});

deliverRoutes.put("/deliver/:id", (req, res) => {
  const id = req.params.id;
  const document = req.body;

  if (!document || Object.keys(document).length === 0) {
    return res.status(400).json({ error: "Request body is empty or invalid" });
  }

  deliver.update(
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

export default deliverRoutes;
