import { useEffect, useState } from "react";
import { Home } from "./pages/home/home";
import "./App.css";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";
import { Menu } from "./pages/menu/menu";
import { Keranjang } from "./pages/keranjang/keranjang";
import { Pembayaran } from "./pages/pembayaran/pembayaran";
import { RincianPembayaran } from "./pages/pembayaran/ricianPembayaran";
import { Dashboard } from "./pages/admin/dashboard";
import { Transaction } from "./pages/admin/transaction";
import { Menus } from "./pages/admin/menus";
import { Report } from "./pages/admin/report";
import { Login } from "./pages/admin/login";
import { SideNav } from "./component/sideNav";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/pelanggan" element={<Home />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/rincianpembayaran" element={<RincianPembayaran />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/transaksi/*" element={<Transaction />} />
        <Route path="/dashboard/menu/*" element={<Menus />} />
      </Routes>
    </>
  );
}

export default App;
