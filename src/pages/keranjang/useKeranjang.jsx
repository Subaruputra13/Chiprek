import React from "react";
import { api } from "../../api/api";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// Delete Cart Item By Id
export const useDeleteCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const deleteKeranjang = useCallback(async (body, OnSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.deleteMenuFromCart(body);
      OnSuccess && OnSuccess();
    } catch (err) {
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, deleteKeranjang];
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
