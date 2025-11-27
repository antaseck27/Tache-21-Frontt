


// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   HomeIcon,
//   CreditCardIcon,
//   ArrowRightOnRectangleIcon,
//    BanknotesIcon, // <-- AJOUT IMPORTANT

//   UserCircleIcon,
//   LifebuoyIcon,
//   ArrowTrendingUpIcon,
// } from "@heroicons/react/24/outline";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//       isActive
//         ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
//         : "text-gray-700 hover:bg-gray-100"
//     }`;

//   return (
//     <>
//       {/* Sidebar Desktop */}
// <aside className="hidden lg:block w-72 bg-white fixed left-0 top-16 h-[calc(100vh-4rem)] p-6">
//         {/* <div className="flex items-center gap-3 mb-8">
         
//           <div>
//             <div className="text-lg font-semibold">BankApp</div>
//             <div className="text-xs text-gray-400">Gestion bancaire</div>
//           </div>
//         </div> */}

//         <nav className="space-y-2">
//           <NavLink to="/dashboard" className={linkClass}>
//             <HomeIcon className="w-5 h-5" />
//             <span>Dashboard</span>
//           </NavLink>
//           <NavLink to="/transactions" className={linkClass}>
//             <CreditCardIcon className="w-5 h-5" />
//             <span>Transactions</span>
//           </NavLink>
//           <NavLink to="/transfer" className={linkClass}>
//             <ArrowTrendingUpIcon className="w-5 h-5" />
//             <span>Transfert</span>
//           </NavLink>

//           <NavLink to="/paiement" className={linkClass}>
//   <BanknotesIcon className="w-5 h-5" />
//   <span>Paiement</span>
// </NavLink>


//            {/* <NavLink to="/paiement" className={linkClass}>
//         <PaymentTrendingOutline className="w-5 h-5" />
//          <span>Paiement</span>
//           </NavLink> */}


          



//           <NavLink to="/profile" className={linkClass}>
//             <UserCircleIcon className="w-5 h-5" />
//             <span>Profil</span>
//           </NavLink>
//           <NavLink to="/support" className={linkClass}>
//             <LifebuoyIcon className="w-5 h-5" />
//             <span>Support</span>
//           </NavLink>
//         </nav>

//         <div className="mt-10">
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               window.location.href = "/login";
//             }}
//             className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full"
//           >
//             <ArrowRightOnRectangleIcon className="w-5 h-5" />
//             Déconnexion
//           </button>
//         </div>
//       </aside>

//       {/* Sidebar Mobile Drawer */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
//           open ? "block" : "hidden"
//         }`}
//         onClick={() => setOpen(false)}
//       />

//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } lg:hidden`}
//       >
//         <div className="p-6">
//           <button
//             onClick={() => setOpen(false)}
//             className="mb-6 px-3 py-2 bg-gray-100 rounded"
//           >
//             Fermer
//           </button>
//           <nav className="space-y-2">
//             <NavLink
//               to="/dashboard"
//               className={linkClass}
//               onClick={() => setOpen(false)}
//             >
//               <HomeIcon className="w-5 h-5" />
//               <span>Dashboard</span>
//             </NavLink>
//             <NavLink
//               to="/transactions"
//               className={linkClass}
//               onClick={() => setOpen(false)}
//             >
//               <CreditCardIcon className="w-5 h-5" />
//               <span>Transactions</span>
//             </NavLink>


//             <NavLink
//               to="/transfer"
//               className={linkClass}
//               onClick={() => setOpen(false)}
//             >
//               <ArrowTrendingUpIcon className="w-5 h-5" />
//               <span>Transfert</span>
//             </NavLink>


//             <NavLink
//   to="/paiement"
//   className={linkClass}
//   onClick={() => setOpen(false)}
// >
//   <BanknotesIcon className="w-5 h-5" />
//   <span>Paiement</span>
// </NavLink>


//             <NavLink
//               to="/profile"
//               className={linkClass}
//               onClick={() => setOpen(false)}
//             >

//               <UserCircleIcon className="w-5 h-5" />
//               <span>Profil</span>
//             </NavLink>

//             <NavLink
//               to="/support"
//               className={linkClass}
//               onClick={() => setOpen(false)}
//             >
//               <LifebuoyIcon className="w-5 h-5" />
//               <span>Support</span>
//             </NavLink>
//           </nav>
//         </div>
//       </aside>

//       {/* Hamburger Mobile */}
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
//         onClick={() => setOpen(true)}
//       >
//         <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
//         <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
//         <span className="block w-6 h-0.5 bg-gray-700"></span>
//       </button>
//     </>
//   );
// }


// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
HomeIcon,
CreditCardIcon,
ArrowRightOnRectangleIcon,
UserCircleIcon,
LifebuoyIcon,
ArrowTrendingUpIcon,
Bars3Icon,
XMarkIcon,
WalletIcon,
} from "@heroicons/react/24/outline";

/**
* Sidebar responsive + drawer mobile
* - Desktop : fixed left, hauteur entière
* - Mobile : drawer (open prop) + backdrop
* - Déconnexion toujours en bas (mt-auto / justify-between)
*
* Props:
* - open (bool) : si drawer mobile est ouvert
* - onClose (fn) : fermer le drawer
*/

export default function Sidebar({ open, onClose }) {
const linkClass = ({ isActive }) =>
`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
isActive
? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
: "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
}`;

return (
<>
{/* Mobile backdrop + drawer */}
<div
className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? "pointer-events-auto" : "pointer-events-none"}`}
aria-hidden={!open}
>
<div
className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
onClick={onClose}
/>
<aside
className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-md p-6 transform transition-transform ${
open ? "translate-x-0" : "-translate-x-full"
} flex flex-col`}
>
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white">B</div>
<div>
<div className="text-lg font-semibold text-gray-800 dark:text-gray-100">BankApp</div>
<div className="text-xs text-gray-400 dark:text-gray-300">Gestion bancaire</div>
</div>
</div>
<button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
<XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
</button>
</div>

<nav className="space-y-2 flex-1">
<NavLink to="/dashboard" className={linkClass}>
<HomeIcon className="w-5 h-5" />
Dashboard
</NavLink>

<NavLink to="/transactions" className={linkClass}>
<CreditCardIcon className="w-5 h-5" />
Transactions
</NavLink>

<NavLink to="/transfer" className={linkClass}>
<ArrowTrendingUpIcon className="w-5 h-5" />
Transfert
</NavLink>

<NavLink to="/paiement" className={linkClass}>
<WalletIcon className="w-5 h-5" />
Paiement
</NavLink>

<NavLink to="/profile" className={linkClass}>
<UserCircleIcon className="w-5 h-5" />
Profil
</NavLink>

<NavLink to="/support" className={linkClass}>
<LifebuoyIcon className="w-5 h-5" />
Support
</NavLink>
</nav>

{/* Déconnexion toujours en bas */}
<div className="mt-6">
<button
onClick={() => {
localStorage.removeItem("token");
window.location.href = "/login";
}}
className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full"
>
<ArrowRightOnRectangleIcon className="w-5 h-5" />
Déconnexion
</button>
</div>
</aside>
</div>

{/* Desktop fixed sidebar */}
<aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-72 md:bg-white md:border-r md:p-6 md:overflow-y-auto md:flex md:flex-col">
<div>
<div className="flex items-center gap-3 mb-8">
<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white">B</div>
<div>
<div className="text-lg font-semibold text-gray-800 dark:text-gray-100">BankApp</div>
<div className="text-xs text-gray-400 dark:text-gray-300">Gestion bancaire</div>
</div>
</div>

<nav className="space-y-2">
<NavLink to="/dashboard" className={linkClass}>
<HomeIcon className="w-5 h-5" />
Dashboard
</NavLink>

<NavLink to="/transactions" className={linkClass}>
<CreditCardIcon className="w-5 h-5" />
Transactions
</NavLink>

<NavLink to="/transfer" className={linkClass}>
<ArrowTrendingUpIcon className="w-5 h-5" />
Transfert
</NavLink>


<NavLink to="/paiement" className={linkClass}>
<WalletIcon className="w-5 h-5" />
Paiement
</NavLink>

<NavLink to="/profile" className={linkClass}>
<UserCircleIcon className="w-5 h-5" />
Profil
</NavLink>

<NavLink to="/support" className={linkClass}>
<LifebuoyIcon className="w-5 h-5" />
Support
</NavLink>
</nav>
</div>

{/* push logout to bottom */}
<div className="mt-auto">
<button
onClick={() => {
localStorage.removeItem("token");
window.location.href = "/login";
}}
className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 w-full"
>
<ArrowRightOnRectangleIcon className="w-5 h-5" />
Déconnexion
</button>
</div>
</aside>
</>
);
}