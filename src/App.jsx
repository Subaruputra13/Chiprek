import { useEffect, useState } from "react";
import { Home } from "./pages/home/home";
import "./App.css";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";

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
        <Route path="/menu" element={<p>s</p>} />
      </Routes>
    </>
  );
}

export default App;
