import axios, { all } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

const query = {
  // Products API

  getAllProducts: async () => {
    try {
      let result = await api.get("/products");
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getProductById: async (id) => {
    try {
      let result = await api.get("/products/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  postProduct: async (allow) => {
    try {
      let result = await api.post("/products/add/", allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  putProduct: async (id, allow) => {
    try {
      let result = await api.put("/products/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteProductById: async (id) => {
    try {
      let result = await api.delete("/products/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // Product's Image API

  getAllImages: async () => {
    try {
      let result = await api.get("/get-image/");
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  putImage: async (id, allow) => {
    try {
      let result = await api.put("/image/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // Buy API

  getAllBoughtProducts: async () => {
    try {
      let result = await api.get("/buy/");
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getBoughtProductById: async (id) => {
    try {
      let result = await api.get("/buy/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  buyProducts: async (buy) => {
    try {
      let result = await api.post("/buy/", buy);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  putBuyProducts: async (id, buy) => {
    try {
      let result = await api.put("/buy/" + id, buy);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // Login and Register API

  loginApi: async (allow) => {
    try {
      let result = await api.post("/login/", allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  registerApi: async (allow) => {
    try {
      let result = await api.post("/register/", allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // User API

  getAllUsers: async () => {
    try {
      let result = await api.get("/register/");
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getUserById: async (id) => {
    try {
      let result = await api.get("/users/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getUserByPhone: async (phone) => {
    try {
      let result = await api.get("/usersp/" + phone);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  putUserValue: async (id, allow) => {
    try {
      let result = await api.put("/users/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteUserById: async (id) => {
    try {
      let result = await api.delete("/register/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // Chef API

  getAllChefsProducts: async () => {
    try {
      let result = await api.get("/chef/");
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  postChefByBuyId: async (id, allow) => {
    try {
      let result = await api.post("/chef/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  postBuyByChefId: async (id) => {
    try {
      let result = await api.post("/chefback/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  putChef: async (id, allow) => {
    try {
      let result = await api.put("/chef/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // Deliver API

  getAllDelivers: async () => {
    try {
      let result = await api.get("/deliver/");
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getDeliverById: async (id) => {
    try {
      let result = await api.get("/deliver/" + id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getDeliverByPhone: async (phone) => {
    try {
      let result = await api.get("/deliverp/" + phone);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  postDeliver: async (id, allow) => {
    try {
      let result = await api.post("/deliver/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  putDeliver: async (id, allow) => {
    try {
      let result = await api.put("/deliver/" + id, allow);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default query;
