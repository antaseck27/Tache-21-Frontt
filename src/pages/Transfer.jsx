// src/pages/Transfer.jsx
import React, { useState } from "react";

export default function Transfer() {
  const [activeTab, setActiveTab] = useState("interne");

  const contacts = [
    { name: "Marie Dubois", email: "marie.d@email.com", icon: "fa-solid fa-user", color: "text-gray-700" },
    { name: "Pierre Martin", email: "p.martin@email.com", icon: "fa-solid fa-user", color: "text-gray-700" },
    { name: "Sophie Bernard", email: "sophie.b@email.com", icon: "fa-solid fa-user", color: "text-gray-700" },
    { name: "Luc Mercier", email: "luc.m@email.com", icon: "fa-solid fa-user", color: "text-gray-700" },
  ];

  const infos = [
    { icon: "fa-solid fa-user", color: "text-gray-700", title: "Les transferts internes sont instantanés.", subtitle: "Entre vos comptes BankApp" },
    { icon: "fa-solid fa-wallet", color: "text-gray-700", title: "Gérez facilement vos portefeuilles.", subtitle: "Toutes vos cartes BankApp" },
    { icon: "fa-solid fa-credit-card", color: "text-gray-700", title: "Vos paiements sécurisés.", subtitle: "Cartes BankApp protégées" },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Transfert d'argent</h1>
        <p className="text-gray-700 text-lg">
          Envoyez de l'argent à vos proches ou payez vos factures
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulaire */}
        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <div className="border border-gray-300 rounded-xl w-full flex">
              <button onClick={() => setActiveTab("interne")} className={`px-4 py-2 rounded-lg text-sm font-medium w-1/2 ${activeTab === "interne" ? "bg-white" : "bg-gray-200" }`}>Transfert interne</button>
              <button onClick={() => setActiveTab("externe")} className={`px-4 py-2 rounded-lg text-sm font-medium w-1/2 ${activeTab === "externe" ? "bg-white" : "bg-gray-200"}`}>Transfert externe </button>
            </div>
          </div>

          {/* Formulaire Interne */}
          {activeTab === "interne" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Transfert entre vos comptes
                <p className="text-xs text-gray-400">Transfert entre vos comptes</p>
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Compte source</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition">
                    <option>Compte Courant - 24 580,45 €</option>
                    <option>Compte Épargne - 12 000,00 €</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Compte destination</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition">
                    <option>Sélectionnez un compte</option>
                    <option>Compte Courant - 24 580,45 €</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Montant (€)</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition" placeholder="0.00"min="0"/>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Description (optionnel)
                  </label>
                  <input type="text"className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition" placeholder="Ex: Épargne mensuelle"/>
                </div>

                <button className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-[#f4efe6] p-3 rounded-xl font-semibold hover:opacity-90 transition">
                  Envoyer
                </button>
              </form>
            </div>
          )}

          {/* Formulaire Externe */}
          {activeTab === "externe" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Transfert externe
                <p className="text-xs text-gray-400">
                  Transférez de l'argent entre vos différentes comptes
                </p>
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Compte source</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition">
                    <option>Compte Courant - 24 580,45 €</option>
                    <option>Compte Épargne - 12 000,00 €</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Compte destination</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition" placeholder="SN 76 XXXXXXXXXXXXXXXXXXXXXXXX"/>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">IBAN</label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition">
                    <option>Sélectionnez un compte</option>
                    <option>Compte Courant - 24 580,45 €</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Montant (€)</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition" placeholder="0.00" min="0"/>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Description (optionnel)
                  </label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b9a896] focus:border-transparent transition" placeholder="Ex: Épargne mensuelle"/>
                </div>

                <button className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-[#f4efe6] p-3 rounded-xl font-semibold hover:opacity-90 transition">
                  Envoyer
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contacts */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Contacts récents</h3>
            <ul className="space-y-2">
              {contacts.map((contact, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <i className={`${contact.icon} ${contact.color} text-2xl`}></i>
                  <span>{contact.name} - {contact.email}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations utiles */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Informations utiles</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {infos.map((info, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <i className={`${info.icon} ${info.color} text-2xl`}></i>
                  <div className="text-left">
                    <p className="text-sm font-medium">{info.title}</p>
                    <p className="text-xs text-gray-500">{info.subtitle}</p>
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
