import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Header({ onOpenSidebar, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth(); // 🔥 modification ici

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setOpenProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setOpenNotif(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Déconnexion propre avec suppression du token et empêche retour arrière
  const handleLogout = () => {
    logout(); // supprime le token et met user à null
    setOpenProfile(false);
    navigate("/login", { replace: true }); // empêche retour arrière
  };

  const toggleDark = () => setDarkMode((prev) => !prev);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/settings/update-avatar",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await res.json();
      setUser((prev) => ({ ...prev, avatar: data.avatar }));
    } catch (err) {
      console.error("Erreur avatar :", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#1a1a1a] border-b dark:border-gray-800">
      <div className="max-w-[1400px] mx-auto flex items-center h-20 px-4 gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Bars3Icon className="w-8 h-8" />
        </button>

        <Link to="/dashboard" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <div className="hidden sm:block">
            <p className="font-semibold">BankRewmi</p>
            <p className="text-xs">Sa Karàngué Koppar</p>
          </div>
        </Link>

        <div className="flex-1" />

        <button onClick={toggleDark} className="p-2 rounded-full">
          {darkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpenProfile((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          >
            <img
              src={user?.avatar || "/avatar.png"}
              alt="avatar"
              className="w-7 h-7 rounded-full"
              onClick={() => fileInputRef.current.click()}
            />
            <span className="hidden sm:inline">
              {user ? `${user.prenom} ${user.name}` : "Utilisateur"} ▾
            </span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />

          {openProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#222] border rounded shadow">
              <Link
                to="/profile"
                className="block px-4 py-3 text-sm"
                onClick={() => setOpenProfile(false)}
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
