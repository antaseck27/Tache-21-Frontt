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

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
      isActive
        ? "bg-[#cbb99a] text-white"
        : "hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
    }`;

  return (
    <aside className="md:fixed md:inset-y-0 md:left-0 md:w-72 bg-white dark:bg-[#0f0f0f] p-6 flex flex-col">
      <nav className="space-y-2 flex-1">
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

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-md"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Déconnexion
      </button>
    </aside>
  );
}
