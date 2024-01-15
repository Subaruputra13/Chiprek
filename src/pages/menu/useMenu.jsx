import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../api/api";

// Get All Menu
export const useMenu = () => {
  const [dataMenu, setDataMenu] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAllMenu = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllMenu();
      setDataMenu(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataMenu, getAllMenu];
};

// Get Menu By Id
export const useMenuById = () => {
  const [dataMenuById, setDataMenuById] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getMenuById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await api.getMenuById(id);
      console.log(res.data.data);
      setDataMenuById(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataMenuById, getMenuById];
};

// Add Menu To Cart
export const useAddMenuToCart = () => {
  const addMenuToCart = useCallback(async (body, OnSuccess) => {
    try {
      const res = await api.addMenuToCart(body);
      console.log(res.data.data);
      OnSuccess && OnSuccess();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil menambahkan menu ke keranjang!",
        timer: 2000,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }, []);

  return [addMenuToCart];
};

// Get Cart By Customer Id
export const useCartByCustomerId = () => {
  const [dataCart, setDataCart] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCartByCustomerId = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getCartByCustomerId();
      console.log(res.data.data);
      setDataCart(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataCart, getCartByCustomerId];
};

// Get Category Menu
export const useCategoryMenu = () => {
  const [dataCategoryMenu, setDataCategoryMenu] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryMenu = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllCategory();
      // console.log(res.data.data);
      setDataCategoryMenu(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataCategoryMenu, getCategoryMenu];
};

// Get Category Menu By Id
export const useCategoryMenuById = () => {
  const [dataCategoryMenuById, setDataCategoryMenuById] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryMenuById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await api.getCategoryById(id);
      // console.log(res.data.data);
      setDataCategoryMenuById(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataCategoryMenuById, getCategoryMenuById];
};
