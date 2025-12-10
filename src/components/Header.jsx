<<<<<<< HEAD
// src/components/Header.jsx
=======




>>>>>>> 77f4428 (modification rendu)
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

export default function Header({ onOpenSidebar, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setOpenProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 sm:px-4 md:px-6 gap-3">

<<<<<<< HEAD
        {/* Sidebar Button Mobile */}
        <button onClick={onOpenSidebar} className="p-2 rounded md:hidden hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-[#bfa98a] to-[#d6c5a9] flex items-center justify-center text-white font-semibold shadow-sm">
            BR
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <p className="text-sm sm:text-lg font-semibold text-[#6b5a49] dark:text-[#f7f3ee]">BankRewmi</p>
            <p className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Sa Karàngué Koppar</p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center min-w-0 relative">
          {/* Desktop */}
          <div className="hidden md:block w-full max-w-xl">
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#f7f3ee] text-[#6b5a49] border border-gray-200 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 transition"
            />
          </div>
=======
return (
<header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#1a1a1a] border-b  dark:border-gray-800 transition-colors duration-200">

<div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 sm:px-4 md:px-6 gap-3">
<button onClick={onOpenSidebar} className="p-2 rounded md:hidden hover:bg-beige-100 dark:hover:bg-gray-700">
<Bars3Icon className="w-9 h-9 text-gray-700 dark:text-gray-200" />
</button>

<Link to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
<div className=" sm:w-10 sm:h-10 rounded-lg  flex items-center justify-center shadow-lg overflow-hidden">
  <img 
    src={logo}    // ou ton chemin: "/assets/images/logo.png"
    alt="logo"
    className="  shadow-s object-containm "
  />
</div>

<div className="hidden sm:flex flex-col leading-none">
<p className="text-sm sm:text-lg font-semibold text-[#6b5a49] dark:text-[#f7f3ee]">BankRewmi</p>
<p className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Sa Karàngué Koppar</p>
</div>
</Link>
>>>>>>> 77f4428 (modification rendu)

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
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1010.5 3a7.5 7.5 0 000 15z" />
            </svg>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

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
          <div className="relative" ref={notifRef}>
            <button onClick={() => setOpenNotif((prev) => !prev)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">2</span>
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50">
                <div className="p-3 text-sm text-gray-700 dark:text-gray-200">
                  <p>Nouvelle transaction reçue</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-full bg-[#e8dcc7] text-[#6b5a49] hover:bg-[#d6c5a9] dark:bg-[#b19b7a] dark:text-[#f1e8dc] dark:hover:bg-[#9c8b73]"
            >
              <span className="w-7 h-7 rounded-full bg-[#cbb99a] dark:bg-[#8f7e6b] flex items-center justify-center text-white text-xs sm:text-sm">M</span>
              <span className="hidden sm:inline">Mouhamed ▾</span>
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50">
                <Link to="/account" className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#3a3a3a]" onClick={() => setOpenProfile(false)}>
                  Mon compte
                </Link>

                <Link to="/profile" className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#3a3a3a] border-y border-gray-200 dark:border-gray-700" onClick={() => setOpenProfile(false)}>
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#3a3a3a]"
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
