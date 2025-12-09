// import { useState, useEffect } from "react";

// export default function ProfilePage() {
//   // Etats des toggles
//   const [twoFA, setTwoFA] = useState(false);
//   const [emailNotif, setEmailNotif] = useState(true);
//   const [lightMode, setLightMode] = useState(true);

//   const [isEditing, setIsEditing] = useState(false);

//   const [user, setUser] = useState({
//     prenom: "Mouhamed",
//     nom: "Ndiaye",
//     email: "mouhamed22@gmail.com",
//     numero: "+221 78 182 52 22",
//   });

//     // Fonction pour modifier les données
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsEditing(false); // On ferme le formulaire après sauvegarde
//   };


//   // Mode sombre / clair
//   useEffect(() => {
//     if (!lightMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [lightMode]);

//   return (
//     <div className=" px-4 md:px-8" style={{color:"#6b5a49"}}>
//       <h2 className="text-3xl font-bold">Informations personnelles</h2>
//       <p className="text-gray-600 mb-6">Mettez à jour vos informations.</p>

//       <div className=" section1-profil ">

// {/* ..........................................Profil......................................... */}
//         <div className="infoPersonel flex justify-center gap-3 
//                       md:flex-row md:items-start md:gap-5  
//                       flex-col items-center w-full gap-3">

//         {/* ----------- PROFIL QUI SE TROUVE A GAUCHE ----------- */}
//             <div className="text-center w-full p-5" style={{  background: "#e8dcc7", boxShadow: "2px 0 12px rgb(172, 171, 171)",}}>
//               <h5 className="mb-5 font-bold">Profil</h5>
//               <p className="photo">MHD</p>
//               <h4 className="mt-3">{user.prenom} {user.nom}</h4>
//               <p className=" w-50 m-auto rounded text-gray-400"> Client Prenium </p>
//               <button className="px-4 py-2 mt-7 font-bold"  style={{ background: "var(--gradient-beige-gold)", borderRadius: "7px",}}
//                       onClick={() => setIsEditing(true)}> Modifier Profil </button>  
//             </div>

//         {/* ----------- LES INFORMATION QUI SE TROUVE A DROITE ----------- */}
//             <div className="w-full p-5" style={{ background: "#e8dcc7", boxShadow:"2px 0 12px rgb(172, 171, 171)"}}>
            
//               {!isEditing ? (
//                 <div>

//             {/* --- Affichage des informations --- */}
//                     <h5 className="mb-5 font-bold">Information général</h5>
//                     <div className="flex justify-between mt-6 p-1 border-b">
//                       <p>Prenom</p> <p>{user.prenom}</p>
//                     </div>
//                     <div className="flex justify-between mt-6 p-1 border-b">
//                       <p>Nom</p> <p>{user.nom}</p>
//                     </div>
//                     <div className="flex justify-between mt-6 p-1 border-b">
//                       <p>Email</p> <p>{user.email}</p>
//                     </div>
//                     <div className="flex justify-between mt-6 p-1 border-b">
//                       <p>Numéro</p> <p>{user.numero}</p>
//                     </div>
//                 </div>
//               ) : (
//                 <div>

//           {/* --- Formulaire de modification QUI VA REMPLACER LES INFORMATION GENERAL --- */}
//                   <h5 className="mb-5 font-bold">Modifier les informations</h5>

//                   <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//                     <input type="text" name="prenom" value={user.prenom} onChange={handleChange} className="border p-2 rounded"/>
//                     <input type="text" name="nom" value={user.nom} onChange={handleChange} className="border p-2 rounded"/>
//                     <input type="email" name="email" value={user.email} onChange={handleChange} className="border p-2 rounded"/>
//                     <input type="text" name="numero" value={user.numero} onChange={handleChange} className="border p-2 rounded"/>
//                     <button type="submit" className="p-2 rounded font-bold" style={{background: "var(--gradient-beige-gold)", boxShadow:""}}> Sauvegarder  </button>
//                   </form>
//                 </div>
//               )}
//             </div>
//         </div>


// {/* ..........................................Sécurité......................................... */}
//         <div className="securite w-full md:w-auto mt-4">
//             <h4 className="text-lg font-semibold">Sécurité</h4>
//             <p className="text-gray-500">Gérez vos paramètres de sécurité</p>

//             <div className="border-b pb-2 mt-2">
//               <div className="flex items-center gap-3">
//                 <div className="icone1 mb-3"><i className="fa-solid fa-shield-halved"></i></div>
//                 <div className="w-full ">Authentification à deux facteurs <br />
//                   <span className="text-gray-400 ">Sécurisez votre compte avec 2FA</span>
//                 </div>
//                 <div className="wrapper ml-auto">
//                   <div className={`toggle ${twoFA ? "active" : ""}`} onClick={() => setTwoFA(!twoFA)}>
//                     <div className="circle"></div>
//                 </div>
//               </div>
//             </div>
//           </div>


//           <div className="mt-2">
//             <div className="flex items-center gap-3">
//               <div className="icone3 mb-3"><i className="fa-solid fa-lock"></i></div>
//               <div className="w-full"> Mot de passe <br />
//                 <span className="text-gray-400">Dernière modification il y a 3 mois</span>
//               </div>
//               <div className="wrapper ml-auto">
//                 <button className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">Modifier</button>
//               </div>
//             </div>
//           </div>
//         </div>


// {/* ..........................................Notifications..................................... */}
//         <div className="notifications w-full md:w-auto mt-4">
//           <h4 className="text-lg font-semibold">Notifications</h4>
//           <p className="text-gray-500 ">Choisissez comment vous souhaitez être notifié</p>


//           {/* ................Email.............. */}
//           <div className="mt-2">
//             <div className="flex items-center gap-3">
//               <div><i className="fa-solid fa-envelope text-xl opacity-50"></i></div>
//               <div className="w-full">Notifications par email <br />
//                 <span className="text-gray-400 ">Recevoir des emails</span>
//               </div>
//               <div className="wrapper ml-auto">
//                 <div className={`toggle ${emailNotif ? "active" : ""}`} onClick={() => setEmailNotif(!emailNotif)}>
//                   <div className="circle"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
        
//         </div>


// {/* ..........................................Apparence......................................... */}
//         <div className="Apparence w-full md:w-auto mt-4">
//           <h4 className="text-lg font-semibold">Apparence</h4>
//           <p className="text-gray-500 ">Personnalisez l'apparence de l'application</p>

//           <div className="mt-2">
//             <div className="flex items-center gap-3">
//               <div><i className="fa-sharp fa-solid fa-moon"></i></div>
//               <div className="w-full "> Mode clair <br />
//                 <span className="text-gray-400">Interface lumineuse et claire</span>
//               </div>
//               <div className="wrapper ml-auto">
//                 <div className={`toggle ${lightMode ? "active" : ""}`} onClick={() => setLightMode(!lightMode)}>
//                   <div className="circle"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";

export default function ProfilePage() {
// Etats des toggles
const [twoFA, setTwoFA] = useState(false);
const [emailNotif, setEmailNotif] = useState(true);

// lightMode = true => light, false => dark
const [lightMode, setLightMode] = useState(() => {
try {
const saved = typeof window !== "undefined" && localStorage.getItem("theme");
if (saved === "dark") return false;
if (saved === "light") return true;
} catch (e) {}
if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return false;
return true;
});

const [isEditing, setIsEditing] = useState(false);

const [user, setUser] = useState({
prenom: "Mouhamed",
nom: "Ndiaye",
email: "mouhamed22@gmail.com",
numero: "+221 78 182 52 22",
});

// Fonction pour modifier les données
const handleChange = (e) => {
setUser({ ...user, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
e.preventDefault();
setIsEditing(false); // On ferme le formulaire après sauvegarde
};

// Mode sombre / clair: synchronise la classe <html> et localStorage
useEffect(() => {
if (typeof document === "undefined") return;
if (!lightMode) {
document.documentElement.classList.add("dark");
try { localStorage.setItem("theme", "dark"); } catch (e) {}
} else {
document.documentElement.classList.remove("dark");
try { localStorage.setItem("theme", "light"); } catch (e) {}
}
}, [lightMode]);

// small Toggle component (visual)
const Toggle = ({ active, onClick }) => (
<button
onClick={onClick}
aria-pressed={active}
className={`inline-flex items-center w-12 h-6 p-1 rounded-full transition-colors duration-200 focus:outline-none
${active ? "bg-green-500 justify-end" : "bg-gray-300 dark:bg-gray-600 justify-start"}`}
>
<span className="w-4 h-4 bg-white rounded-full shadow-sm" />
</button>
);

return (
<div className="min-h-screen px-4 md:px-8 py-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
<div className="max-w-5xl mx-auto">
<h2 className="text-3xl font-bold mb-1 dark:text-[#f1e8dc]">Informations personnelles</h2>
<p className="text-sm text-[#8f7e6b] dark:text-[#d6c5a9] mb-6">Mettez à jour vos informations.</p>

<div className="space-y-6">
{/* Profil + informations */}
<div className="flex flex-col md:flex-row gap-4">
{/* Profil (gauche) */}
<div className="w-full md:w-1/3 p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors">
<h5 className="mb-4 font-bold dark:text-[#f1e8dc]">Profil</h5>
<div className="flex flex-col items-center">
<div className="w-20 h-20 rounded-full bg-[#cbb99a] dark:bg-[#8f7e6b] flex items-center justify-center text-white text-xl font-bold">
MHD
</div>
<h4 className="mt-4 text-lg font-semibold dark:text-[#f1e8dc]">{user.prenom} {user.nom}</h4>
<p className="mt-2 text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Client Premium</p>

<button
onClick={() => setIsEditing(true)}
className="mt-6 px-4 py-2 rounded-md font-bold bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white dark:from-[#6b5a49] dark:to-[#3b352c] hover:opacity-95 transition"
>
Modifier Profil
</button>
</div>
</div>

{/* Informations (droite) */}
<div className="w-full md:w-2/3 p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors">
{!isEditing ? (
<div>
<h5 className="mb-4 font-bold dark:text-[#f1e8dc]">Information générale</h5>

<div className="space-y-3">
<div className="flex justify-between items-center border-b border-[#e7ded5] dark:border-[#3a3a3a] py-3">
<p className="text-sm">Prénom</p>
<p className="font-medium dark:text-[#f1e8dc]">{user.prenom}</p>
</div>

<div className="flex justify-between items-center border-b border-[#e7ded5] dark:border-[#3a3a3a] py-3">
<p className="text-sm">Nom</p>
<p className="font-medium dark:text-[#f1e8dc]">{user.nom}</p>
</div>

<div className="flex justify-between items-center border-b border-[#e7ded5] dark:border-[#3a3a3a] py-3">
<p className="text-sm">Email</p>
<p className="font-medium dark:text-[#f1e8dc]">{user.email}</p>
</div>

<div className="flex justify-between items-center border-b border-[#e7ded5] dark:border-[#3a3a3a] py-3">
<p className="text-sm">Numéro</p>
<p className="font-medium dark:text-[#f1e8dc]">{user.numero}</p>
</div>
</div>
</div>
) : (
<div>
<h5 className="mb-4 font-bold dark:text-[#f1e8dc]">Modifier les informations</h5>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">
<input
type="text"
name="prenom"
value={user.prenom}
onChange={handleChange}
className="w-full p-2 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
/>
<input
type="text"
name="nom"
value={user.nom}
onChange={handleChange}
className="w-full p-2 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
/>
<input
type="email"
name="email"
value={user.email}
onChange={handleChange}
className="w-full p-2 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
/>
<input
type="text"
name="numero"
value={user.numero}
onChange={handleChange}
className="w-full p-2 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
/>

<div className="flex gap-2">
<button type="submit" className="px-4 py-2 rounded font-bold bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white hover:opacity-95 transition">
Sauvegarder
</button>
<button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700">
Annuler
</button>
</div>
</form>
</div>
)}
</div>
</div>

{/* Sécurité */}
<div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors">
<h4 className="text-lg font-semibold mb-2 dark:text-[#f1e8dc]">Sécurité</h4>
<p className="text-sm text-[#6b5a49] dark:text-[#d6c5a9] mb-4">Gérez vos paramètres de sécurité</p>

<div className="border-b border-[#e7ded5] dark:border-[#3a3a3a] pb-3">
<div className="flex items-center gap-3">
<div className="text-xl text-[#6b5a49] dark:text-[#d6c5a9]"><i className="fa-solid fa-shield-halved" /></div>
<div className="flex-1">
<div className="font-medium dark:text-[#f1e8dc]">Authentification à deux facteurs</div>
<div className="text-xs text-[#8f7e6b] dark:text-[#bfb6a5]">Sécurisez votre compte avec 2FA</div>
</div>
<div>
<Toggle active={twoFA} onClick={() => setTwoFA((s) => !s)} />
</div>
</div>
</div>

<div className="mt-4">
<div className="flex items-center gap-3">
<div className="text-xl text-[#6b5a49] dark:text-[#d6c5a9]"><i className="fa-solid fa-lock" /></div>
<div className="flex-1">
<div className="font-medium dark:text-[#f1e8dc]">Mot de passe</div>
<div className="text-xs text-[#8f7e6b] dark:text-[#bfb6a5]">Dernière modification il y a 3 mois</div>
</div>
<div>
<button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Modifier</button>
</div>
</div>
</div>
</div>

{/* Notifications */}
<div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors">
<h4 className="text-lg font-semibold mb-2 dark:text-[#f1e8dc]">Notifications</h4>
<p className="text-sm text-[#6b5a49] dark:text-[#d6c5a9] mb-4">Choisissez comment vous souhaitez être notifié</p>

<div className="space-y-3">
<div className="flex items-center gap-3">
<div className="text-xl text-[#6b5a49] dark:text-[#d6c5a9]"><i className="fa-solid fa-envelope" /></div>
<div className="flex-1">
<div className="dark:text-[#f1e8dc]">Notifications par email</div>
<div className="text-xs text-[#8f7e6b] dark:text-[#bfb6a5]">Recevoir des emails</div>
</div>
<div>
<Toggle active={emailNotif} onClick={() => setEmailNotif((s) => !s)} />
</div>
</div>
</div>
</div>

{/* Apparence */}
<div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors">
<h4 className="text-lg font-semibold mb-2 dark:text-[#f1e8dc]">Apparence</h4>
<p className="text-sm text-[#6b5a49] dark:text-[#d6c5a9] mb-4">Personnalisez l'apparence de l'application</p>

<div className="flex items-center gap-3">
<div className="text-xl text-[#6b5a49] dark:text-[#d6c5a9]"><i className="fa-sharp fa-solid fa-moon" /></div>
<div className="flex-1">
<div className="dark:text-[#f1e8dc]">Mode clair</div>
<div className="text-xs text-[#8f7e6b] dark:text-[#bfb6a5]">Interface lumineuse et claire</div>
</div>
<div>
<Toggle active={lightMode} onClick={() => setLightMode((s) => !s)} />
</div>
</div>
</div>
</div>
</div>
</div>
);
}
