
// src/App.jsx
import React from "react";
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

import AppLayout from "./layouts/AppLayout";

// Fonction de vérification de login
const isLoggedIn = () => localStorage.getItem("token") ? true : false;

export default function App() {
  return (
    <Routes>
      kp^()
      {/* Pages publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />


      {/* Route protégée */}
      <Route path="/" element={isLoggedIn() ? <AppLayout /> : <Navigate to="/login" replace />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="/paiement" element={<Paiement />} />

        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Si aucune route n'est trouvée */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}