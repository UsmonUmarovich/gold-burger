import { Router } from "express";
import Datastore from "nedb";
import buy from "../services/buy.service.js";

const chef = new Datastore({ filename: "./data/chef.json" });
chef.loadDatabase((err) => console.log(err));

const chefRoutes = Router();

chefRoutes.get("/chef", (req, res) => {
  try {
    chef.find({}, (err, all) => {
      res.send(all);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal");
  }
});

chefRoutes.post("/chef/:id", (req, res) => {
  const id = req.params.id;

  buy.findOne({ _id: id }, (err, toChef) => {
    if (err) {
      res.status(500).json({ message: "Internal server error *" });
    } else {
      if (toChef) {
        const doc = {
          buyId: toChef._id,
        };
        chef.insert(doc, (err, newDoc) => {
          res.json(newDoc);
        });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  });
});

chefRoutes.post("/chefback/:id", (req, res) => {
  const id = req.params.id;

  chef.findOne({ _id: id }, (err, toChef) => {
    if (err) {
      res.status(500).json({ message: "Internal" });
    } else {
      if (toChef) {
        buy.insert(toChef);
        res.json(toChef);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  });
});

chefRoutes.put("/chef/:id", (req, res) => {
  const id = req.params.id;
  const document = req.body;

  if (!document || Object.keys(document).length === 0) {
    return res.status(400).json({ error: "Request body is empty or invalid" });
  }

  chef.update(
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

export default chefRoutes;
