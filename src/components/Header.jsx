// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ onOpenSidebar, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();
  const fileInputRef = useRef();

  // Fermer les menus quand on clique ailleurs
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
    setUser(null);
    navigate("/login");
  };

  const toggleDark = () => setDarkMode(prev => !prev);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/settings/update-avatar", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      setUser(prev => ({ ...prev, avatar: data.avatar }));
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'avatar :", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#1a1a1a] border-b dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 sm:px-4 md:px-6 gap-3">

        {/* Menu mobile */}
        <button onClick={onOpenSidebar} className="p-2 rounded md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Bars3Icon className="w-9 h-9 text-gray-700 dark:text-gray-200" />
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
          {/* <div className="sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
            <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
          </div> */}
          <div
            className="
    w-9 h-9
    sm:w-10 sm:h-10
    md:w-11 md:h-11
    lg:w-12 lg:h-12
    xl:w-14 xl:h-14
    rounded-lg
    flex items-center justify-center
    shadow-lg
    overflow-hidden
  "
          >
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="hidden sm:flex flex-col leading-none">
            <p className="text-sm sm:text-lg font-semibold text-[#6b5a49] dark:text-[#f7f3ee]">BankRewmi</p>
            <p className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Sa Karàngué Koppar</p>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Zone droite */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark/Light */}
          <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
          </button>

          {/* Notification */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setOpenNotif(p => !p)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition relative">
              <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">2</span>
            </button>
            {openNotif && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded-md shadow-md z-50">
                <div className="p-3 text-sm text-gray-700 dark:text-gray-200">
                  <p>Nouvelle transaction reçue</p>
                </div>
              </div>
            )}
          </div>

          {/* Profil */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setOpenProfile(p => !p)} className="flex items-center gap-2 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-full bg-[#e8dcc7] text-[#6b5a49] hover:bg-[#d6c5a9] dark:bg-[#b19b7a] dark:text-[#f1e8dc] dark:hover:bg-[#9c8b73] transition">
              <img
                src={user?.avatar || "/avatar.png"}
                alt={`${user?.prenom || ""} ${user?.name || ""}`}
                className="w-7 h-7 rounded-full object-cover cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              />
              <span className="hidden sm:inline">{user ? `${user.prenom} ${user.name}` : "Utilisateur"} ▾</span>
            </button>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />

            {openProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50">
                <Link to="/account" className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#3a3a3a]" onClick={() => setOpenProfile(false)}>Mon compte</Link>
                <Link to="/profile" className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#3a3a3a] border-y border-gray-200 dark:border-gray-700" onClick={() => setOpenProfile(false)}>Profil</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#3a3a3a]">Déconnexion</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
