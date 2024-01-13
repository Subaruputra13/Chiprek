import { baseAPI } from "../configs/apiServices";
import Cookies from "js-cookie";

export const api = {
  // Login Admin
  login: (body) => {
    return baseAPI.post("/admin", body);
  },

  // Get All Menu
  getAllMenu: () => {
    return baseAPI.get("/dashboard/menu", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Create Menu
  createMenu: (body) => {
    return baseAPI.post("/dashboard/menu", body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Update Menu
  updateMenu: (id, body) => {
    return baseAPI.put(`/dashboard/menu/${id}`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Delete Menu
  deleteMenu: (id) => {
    return baseAPI.delete(`/dashboard/menu/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Upload Image
  uploadImage: (body) => {
    return baseAPI.post("/upload/image", body);
  },

  // Get All Category
  getAllCategory: () => {
    return baseAPI.get("/category");
  },

  // Get Category By Id
  getCategoryById: (id) => {
    return baseAPI.get(`/category/${id}`);
  },

  // Get All Menu
  getAllMenu: () => {
    return baseAPI.get("/menu");
  },

  // Get Menu By Id
  getMenuById: (id) => {
    return baseAPI.get(`/menu/${id}`);
  },

  // Create Customer
  createCustomer: (body) => {
    return baseAPI.post("/customer", body);
  },

  // Get Cart By Customer Id
  getCartByCustomerId: () => {
    return baseAPI.get(`/customer/cart`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Add Menu To Cart
  addMenuToCart: (body) => {
    return baseAPI.post("/customer/cart", body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Delete Menu From Cart
  deleteMenuFromCart: (body) => {
    return baseAPI.delete("/customer/cart", body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Create Transaction
  createTransaction: (body) => {
    return baseAPI.post("/customer/transaction", body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};
