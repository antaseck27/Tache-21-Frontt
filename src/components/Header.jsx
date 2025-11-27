// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
Bars3Icon,
BellIcon,
MoonIcon,
SunIcon,
QuestionMarkCircleIcon,
Cog6ToothIcon,
} from "@heroicons/react/24/outline";

/*
Header responsive + dropdown dans portal.
- min-w-0 sur center pour shrink correct
- flex-shrink-0 sur right pour rester visible
- dropdown rendu dans #dropdown-root pour éviter overflow clipping
*/
function DropdownContent({ onClose, onLogout }) {
return (
<div className="w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md rounded-md overflow-hidden">
<div className="absolute -top-2 right-3 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-100 dark:border-gray-700" />
<Link to="/profile" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700" onClick={onClose}>Profil</Link>
<button onClick={onLogout} className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Déconnexion</button>
</div>
);
}

export default function Header({ onOpenSidebar }) {
const navigate = useNavigate();
const profileBtnRef = useRef(null);
const [openProfile, setOpenProfile] = useState(false);
const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

useEffect(() => {
document.documentElement.classList.toggle("dark", darkMode);
}, [darkMode]);

// close on outside pointerdown/touchstart
useEffect(() => {
function handler(e) {
const btn = profileBtnRef.current;
if (btn && !btn.contains(e.target)) setOpenProfile(false);
}
document.addEventListener("pointerdown", handler, { passive: true });
document.addEventListener("touchstart", handler, { passive: true });
return () => {
document.removeEventListener("pointerdown", handler);
document.removeEventListener("touchstart", handler);
};
}, []);

const handleLogout = () => {
localStorage.removeItem("token");
navigate("/login");
};

const toggleProfile = (e) => {
e.preventDefault && e.preventDefault();
e.stopPropagation && e.stopPropagation();
setOpenProfile(s => !s);
};

// portal root
const portalRoot = typeof document !== "undefined" ? document.getElementById("dropdown-root") : null;

// render dropdown positioned near button
const renderDropdown = () => {
if (!portalRoot || !openProfile || !profileBtnRef.current) return null;
const rect = profileBtnRef.current.getBoundingClientRect();
const top = rect.bottom + 8 + window.scrollY;
const right = window.innerWidth - rect.right + 8; // distance from right
const style = { position: "absolute", top: `${top}px`, right: `${right}px`, zIndex: 9999 };
return ReactDOM.createPortal(
<div style={style}>
<DropdownContent onClose={() => setOpenProfile(false)} onLogout={handleLogout} />
</div>,
portalRoot
);
};

return (
<header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
<div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 md:px-6">
{/* hamburger mobile */}
<div className="md:hidden mr-2 flex-shrink-0">
<button onClick={onOpenSidebar} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Ouvrir menu">
<Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
</button>
</div>

{/* logo left */}
<div className="flex items-center gap-3 mr-3 flex-shrink-0">
<Link to="/dashboard" className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center text-sm">B</div>
<div className="hidden md:block leading-tight">
<div className="text-sm font-semibold text-gray-800 dark:text-gray-100">BankApp</div>
<div className="text-xs text-gray-400 dark:text-gray-300">Gestion bancaire</div>
</div>
</Link>
</div>

{/* center search */}
<div className="flex-1 min-w-0 flex justify-center">
<div className="hidden md:block w-full max-w-xl">
<div className="relative">
<input type="text" placeholder="Rechercher une transaction..." className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300" />
<svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1010.5 3a7.5 7.5 0 000 15z"/></svg>
</div>
</div>

<div className="md:hidden w-full max-w-md">
{mobileSearchOpen ? (
<div className="relative">
<input autoFocus type="text" placeholder="Rechercher..." className="w-full pl-3 pr-10 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none text-sm" />
<button onClick={() => setMobileSearchOpen(false)} className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 rounded">✕</button>
</div>
) : (
<div className="flex justify-start md:justify-center">
<button onClick={() => setMobileSearchOpen(true)} className="p-2 rounded hover:bg-gray-100" aria-label="Rechercher">
<svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1010.5 3a7.5 7.5 0 000 15z"/></svg>
</button>
</div>
)}
</div>
</div>

{/* right icons + profile */}
<div className="flex items-center gap-2 ml-3 flex-shrink-0">
<button onClick={() => setDarkMode(d => !d)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Theme">
{darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
</button>

<button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Notifications">
<BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
</button>

<button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Aide">
<QuestionMarkCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
</button>

<button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Settings">
<Cog6ToothIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
</button>

<div className="relative">
<button ref={profileBtnRef} onClick={toggleProfile} onTouchStart={toggleProfile} className="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-40" aria-haspopup="true" aria-expanded={openProfile}>
<div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center font-semibold text-sm">JD</div>
<div className="hidden md:block text-left">
<div className="text-sm font-medium text-gray-800 dark:text-gray-100">Mouhamed Ndiaye</div>
<div className="text-xs text-blue-600 dark:text-blue-400">Client Premium</div>
</div>
</button>

{renderDropdown()}
</div>
</div>
</div>
</header>
);
}








// src/components/Header.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
// BellIcon,
// MoonIcon,
// SunIcon,
// QuestionMarkCircleIcon,
// Cog6ToothIcon,
// Bars3Icon,
// } from "@heroicons/react/24/outline";

// export default function Header({ onOpenSidebar }) {
// const navigate = useNavigate();
// const [openProfile, setOpenProfile] = useState(false);
// const profileRef = useRef(null);

// const [darkMode, setDarkMode] = useState(() =>
// document.documentElement.classList.contains("dark")
// );
// useEffect(() => {
// document.documentElement.classList.toggle("dark", darkMode);
// }, [darkMode]);

// useEffect(() => {
// function onDocClick(e) {
// if (profileRef.current && !profileRef.current.contains(e.target)) {
// setOpenProfile(false);
// }
// }
// document.addEventListener("click", onDocClick);
// return () => document.removeEventListener("click", onDocClick);
// }, []);

// const handleLogout = () => {
// localStorage.removeItem("token");
// navigate("/login");
// };

// // mobile search toggle
// const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

// return (
// <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40">
// <div className="max-w-[1400px] mx-auto flex items-center h-20 px-4 md:px-6">

// {/* Mobile hamburger (left) */}
// <div className="md:hidden mr-2">
// <button onClick={onOpenSidebar} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
// <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// </button>
// </div>

// {/* LEFT: logo (on mobile small) */}
// <div className="flex items-center gap-3 mr-4">
// <Link to="/dashboard" className="flex items-center gap-3">
// <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm">B</div>
// <div className="hidden md:block leading-tight">
// <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">BankApp</div>
// <div className="text-xs text-gray-400 dark:text-gray-300">Gestion bancaire</div>
// </div>
// </Link>
// </div>

// {/* CENTER: search (desktop) */}
// <div className="flex-1 flex justify-center">
// <div className="hidden md:block w-full max-w-xl">
// <div className="relative">
// <input
// type="text"
// placeholder="Rechercher une transaction..."
// className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
// />
// <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
// </svg>
// </div>
// </div>

// {/* mobile search icon */}
// <div className="md:hidden flex items-center">
// {mobileSearchOpen ? (
// <div className="w-full px-2">
// <input
// autoFocus
// type="text"
// placeholder="Rechercher..."
// className="w-full pl-3 pr-3 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none text-sm"
// />
// </div>
// ) : (
// <button onClick={() => setMobileSearchOpen(true)} className="p-2 rounded hover:bg-gray-100">
// <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
// </svg>
// </button>
// )}
// </div>
// </div>

// {/* RIGHT icons */}
// <div className="flex items-center gap-3 ml-3">
// <button onClick={() => setDarkMode(d => !d)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
// </button>

// <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
// <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
// </button>

// <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
// </button>

// <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
// <Cog6ToothIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
// </button>

// {/* profile dropdown */}
// <div className="relative " ref={profileRef}>
// <button onClick={() => setOpenProfile(s => !s)} className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ">
// <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center font-semibold">JD</div>
// <div className="hidden md:block text-left">
// <div className="text-sm font-medium text-gray-800 dark:text-gray-100">Jean Dupont</div>
// <div className="text-xs text-blue-600 dark:text-blue-400">Client Premium</div>
// </div>
// </button>

// {openProfile && (
// <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md rounded-md overflow-hidden">
// <div className="absolute -top-2 right-3 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-100 dark:border-gray-700"></div>
// <h1 className="text-sm py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">Mon Compt</h1>
// <Link to="/profile" onClick={() => setOpenProfile(false)} className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700  border-gray-100 dark:border-gray-700">Profil</Link>
// <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Déconnexion</button>
// </div>
// )}
// </div>
// </div>
// </div>
// </header>
// );
// }




          

