
import React, { useState } from "react";

export default function Transfer() {
const [activeTab, setActiveTab] = useState("interne");

const contacts = [
{ name: "Mamadou Ndiaye", email: "mamadou.ndiaye@email.sn", icon: "fa-solid fa-user" },
{ name: "Awa Diop", email: "awa.diop@email.sn", icon: "fa-solid fa-user" },
{ name: "Cheikh Fall", email: "cheikh.fall@email.sn", icon: "fa-solid fa-user" },
{ name: "Fatoumata Sow", email: "fatoumata.sow@email.sn", icon: "fa-solid fa-user" },
];

const infos = [
{ icon: "fa-solid fa-user", title: "Les transferts internes sont instantanés.", subtitle: "Entre vos comptes BankApp" },
{ icon: "fa-solid fa-wallet", title: "Gérez facilement vos portefeuilles.", subtitle: "Toutes vos cartes BankApp" },
{ icon: "fa-solid fa-credit-card", title: "Vos paiements sécurisés.", subtitle: "Cartes BankApp protégées" },
];

return (
<div className="min-h-screen p-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
{/* Header */}
<div className="max-w-6xl mx-auto text-center mb-8">
<h2 className="text-3xl font-bold mb-2 dark:text-[#f1e8dc]">Transfert d argent</h2>
<p className="text-[#8f7e6b] dark:text-[#d6c5a9] text-lg">
Envoyez de l argent à vos proches ou payez vos factures
</p>
</div>

<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Formulaire */}
<div className="md:col-span-2 bg-white dark:bg-[#2a2a2a] p-6 md:p-8 rounded-xl shadow-lg border border-[#e7ded5] dark:border-[#3a3a3a] transition-colors">
{/* Onglets */}
<div className="flex mb-6">
<div className="w-full rounded-xl flex bg-[#e9e0d7] dark:bg-[#262424] border border-[#d6c7b8] dark:border-[#3a3a3a] p-1">
<button
onClick={() => setActiveTab("interne")}
className={`px-4 py-2 rounded-lg text-sm font-medium w-1/2 transition
${activeTab === "interne"
? "bg-white dark:bg-[#2a2a2a] text-[#6b5a49] dark:text-[#f1e8dc]"
: "text-[#8f7e6b] dark:text-[#d6c5a9]"}`}
>
Transfert interne
</button>

<button
onClick={() => setActiveTab("externe")}
className={`px-4 py-2 rounded-lg text-sm font-medium w-1/2 transition
${activeTab === "externe"
? "bg-white dark:bg-[#2a2a2a] text-[#6b5a49] dark:text-[#f1e8dc]"
: "text-[#8f7e6b] dark:text-[#d6c5a9]"}`}
>
Transfert externe
</button>
</div>
</div>

{/* Formulaire interne */}
{activeTab === "interne" && (
<div>
<h2 className="text-xl font-semibold mb-4 dark:text-[#f1e8dc]">
Transfert entre vos comptes
<p className="text-xs text-[#b9a896] dark:text-[#d6c5a9]">Transfert rapide et instantané</p>
</h2>

<form className="space-y-4">
{/* Compte source */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte source</label>
<select className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
<option>Compte Courant - 850 000 FCFA</option>
<option>Compte Épargne - 2 430 000 FCFA</option>
</select>
</div>

{/* Compte destination */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte destination</label>
<select className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
<option>Sélectionnez un compte</option>
<option>Compte Courant - 850 000 FCFA</option>
</select>
</div>

{/* Montant */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Montant (FCFA)</label>
<input
type="number"
className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
placeholder="0"
min="0"
/>
</div>

{/* Description */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Description (optionnel)</label>
<input
type="text"
className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
placeholder="Ex: Épargne mensuelle"
/>
</div>

<button className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] dark:from-[#6b5a49] dark:to-[#3b352c] text-[#f7f3ee] p-3 rounded-xl font-semibold hover:opacity-95 transition">
Envoyer
</button>
</form>
</div>
)}

{/* Formulaire externe */}
{activeTab === "externe" && (
<div>
<h2 className="text-xl font-semibold mb-4 dark:text-[#f1e8dc]">
Transfert externe
<p className="text-xs text-[#b9a896] dark:text-[#d6c5a9]">Transférez vers un compte externe</p>
</h2>

<form className="space-y-4">
{/* Source */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte source</label>
<select className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
<option>Compte Courant - 850 000 FCFA</option>
<option>Compte Épargne - 2 430 000 FCFA</option>
</select>
</div>

{/* Destinataire */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte destination</label>
<input
type="text"
className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
placeholder="SN 76 XXXXXXXXXXXXXXXXXXXXXXXXX"
/>
</div>

{/* IBAN */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">IBAN</label>
<select className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
<option>Sélectionnez un compte</option>
<option>Compte Courant - 850 000 FCFA</option>
</select>
</div>

{/* Montant */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Montant (FCFA)</label>
<input
type="number"
className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
placeholder="0"
min="0"
/>
</div>

{/* Description */}
<div>
<label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Description (optionnel)</label>
<input
type="text"
className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition"
placeholder="Ex: Paiement facture SENELEC"
/>
</div>

<button className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] dark:from-[#6b5a49] dark:to-[#3b352c] text-[#f7f3ee] p-3 rounded-xl font-semibold hover:opacity-95 transition">
Envoyer
</button>
</form>
</div>
)}
</div>

{/* Sidebar */}
<div className="space-y-6">
{/* Contacts récents */}
<div className="bg-white dark:bg-[#2a2a2a] p-5 rounded-xl shadow border border-[#e7ded5] dark:border-[#3a3a3a]">
<h3 className="text-lg font-semibold mb-3 dark:text-[#f1e8dc]">Contacts récents</h3>

<ul className="space-y-3">
{contacts.map((c, i) => (
<li key={i} className="flex items-center gap-3">
{/* Fontawesome icon class stays but color adapted */}
<i className={`${c.icon} text-[#8f7e6b] dark:text-[#d6c5a9] text-xl`} />
<div>
<p className="font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">{c.name}</p>
<p className="text-sm text-[#8f7e6b] dark:text-[#d6c5a9]">{c.email}</p>
</div>
</li>
))}
</ul>
</div>

{/* Infos */}
<div className="bg-white dark:bg-[#2a2a2a] p-5 rounded-xl shadow border border-[#e7ded5] dark:border-[#3a3a3a]">
<h3 className="text-lg font-semibold mb-3 dark:text-[#f1e8dc]">Informations</h3>

<ul className="space-y-4">
{infos.map((info, i) => (
<li key={i} className="flex items-start gap-3">
<i className={`${info.icon} text-[#8f7e6b] dark:text-[#d6c5a9] text-xl`} />
<div>
<p className="font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">{info.title}</p>
<p className="text-sm text-[#8f7e6b] dark:text-[#d6c5a9]">{info.subtitle}</p>
</div>
</li>
))}
</ul>
</div>
</div>
</div>
</div>
);
}



