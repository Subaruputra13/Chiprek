import { useEffect, useState } from "react";
import { Home } from "./pages/home/home";
import "./App.css";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";
import { Menu } from "./pages/menu/menu";
import { Keranjang } from "./pages/keranjang/keranjang";
import { Pembayaran } from "./pages/pembayaran/pembayaran";
import { RincianPembayaran } from "./pages/pembayaran/ricianPembayaran";

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
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/Pembayaran" element={<Pembayaran />} />
        <Route path="/RincianPembayaran" element={<RincianPembayaran />} />
      </Routes>
    </>
  );
}

export default App;
