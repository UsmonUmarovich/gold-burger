import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes.js";
// import addToCartRoutes from "./routes/addToCart.routes.js";
import Buy from "./routes/Buy.routes.js";
import LoginRoutes from "./routes/login.routes.js";
import registerRoutes from "./routes/register.routes.js";
import chefRoutes from "./routes/chef.routes.js";
import deliverRoutes from "./routes/deliver.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productsRoutes);
// app.use(addToCartRoutes);
app.use(Buy);
app.use(LoginRoutes);
app.use(registerRoutes);
app.use(chefRoutes);
app.use(deliverRoutes)

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
