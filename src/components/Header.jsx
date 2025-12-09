


import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export default function Header({ onOpenSidebar }) {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  /* ---------------------- Dark Mode ---------------------- */
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const profileRef = useRef();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /* ---------------------- Fermer dropdown si clic extérieur ---------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------------- Déconnexion ---------------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 md:px-6 md:gap-4">

        {/* Hamburger (Mobile) */}
        <div className="md:hidden mr-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 mr-3 flex-shrink-0">
          {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center text-lg font-bold">
            B
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              BankApp
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Gestion bancaire
            </p>
          </div> */}

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] flex items-center justify-center text-white font-semibold shadow-sm">
              BR
            </div>
            <div>
              <div className="text-lg font-semibold text-[#6b5a49]">
                BankRewmi
              </div>
              <div className="text-xs text-[#8f7e6b]">
                {/* Gestion bancaire */}
                Sa Karàngué Koppar
              </div>
            </div>
          </div>

        </Link>

        {/* Search bar */}
        <div className="flex-1 flex justify-center min-w-0 relative">
          {/* Desktop */}
          <div className="hidden md:block w-full max-w-xl">
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              className="w-full pl-4 pr-12 py-3 rounded-xl  bg-[#f7f3ee] text-[#6b5a49] border border-gray-200 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 transition"
            />
          </div>

          {/* Mobile Search */}
          {mobileSearchOpen && (
            <div className="absolute top-20 left-0 w-full px-3 md:hidden">
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-3 pr-10 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Mobile Search Icon */}
          <button
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="md:hidden p-2 ml-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1010.5 3a7.5 7.5 0 000 15z"
              />
            </svg>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-3 flex-shrink-0 md:gap-3">

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
              2
            </span> */}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="px-3 py-2 text-sm font-medium rounded-full  bg-[#f7f3ee] text-[#6b5a49] dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Mouhamed ▾
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50">
                <Link
                  to="/account"
                  onClick={() => setOpenProfile(false)}
                  className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
                >
                  Mon compte
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setOpenProfile(false)}
                  className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
                >
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


