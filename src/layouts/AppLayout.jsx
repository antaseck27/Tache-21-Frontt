

// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// export default function AppLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   return (
//     <div className="min-h-screen flex  bg-[#f7f3ee] text-[#6b5a49]">
//       {/* Sidebar avec toggle */}
//       <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col">
//         {/* Header avec bouton hamburger */}
//         <Header onOpenSidebar={toggleSidebar} />

//         <main className="pt-2 px-2 md:px-6 lg:ml-72">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }



// src/layouts/AppLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AppLayout({ darkMode, setDarkMode }) {
// contrôle l'ouverture du drawer mobile
const [sidebarOpen, setSidebarOpen] = useState(false);

const openSidebar = () => setSidebarOpen(true);
const closeSidebar = () => setSidebarOpen(false);
const toggleSidebar = () => setSidebarOpen(prev => !prev);

// Fermer le drawer quand on change de route (optionnel — utile si tu utilises Link)
useEffect(() => {
const handleRoute = () => setSidebarOpen(false);
window.addEventListener("popstate", handleRoute);
return () => window.removeEventListener("popstate", handleRoute);
}, []);

return (
// fond global + texte (s'adapte au thème)
<div className="min-h-screen bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300 pt-20">
{/* Header: onOpenSidebar déclenche l'ouverture du drawer mobile */}
<Header onOpenSidebar={openSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />

{/* Sidebar: on desktop visible en permanence (reserve space via md:pl-72) */}
<Sidebar open={sidebarOpen} onClose={closeSidebar} />

{/* Reserve l'espace pour la sidebar desktop (md:pl-72) — header est sticky donc contenu reste en flux */}
<div className="md:pl-72">
{/* main n'a PAS besoin de pt si header est sticky (le header reste dans le flux) */}
<main className="min-h-screen">
<Outlet />
</main>
</div>
</div>
);
}

