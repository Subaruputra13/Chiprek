import { useCallback } from "react";
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
        icon: "success",
        title: "Success",
        text: "Berhasil melakukan transaksi!",
        timer: 2000,
      });

      navigate("/RincianPembayaran");
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  return [addMenuToCart];
};
