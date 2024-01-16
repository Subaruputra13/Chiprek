import React from "react";
import { api } from "../../api/api";
import { useCallback, useState } from "react";

// Delete Cart Item By Id
export const useDeleteCart = () => {
  const [dataKeranjang, setDataKeranjang] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getKeranjang = useCallback(async () => {
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

  return [isLoading, dataKeranjang, getKeranjang];
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
