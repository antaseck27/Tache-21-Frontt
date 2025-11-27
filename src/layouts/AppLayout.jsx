

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar avec toggle */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header avec bouton hamburger */}
        <Header onOpenSidebar={toggleSidebar} />

        <main className="pt-2 px-2 md:px-6 lg:ml-72">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
