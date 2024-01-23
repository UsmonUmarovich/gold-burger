// import { Router } from "express";
// import cart, {
//   allProductsInCart,
//   deleteAllProductsInCart,
//   deleteProductInCart,
//   deleteProductInCartByUsername,
// } from "../services/addToCart.service.js";
// import products from "../services/products.service.js";
// import users from "../services/register.service.js";

// const addToCartRoutes = Router();
// const _cart = [];

// addToCartRoutes.get("/cart", (req, res) => {
//   allProductsInCart((allProductsInCart) => {
//     res.json(allProductsInCart);
//   });
// });

// addToCartRoutes.get("/cart/:id", (req, res) => {
//   const id = req.params.id;

//   cart.findOne({ _id: id }, (err, document) => {
//     if (err) {
//       res.status(500).json({ error: err });
//     } else {
//       if (document) {
//         res.json(document);
//       } else {
//         res.status(404).json({ message: "Cart not found" });
//       }
//     }
//   });
// });

// addToCartRoutes.get("/cart/fu/:username", (req, res) => {
//   const username = req.params.username;

//   cart.find({ username }, (err, username) => {
//     if (err) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//     res.status(200).json(username);
//   });
// });

// addToCartRoutes.post("/cart/:username/:id", (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.params;
//   const username = req.params.username;

//   // Create or load the user's cart from the database
//   cart.findOne({ _id }, (err, userCart) => {
//     products.findOne({ _id: id }, (err, document) => {
//       users.findOne({ username }, (err, user) => {
//         if (err) {
//           res.status(500).json({ error: "Internal server error" });
//           return;
//         }

//         if (!userCart) {
//           // If the user doesn't have a cart, create a new cart

//           const newCart = {
//             username,
//             user: [user],
//             products: [document],
//           };
//           // Insert the new cart into the databases
//           cart.insert(newCart, (err, newDoc) => {
//             if (err) {
//               res.status(500).json({ error: "Failed to create cart" });
//               return;
//             }
//             res.status(200).json(newDoc);
//           });
//         }
//       });
//     });
//   });
// });
// // first _id is cart's id. second id is product's id
// addToCartRoutes.put("/cart/:username/:id", (req, res) => {
//   const username = req.params.username;
//   const id = req.params.id;

//   cart.findOne({ username }, (err, userCart) => {
//     products.findOne({ _id: id }, (err, document) => {
//       if (err) {
//         res.status(500).json({ error: "Internal server error" });
//         return;
//       }
//       // If the user already has a cart, update the cart items
//       userCart.products.push(document);

//       // Update the user's cart in the database
//       cart.update({ username }, userCart, {}, (err, numReplaced) => {
//         if (err) {
//           x;
//           res.status(500).json({ error: "Failed to update cart" });
//           return;
//         }
//         res.status(200).json(numReplaced);
//       });
//     });
//   });
// });

// addToCartRoutes.delete("/cart/:id", (req, res) => {
//   deleteProductInCart(req.params.id);
//   res.json({ message: "product deleted in cart" });
// });

// addToCartRoutes.delete("/cart", (req, res) => {
//   deleteAllProductsInCart();
//   res.json({ message: "all products in cart were deleted" });
// });

// addToCartRoutes.delete("/cart/delbyuser/:username", (req, res) => {
//   deleteProductInCartByUsername(req.params.username);
//   res.json({ message: "product deleted in cart by username" });
// });

// export default addToCartRoutes;
