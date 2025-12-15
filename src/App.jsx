

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
// import GoogleCallback from "./pages/GoogleCallback";

export default function App() {
// true => dark, false => light
const [darkMode, setDarkMode] = useState(() => {
try {
const saved = localStorage.getItem("theme"); // "dark" or "light"
if (saved === "dark") return true;
if (saved === "light") return false;
} 
catch (e) {}
// fallback to system preference
if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
return true;
}
return false;
});

// apply class on mount + whenever darkMode changes (ONLY HERE)
useEffect(() => {
if (typeof document === "undefined") return;
if (darkMode) {
document.documentElement.classList.add("dark");
try { localStorage.setItem("theme", "dark"); } catch (e) {}
} else {
document.documentElement.classList.remove("dark");
try { localStorage.setItem("theme", "light"); } catch (e) {}
}
}, [darkMode]);

const [loggedIn, setLoggedIn] = useState(false);


useEffect(() => {
setLoggedIn(localStorage.getItem("token") ? true : false);
  console.log("loggedIn =", loggedIn);



}, []);



return (
<Routes>
{/* publiques */}
<Route path="/" element={<Home />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
<Route path="/forgot" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

{/* protégées */}
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
