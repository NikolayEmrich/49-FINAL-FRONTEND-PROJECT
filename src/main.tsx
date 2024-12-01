import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./components/homePage/HomePage";
import HistoryPage from "./components/historyPage/HistoryPage";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
    <HashRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="history" element={<HistoryPage/>} />
          
        </Route>

      </Routes>
    </HashRouter>
    </CartProvider>
  </StrictMode>
);
