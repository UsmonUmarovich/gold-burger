import Admin from "../pages/Admin";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import UserEdit from "../pages/UserEdit";
import BoughtProducts from "../pages/BoughtProducts";
import Login from "../pages/login";
import Chef from "../pages/Chef";
import Deliver from "../pages/Deliver";
import UserOrders from "../pages/UserOrders"

export const routes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/admin",
    element: <Admin />,
  },

  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/admin/:id",
    element: <Admin />,
  },

  {
    path: "/admin/buying",
    element: <BoughtProducts />,
  },

  {
    path: "/admin/buying/:id",
    element: <BoughtProducts />,
  },

  {
    path: "/:id",
    element: <UserEdit />,
  },

  {
    path: "/changepass/:id",
    element: <UserEdit />,
  },

  {
    path: "/chef/",
    element: <Chef />,
  },

  {
    path: "/deliver/",
    element: <Deliver />
  },

  {
    path: "/user/orders",
    element: <UserOrders />
  }
];
