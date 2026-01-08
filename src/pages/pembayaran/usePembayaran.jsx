import { useCallback, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Create Transaction
export const useCreateTransaction = () => {
  const navigate = useNavigate();

  const addMenuToCart = useCallback(async (body, OnSuccess) => {
    try {
      const res = await api.createTransaction(body);
      console.log(res.data.data);

      OnSuccess && OnSuccess();

      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please wait...",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/RincianPembayaran");
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  return [addMenuToCart];
};

// Get Transaction By Customer Id
export const useTransactionByCustomerId = () => {
  const navigate = useNavigate();
  const [dataTransaction, setDataTransaction] = useState();

  const getTransactionByCustomerId = useCallback(async () => {
    try {
      const res = await api.getTransactionByCustomerId();
      console.log(res.data.data);
      setDataTransaction(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  return [dataTransaction, getTransactionByCustomerId];
};
