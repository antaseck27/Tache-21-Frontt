import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Header({ onOpenSidebar, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();
  const fileInputRef = useRef();
  const [notifications, setNotifications] = useState([]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const token = localStorage.getItem("token");
  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const API = import.meta.env.VITE_API_URL;

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

  //  Déconnexion propre avec suppression du token et empêche retour arrière
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
      const res = await fetch(`${API}/api/settings/update-avatar`, {
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



  // NOTIFICATION
  const getNotifications = async (token) => {
    const res = await fetch(`${API}/api/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des notifications");
    return await res.json();
  };

  //  une notification comme lue
  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // les notifications toutes les 5 secondes
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const data = await getNotifications(token);
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-[#f1e8dc]   dark:bg-[#3a2e2a]  border-[#cbb99a] dark:border-[#b19b7a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center h-20 px-4 gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded md:hidden hover:bg-gray-100 dark:hover:bg-[#b19b7a]"
        >
          <Bars3Icon className="w-8 h-8" />
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
          <div
            className="
    w-10 h-10
    sm:w-12 sm:h-12
    md:w-14 md:h-14
    rounded-lg
    flex items-center justify-center
    shadow-lg
    overflow-hidden
    bg-white
  "
          >
            <img
              src={logo}
              alt="logo"
              className="
      w-8 h-8
      sm:w-10 sm:h-10
      md:w-12 md:h-12
      object-contain
    "
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
          <button onClick={toggleDark} className="p-2 rounded-full hover:bg-[#e8dcc7] dark:hover:bg-[#b19b7a] transition">
            {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-[#6b5a49] dark:text-[#f1e8dc]" />}
          </button>

          {/* Notification */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setOpenNotif(p => !p)} className="p-2 rounded-full hover:bg-[#e8dcc7] dark:hover:bg-[#b19b7a] transition relative">
              <BellIcon className="w-5 h-5 text-[#b19b7a] dark:text-[#f1e8dc]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white dark:bg-[#222] border border-[#cbb99a] dark:border-[#b19b7a] rounded-md shadow-md z-50">
                {notifications.length === 0 ? (
                  <p className="p-3 text-sm text-[#b19b7a] dark:text-[#f1e8dc]">Aucune notification</p>
                ) : (
                  notifications.map(n => (
                    <div key={n._id} className={`p-3 text-sm border-b border-[#cbb99a] dark:border-[#b19b7a] cursor-pointer ${!n.read ? "bg-[#e8dcc7] dark:bg-[#b19b7a]" : ""}`} onClick={() => handleMarkAsRead(n._id)}>
                      <p>{n.message}</p>
                      <span className="text-xs text-[#8f7e6b]">{new Date(n.createdAt).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Profil */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile(p => !p)}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-full bg-[#e8dcc7] text-[#6b5a49] hover:bg-[#d6c5a9] dark:bg-[#b19b7a] dark:text-[#f1e8dc] dark:hover:bg-[#9c8b73] transition"
            >
             <img
  src={
    user?.avatar
      ? `${API}/${user.avatar}`
      : "/avatar.png"
  }
  className="w-7 h-7 rounded-full object-cover"
/>



              <span className="hidden sm:inline">


                {user ? `${capitalize(user.prenom)} ${capitalize(user.name)}` : "Utilisateur"}
                ▾
              </span>
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-[#f3e8d7] dark:bg-[#3a2e2a] border border-[#cbb99a] dark:border-[#b19b7a] rounded-md shadow-md overflow-hidden z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#9c8b73]"
                  onClick={() => setOpenProfile(false)}
                >
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-[#9c8b73]"
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