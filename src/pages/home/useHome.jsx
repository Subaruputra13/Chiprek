import React, { useCallback, useState } from "react";
import { api } from "../../api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Create Customer
export const useCreateCustomer = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createCustomer = useCallback(async (body, onSuccess) => {
    try {
      setLoading(true);
      const res = await api.createCustomer(body);
      const token = res.data.data.token;
      Cookies.set("token", token, { expires: 1 });
      onSuccess && onSuccess();

      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please wait...",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      if (err.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return [isLoading, createCustomer];
};
