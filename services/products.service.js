import Datastore from "nedb";

const products = new Datastore({ filename: "./data/products.json" });
products.loadDatabase((err) => console.log(err));

export const image = new Datastore({ filename: "./data/image.json" });
image.loadDatabase((err) => console.log(err));

export function allProducts(callback) {
  products.find({}, (err, product) => {
    callback(product);
  });
}

export function createProduct(img, title, desc, price, category) {
  const doc = {
    id: Date.now(),
    _id: `${Date.now()}`,
    title,
    desc,
    price,
    category,
  };

  const docIMG = {
    id: doc.id,
    _id: doc._id,
    img,
  };

  products.insert(doc, (err, newDoc) => {
    console.log(err);
  });

  image.insert(docIMG, (err, newDoc) => {
    console.log(err);
  });
}

export function deleteProduct(id) {
  products.remove({ _id: id });
  image.remove({ _id: id });
}

export default products;
