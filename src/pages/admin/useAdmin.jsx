import React, { useCallback, useState } from "react";
import { api } from "../../api/api";
import Cookies from "js-cookie";
import { message } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Login Admin
export const loginAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginData = useCallback(async (body, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.login(body);
      const token = res.data.data.token;
      Cookies.set("token", token, { expires: 1 });
      onSuccess && onSuccess();

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat Datang Admin",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      if (err.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Email atau Password Salah",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, loginData];
};

// Dasboard Admin
export const useDashboardAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState();

  const getDashboardAdmin = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getDashboardAdmin();
      setDataDashboard(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Dashboard",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(err.response);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataDashboard, getDashboardAdmin];
};

// Get All Transaction
export const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataTransaction, setDataTransaction] = useState();

  const getTransaction = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getTransaction();
      console.log(res.data.data);
      setDataTransaction(res.data.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Transaksi",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataTransaction, getTransaction];
};

// Update Transaction
export const useUpdateTransaction = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const updateTransaction = useCallback(async (id, body, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.updateTransaction(id, body);
      onSuccess && onSuccess();

      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Berhasil update transaksi",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsLoading(false);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal update transaksi",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, updateTransaction];
};

// Get All Menu
export const useMenusAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState();

  const getAllMenu = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllMenuAdmin();
      setDataMenu(res.data.data);

      console.log(res.data.data);

      Swal.fire({
        icon: "success",
        title: "Berhasil Memuat Menu",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Menu",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataMenu, getAllMenu];
};

// Get Menu By Id
export const useMenuById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState();

  const getMenuById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await api.getMenuById(id);
      setDataMenu(res.data.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Menu",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, dataMenu, getMenuById];
};

// Create Menu
export const useCreateMenu = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createMenu = useCallback(async (body, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.createMenuAdmin(body);

      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Berhasil tambah menu",
        showConfirmButton: false,
        timer: 1500,
      });
      onSuccess && onSuccess();

      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal tambah menu",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, createMenu];
};

// Update Menu
export const useUpdateMenu = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateMenu = useCallback(async (id, body, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.updateMenuAdmin(id, body);
      onSuccess && onSuccess();

      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Berhasil update menu",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsLoading(false);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal update menu",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, updateMenu];
};

// Delete Menu
export const useDeleteMenu = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteMenu = useCallback(async (id, onSuccess) => {
    try {
      setIsLoading(true);
      const res = await api.deleteMenuAdmin(id);
      onSuccess && onSuccess();

      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Berhasil delete menu",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsLoading(false);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal delete menu",
        text: "Silahkan Coba Lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, deleteMenu];
};

// Upload Image
export const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadImage = useCallback(async (file, onSuccess) => {
    try {
      setIsLoading(true);
      const body = {
        image: await getBase64(file.file.originFileObj),
      };
      const res = await api.uploadImage(body);

      if (res) {
        message.open({
          type: "success",
          content: `Berhasil Upload Gambar!`,
        });
        onSuccess && onSuccess(res.data.data);
      }
    } catch (err) {
      message.open({
        type: "error",
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, uploadImage];
};
