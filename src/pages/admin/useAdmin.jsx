import React, { useCallback, useState } from "react";
import { api } from "../../api/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const loginAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginData = useCallback(async (body) => {
    try {
      const res = await api.login(body);
      const token = res.data.data.token;
      Cookies.set("token", token, { expires: 1 });

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat Datang Admin",
        showConfirmButton: false,
        timer: 1500,
      });
      // set timer
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      setIsLoading(true);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau Password Salah",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, loginData];
};
