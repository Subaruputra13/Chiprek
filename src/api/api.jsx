import { baseAPI } from "../configs/apiServices";
import Cookies from "js-cookie";

export const api = {
  // Login Admin
  login: (body) => {
    return baseAPI.post("/admin", body);
  },

  // Dasboard Admin
  getDashboardAdmin: () => {
    return baseAPI.get(`/dashboard`, {
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
    return baseAPI.get(`/category`);
  },

  // Get Category By Id
  getCategoryById: (id) => {
    return baseAPI.get(`/category/${id}`);
  },

  // Get All Menu
  getAllMenu: () => {
    return baseAPI.get(`/menu`);
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
    return baseAPI.delete(`/customer/cart`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: body,
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

  // Get Transaction By Customer Id
  getTransactionByCustomerId: () => {
    return baseAPI.get(`/customer/transaction`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Get Transaction By Id Admin
  getTransactionById: (id) => {
    return baseAPI.get(`/dashboard/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Update Transaction Admin
  updateTransaction: (id, body) => {
    return baseAPI.put(`/dashboard/transaction/${id}`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Get All Transaction Admin
  getTransaction: () => {
    return baseAPI.get(`/dashboard/transaction`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Get All Menu Admin
  getAllMenuAdmin: () => {
    return baseAPI.get(`/dashboard/menu`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Get Menu By Id Admin
  getMenuByIdAdmin: (id) => {
    return baseAPI.get(`/dashboard/menu/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Create Menu Admin
  createMenuAdmin: (body) => {
    return baseAPI.post(`/dashboard/menu`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Update Menu Admin
  updateMenuAdmin: (id, body) => {
    return baseAPI.put(`/dashboard/menu/${id}`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },

  // Delete Menu Admin
  deleteMenuAdmin: (id) => {
    return baseAPI.delete(`/dashboard/menu/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
};
