

// Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center px-4 md:px-6 z-50">
      
      {/* Left — Logo + Search */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Logo + App name */}
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            B
          </div>
          <span className="hidden sm:block">BankApp</span>
        </div>

        {/* Search bar (hidden on mobile) */}
        <div className="hidden md:block">
          <input
            type="search"
            placeholder="Rechercher une transaction..."
            className="w-60 md:w-80 lg:w-96 px-4 py-2 rounded-lg border border-gray-200 
                       focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>

      {/* Right — Icons + Profile */}
      <div className="ml-auto flex items-center gap-4">

        {/* Example icon — hidden on xs */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 15s1.5-2 5-2 5 2 5 2"
            />
            <circle cx="9" cy="7" r="4" strokeWidth="2" />
          </svg>
        </button>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-gray-700">
            Mouhamed
            <div className="text-xs text-gray-400">Client Premium</div>
          </div>

          <img
            src="https://i.pinimg.com/1200x/99/25/63/9925634eb606190b64cb37be81fce494.jpg"
            alt="avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow"
          />
        </div>
      </div>
    </header>
  );
}
