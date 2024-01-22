import React from "react";
import { api } from "../../api/api";
import { useCallback, useState } from "react";
import Cookies from "js-cookie";

// Delete Cart Item By Id
export const useDeleteCart = () => {
  const [dataKeranjang, setDataKeranjang] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const deleteKeranjang = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.deleteMenuFromCart();
      console.log(res.data.data);
      setDataKeranjang(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataKeranjang, deleteKeranjang];
};

// Create Transaction
export const useCreateTransaction = () => {
  const [dataTransaction, setDataTransaction] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const createTransaction = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.createTransaction();
      setDataTransaction(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataTransaction, createTransaction];
};
