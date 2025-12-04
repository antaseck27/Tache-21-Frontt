


// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
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

// export default function Sidebar({ open, onClose }) {
//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//       isActive
//         ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
//         : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//     }`;

export default function Sidebar({ open, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-[#f4efe6]"
        : "text-[#6b5a49] hover:bg-[#d8c4a8]/30" 
    }`;



  // Fonction pour fermer le drawer sur mobile au clic d'un lien
  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop + drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-md p-6 transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white">
                B
              </div> */}

              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm">
  B
</div>

              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  BankApp
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-300">
                  Gestion bancaire 
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
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
              className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </aside>
      </div>

      {/* Desktop fixed sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-72 md:bg-white  md:p-6 md:overflow-y-auto md:flex md:flex-col">
        <div>
          {/* <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white">
              B
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                BankApp
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-300">
                Gestion bancaire
              </div>
            </div>
          </div> */}
          <div className="flex items-center gap-3 mb-8">
  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm">
    B
  </div>
  <div>
    <div className="text-lg font-semibold text-[#6b5a49]">
      BankApp
    </div>
    <div className="text-xs text-[#8f7e6b]">
      Gestion bancaire
    </div>
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
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
