import Datastore from "nedb";

const buy = new Datastore({ filename: "./data/buy.json" });
buy.loadDatabase((err) => console.log(err));

export function AllBoughtProducts(callback) {
  buy.find({}, (err, BoughtProducts) => {
    callback(BoughtProducts);
  });
}

export default buy;
