

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import Paiement from "./pages/Paiement";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./layouts/AppLayout";
import GoogleCallback from "./pages/GoogleCallback";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  //  CORRECTION ICI
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />

      {/* Protégé */}
      <Route
        element={
          loggedIn ? (
            <AppLayout darkMode={darkMode} setDarkMode={setDarkMode} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="paiement" element={<Paiement />} />
        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
