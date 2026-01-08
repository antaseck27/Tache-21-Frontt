import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  LifebuoyIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ open: openProp, onClose }) {
  const [open, setOpen] = useState(!!openProp);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof openProp === "boolean") setOpen(openProp); 
  }, [openProp]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    if (onClose) onClose();
    navigate("/login", { replace: true });
  };

  // const linkClass = ({ isActive }) =>
  //   `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
  //     isActive
  //       ? "bg-[#cbb99a] text-white"
  //       : "hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
  //   }`;
  const linkClass = ({ isActive }) =>
  `sidebar-link ${isActive ? "active" : ""}`;




const handleLinkClick = () => {
setOpen(false);
if (onClose) onClose();
};

return (
<>
{/* Mobile backdrop + drawer */}
  <div className="fixed inset-0 z-40 md:hidden">
{/* <div className={` sidebar mobile fixed inset-0 z-40 md:hidden transition-opacity ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}> */}
<div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => { setOpen(false); if (onClose) onClose(); }} />
<aside
className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-[#111111] shadow-md p-6 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"} flex flex-col`}
aria-hidden={!open}
>
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
{/* <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm ">B</div> */}
<div>
<div className="text-lg font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">BankApp</div>
<div className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Gestion bancaire</div>
</div>
</div>
<button onClick={() => { setOpen(false); if (onClose) onClose(); }} className="p-2 rounded hover:bg-beig-100 dark:hover:bg-beig-700" aria-label="Fermer le menu">
<XMarkIcon className="w-5 h-5 text-beig-600 dark:text-beig-200" />
</button>
</div>

<nav className=" sidebar-nav space-y-2 flex-1">
<NavLink to="/dashboard" className={linkClass} onClick={handleLinkClick}>
<HomeIcon className="w-5 h-5" />
Dashboard
</NavLink>

<NavLink to="/transactions" className={linkClass} onClick={handleLinkClick}>
<CreditCardIcon className="w-5 h-5" />
Transactions
</NavLink>

<NavLink to="/transfer" className={linkClass} onClick={handleLinkClick}>
<ArrowTrendingUpIcon className="w-5 h-5" />
Transfert
</NavLink>

<NavLink to="/paiement" className={linkClass} onClick={handleLinkClick}>
<WalletIcon className="w-5 h-5" />
Paiement
</NavLink>

<NavLink to="/profile" className={linkClass} onClick={handleLinkClick}>
<UserCircleIcon className="w-5 h-5" />
Profil
</NavLink>

<NavLink to="/support" className={linkClass} onClick={handleLinkClick}>
<LifebuoyIcon className="w-5 h-5" />
Support
</NavLink>
</nav>

<div className="mt-6">
<button
onClick={() => {
localStorage.removeItem("token");
window.location.href = "/login";
}}
className="flex items-center gap-2 px-4 py-2 rounded-md text-[#6b5a49] hover:bg-beig-100 dark:text-[#f1e8dc] dark:hover:bg-[#3a3a3a] w-full"
>
<ArrowRightOnRectangleIcon className="w-5 h-5" />
Déconnexion
</button>
</div>
</aside>
</div>

{/* Desktop fixed sidebar (visible md+) */}
<aside className=" sidebar hidden md:fixed md:inset-y-0 md:left-0 md:w-72 md:bg-white md:p-6 md:overflow-y-auto md:flex md:flex-col dark:md:bg-[#0f0f0f]">
<div>
<div className="flex items-center gap-3 mb-8">
<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm">B</div>
<div>
<div className="text-lg font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">BankApp</div>
<div className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Gestion bancaire</div>
</div>
</div>

<nav className="space-y-2">
<NavLink to="/dashboard" className={linkClass}>
<HomeIcon className="w-5 h-5" />
Dashboard
</NavLink>

<NavLink to="/transactions" className={linkClass}>
<CreditCardIcon className="w-5 h-5" />
Transactions
</NavLink>

<NavLink to="/transfer" className={linkClass}>
<ArrowTrendingUpIcon className="w-5 h-5" />
Transfert
</NavLink>

<NavLink to="/paiement" className={linkClass}>
<WalletIcon className="w-5 h-5" />
Paiement
</NavLink>

<NavLink to="/profile" className={linkClass}>
<UserCircleIcon className="w-5 h-5" />
Profil
</NavLink>

<NavLink to="/support" className={linkClass}>
<LifebuoyIcon className="w-5 h-5" />
Support
</NavLink>
</nav>
</div>

<div className="mt-auto">
<button
onClick={() => {
localStorage.removeItem("token");
window.location.href = "/login";
}}
className="flex items-center gap-2 px-4 py-2 rounded-md text-[#6b5a49] hover:bg-gray-100 dark:text-[#f1e8dc] dark:hover:bg-[#3a3a3a] w-full"
>
<ArrowRightOnRectangleIcon className="w-5 h-5" />
Déconnexion
</button>
</div>
</aside>
</>
);
}

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   CreditCardIcon,
//   ArrowRightOnRectangleIcon,
//   UserCircleIcon,
//   LifebuoyIcon,
//   ArrowTrendingUpIcon,
//   WalletIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { useAuth } from "../context/AuthContext";

// export default function Sidebar({ open: openProp, onClose }) {
//   const [open, setOpen] = useState(!!openProp);
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (typeof openProp === "boolean") setOpen(openProp); 
//   }, [openProp]);

//   const handleLogout = () => {
//     logout();
//     setOpen(false);
//     if (onClose) onClose();
//     navigate("/login", { replace: true });
//   };

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
//       isActive
//         ? "bg-[#cbb99a] text-white"
//         : "hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
//     }`;



// const handleLinkClick = () => {
// setOpen(false);
// if (onClose) onClose();
// };

// return (
// <>
// {/* Mobile backdrop + drawer */}
// <div className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
// <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => { setOpen(false); if (onClose) onClose(); }} />
// <aside
// className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-[#111111] shadow-md p-6 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"} flex flex-col`}
// aria-hidden={!open}
// >
// <div className="flex items-center justify-between mb-6">
// <div className="flex items-center gap-3">
// <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm ">B</div>
// <div>
// <div className="text-lg font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">BankApp</div>
// <div className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Gestion bancaire</div>
// </div>
// </div>
// <button onClick={() => { setOpen(false); if (onClose) onClose(); }} className="p-2 rounded hover:bg-beig-100 dark:hover:bg-beig-700" aria-label="Fermer le menu">
// <XMarkIcon className="w-5 h-5 text-beig-600 dark:text-beig-200" />
// </button>
// </div>

// <nav className="space-y-2 flex-1">
// <NavLink to="/dashboard" className={linkClass} onClick={handleLinkClick}>
// <HomeIcon className="w-5 h-5" />
// Dashboard
// </NavLink>

// <NavLink to="/transactions" className={linkClass} onClick={handleLinkClick}>
// <CreditCardIcon className="w-5 h-5" />
// Transactions
// </NavLink>

// <NavLink to="/transfer" className={linkClass} onClick={handleLinkClick}>
// <ArrowTrendingUpIcon className="w-5 h-5" />
// Transfert
// </NavLink>

// <NavLink to="/paiement" className={linkClass} onClick={handleLinkClick}>
// <WalletIcon className="w-5 h-5" />
// Paiement
// </NavLink>

// <NavLink to="/profile" className={linkClass} onClick={handleLinkClick}>
// <UserCircleIcon className="w-5 h-5" />
// Profil
// </NavLink>

// <NavLink to="/support" className={linkClass} onClick={handleLinkClick}>
// <LifebuoyIcon className="w-5 h-5" />
// Support
// </NavLink>
// </nav>

// <div className="mt-6">
// <button
// onClick={() => {
// localStorage.removeItem("token");
// window.location.href = "/login";
// }}
// className="flex items-center gap-2 px-4 py-2 rounded-md text-[#6b5a49] hover:bg-beig-100 dark:text-[#f1e8dc] dark:hover:bg-[#3a3a3a] w-full"
// >
// <ArrowRightOnRectangleIcon className="w-5 h-5" />
// Déconnexion
// </button>
// </div>
// </aside>
// </div>

// {/* Desktop fixed sidebar (visible md+) */}
// <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-72 md:bg-white md:p-6 md:overflow-y-auto md:flex md:flex-col dark:md:bg-[#0f0f0f]">
// <div>
// <div className="flex items-center gap-3 mb-8">
// <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm">B</div>
// <div>
// <div className="text-lg font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">BankApp</div>
// <div className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Gestion bancaire</div>
// </div>
// </div>

// <nav className="space-y-2">
// <NavLink to="/dashboard" className={linkClass}>
// <HomeIcon className="w-5 h-5" />
// Dashboard
// </NavLink>

// <NavLink to="/transactions" className={linkClass}>
// <CreditCardIcon className="w-5 h-5" />
// Transactions
// </NavLink>

// <NavLink to="/transfer" className={linkClass}>
// <ArrowTrendingUpIcon className="w-5 h-5" />
// Transfert
// </NavLink>

// <NavLink to="/paiement" className={linkClass}>
// <WalletIcon className="w-5 h-5" />
// Paiement
// </NavLink>

// <NavLink to="/profile" className={linkClass}>
// <UserCircleIcon className="w-5 h-5" />
// Profil
// </NavLink>

// <NavLink to="/support" className={linkClass}>
// <LifebuoyIcon className="w-5 h-5" />
// Support
// </NavLink>
// </nav>
// </div>

// <div className="mt-auto">
// <button
// onClick={() => {
// localStorage.removeItem("token");
// window.location.href = "/login";
// }}
// className="flex items-center gap-2 px-4 py-2 rounded-md text-[#6b5a49] hover:bg-gray-100 dark:text-[#f1e8dc] dark:hover:bg-[#3a3a3a] w-full"
// >
// <ArrowRightOnRectangleIcon className="w-5 h-5" />
// Déconnexion
// </button>
// </div>
// </aside>
// </>
// );
// }