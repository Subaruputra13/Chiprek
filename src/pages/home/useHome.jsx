import React, { useCallback, useState } from "react";
import { api } from "../../api/api";

// Create Customer
export const useCreateCustomer = () => {
  const [isLoading, setLoading] = useState(false);

  const createCustomer = useCallback(async (body, onSuccess) => {
    try {
      setLoading(true);
      const res = await api.createCustomer(body);
      onSuccess && onSuccess();

      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please wait...",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(res.data);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, []);

  return { isLoading, createCustomer };
};
