

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

// export default function Header({ onOpenSidebar }) {
//   const navigate = useNavigate();
//   const [openProfile, setOpenProfile] = useState(false);
//   const [openNotif, setOpenNotif] = useState(false);

//   /* ---------------- Dark Mode ---------------- */
//   const [darkMode, setDarkMode] = useState(() => {
//     const stored = localStorage.getItem("darkMode");
//     if (stored !== null) return stored === "true";
//     return false; // default light
//   });

//   const profileRef = useRef();
//   const notifRef = useRef();

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (darkMode) {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   /* ---------------- Fermer dropdown si clic extérieur ---------------- */
//   useEffect(() => {
//     const handler = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setOpenProfile(false);
//       }
//       if (notifRef.current && !notifRef.current.contains(e.target)) {
//         setOpenNotif(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* ---------------- Déconnexion ---------------- */
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <header className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
//       <div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 md:px-6 md:gap-4">

//         {/* Hamburger (Mobile) */}
//         <div className="md:hidden mr-3">
//           <button
//             onClick={onOpenSidebar}
//             className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//           >
//             <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//           </button>
//         </div>

//         {/* Logo */}
//         <Link to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#bfa98a] to-[#d6c5a9] flex items-center justify-center text-white font-semibold shadow-sm">
//             BR
//           </div>
//           <div>
//             <div className="text-lg font-semibold text-[#6b5a49] dark:text-[#f7f3ee]">BankRewmi</div>
//             <div className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">Sa Karàngué Koppar</div>
//           </div>
//         </Link>

//         {/* Right Actions */}
//         <div className="flex items-center gap-2 ml-auto flex-shrink-0 md:gap-3">

//           {/* Dark Mode Toggle */}
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//           >
//             {darkMode ? (
//               <SunIcon className="w-5 h-5 text-yellow-400" />
//             ) : (
//               <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
//             )}
//           </button>

//           {/* Notifications */}
//           <div className="relative" ref={notifRef}>
//             <button
//               onClick={() => setOpenNotif(!openNotif)}
//               className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//             >
//               <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
//                 2
//               </span>
//             </button>

//             {openNotif && (
//               <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50">
//                 <div className="p-3 text-sm text-gray-700 dark:text-gray-200">
//                   <p>Nouvelle transaction reçue</p>
//                   <p className="mt-2">Votre virement a été accepté</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Profile Dropdown */}
//           <div className="relative" ref={profileRef}>
//             <button
//               onClick={() => setOpenProfile(!openProfile)}
//               className="px-3 py-2 text-sm font-medium rounded-full bg-[#e8dcc7] text-[#6b5a49] hover:bg-[#d6c5a9] dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
//             >
//               Mouhamed ▾
//             </button>

//             {openProfile && (
//               <div className="absolute right-0 mt-2 w-48 bg-[#f7f3ee] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50">
//                 <Link
//                   to="/account"
//                   onClick={() => setOpenProfile(false)}
//                   className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-gray-700 text-[#6b5a49] dark:text-gray-200 border-b border-gray-300 dark:border-gray-700"
//                 >
//                   Mon compte
//                 </Link>
//                 <Link
//                   to="/profile"
//                   onClick={() => setOpenProfile(false)}
//                   className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-gray-700 text-[#6b5a49] dark:text-gray-200 border-b border-gray-300 dark:border-gray-700"
//                 >
//                   Profil
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-gray-700 text-[#6b5a49] dark:text-gray-200"
//                 >
//                   Déconnexion
//                 </button>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }




import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Header({ onOpenSidebar }) {
  const navigate = useNavigate();

  /* ---------------- States ---------------- */
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const profileRef = useRef();
  const notifRef = useRef();

  /* ---------------- Dark Mode Logic ---------------- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /* ---------------- Fermer dropdowns ---------------- */
  useEffect(() => {
    const closeIfClickedOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };

    document.addEventListener("mousedown", closeIfClickedOutside);
    return () => document.removeEventListener("mousedown", closeIfClickedOutside);
  }, []);

  /* ---------------- Déconnexion ---------------- */
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center h-20 px-3 md:px-6 gap-4">

        {/* Hamburger (Mobile) */}
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#bfa98a] to-[#d6c5a9] flex items-center justify-center text-white font-semibold shadow-sm">
            BR
          </div>
          <div>
            <p className="text-lg font-semibold text-[#6b5a49] dark:text-[#f7f3ee]">
              BankRewmi
            </p>
            <p className="text-xs text-[#8f7e6b] dark:text-[#d6c5a9]">
              Sa Karàngué Koppar
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center ml-auto gap-2 md:gap-3">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
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
            <button
              onClick={() => setOpenNotif((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition relative"
            >
              <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />

              {/* Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                2
              </span>
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50 animate-fade-in">
                <div className="p-3 text-sm text-gray-700 dark:text-gray-200">
                  <p>Nouvelle transaction reçue</p>
                  <p className="mt-2">Votre virement a été accepté</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="px-3 py-2 text-sm font-medium rounded-full bg-[#e8dcc7] text-[#6b5a49] hover:bg-[#d6c5a9] dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
            >
              Mouhamed ▾
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-[#f7f3ee] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md overflow-hidden z-50 animate-fade-in">
                <Link
                  to="/account"
                  className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-gray-700"
                  onClick={() => setOpenProfile(false)}
                >
                  Mon compte
                </Link>

                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-gray-700 border-y border-gray-300 dark:border-gray-700"
                  onClick={() => setOpenProfile(false)}
                >
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#d6c5a9] dark:hover:bg-gray-700"
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
