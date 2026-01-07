

// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import Transfer from "./pages/Transfer";
// import Paiement from "./pages/Paiement";
// import ForgotPassword from "./pages/ForgotPassword";
// import Profile from "./pages/Profile";
// import Support from "./pages/Support";
// import ResetPassword from "./pages/ResetPassword";
// import AppLayout from "./layouts/AppLayout";

// export default function App() {
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved === "dark") return true;
//     if (saved === "light") return false;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches;
//   });

//   // useEffect(() => {
//   //   document.documentElement.classList.toggle("dark", darkMode);
//   //   localStorage.setItem("theme", darkMode ? "dark" : "light");
//   // }, [darkMode]);
//   useEffect(() => {
//   if(darkMode){
//     document.body.classList.add("dark");
//   } else {
//     document.body.classList.remove("dark");
//   }
// }, [darkMode]);


//   //  CORRECTION ICI
//   const [loggedIn, setLoggedIn] = useState(() => {
//     return !!localStorage.getItem("token");
//   });

//   return (
    
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Home />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
//       <Route path="/forgot" element={<ForgotPassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />

//       {/* Protégé */}
//       <Route
//         element={
//           loggedIn ? (
//             <AppLayout darkMode={darkMode} setDarkMode={setDarkMode} />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       >
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="transactions" element={<Transactions />} />
//         <Route path="transfer" element={<Transfer />} />
//         <Route path="paiement" element={<Paiement />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="support" element={<Support />} />
//       </Route>

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }
// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";

/* ===================== LAZY PAGES ===================== */
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Transfer = lazy(() => import("./pages/Transfer"));
const Paiement = lazy(() => import("./pages/Paiement"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Support = lazy(() => import("./pages/Support"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));

/* ===================== LOADER GLOBAL ===================== */
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    Chargement...
  </div>
);

export default function App() {
  /* ===================== DARK MODE ===================== */
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ===================== AUTH ===================== */
  const loggedIn = !!localStorage.getItem("token");

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ===== PROTÉGÉ ===== */}
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
    </Suspense>
  );
}
