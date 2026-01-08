// // src/layouts/AppLayout.jsx
// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

// export default function AppLayout({ darkMode, setDarkMode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const openSidebar = () => setSidebarOpen(true);
//   const closeSidebar = () => setSidebarOpen(false);
//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   // Fermer le drawer au changement d’historique (mobile)
//   useEffect(() => {
//     const handleRoute = () => setSidebarOpen(false);
//     window.addEventListener("popstate", handleRoute);
//     return () => window.removeEventListener("popstate", handleRoute);
//   }, []);

//   // Sauvegarder et récupérer le thème dans localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setDarkMode(savedTheme === "dark");
//     }
//   }, [setDarkMode]);

//   // useEffect(() => {
//   //   localStorage.setItem("theme", darkMode ? "dark" : "light");
//   //   document.body.classList.toggle("dark", darkMode);
//   // }, [darkMode]);
//  useEffect(() => {
//   if(darkMode) {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
// }, [darkMode]);




  

//   return (
//     <div className="
//       min-h-screen
//       bg-transparent  dark:bg-[#1a1a1a]
//       text-[#6b5a49] dark:text-[#f1e8dc]
//       transition-colors duration-300
//     ">
//       {/* Header */}
//       <Header
//         onOpenSidebar={openSidebar}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} onClose={closeSidebar} />

//       {/* Contenu */}
//       <div className="md:pl-72 pt-20">
//         <main className="min-h-screen px-2 md:px-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AppLayout({ darkMode, setDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Fermer le drawer au changement d’historique (mobile)
  useEffect(() => {
    const handleRoute = () => setSidebarOpen(false);
    window.addEventListener("popstate", handleRoute);
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  // Sauvegarder et récupérer le thème dans localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, [setDarkMode]);

  // Application du thème sur le <html> (ou <body>) en fonction du darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-transparent dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
      {/* Header */}
      <Header onOpenSidebar={openSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* Contenu */}
      <div className="md:pl-72 pt-20">
        <main className="min-h-screen px-2 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
