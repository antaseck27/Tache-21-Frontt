// src/pages/Transactions.jsx
import React, { useState } from "react";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [categoryFilter, setCategoryFilter] = useState("Tous");

  // Ajoute cet état en haut de ton composant
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const transactions = [
    { id: 1, title: "Supermarché Carrefour", category: "Alimentation", type: "Dépense", amount: -85.5, date: "2025-11-17 14:30", icon: <i class="fa-solid fa-cart-shopping"></i>, status: "Complété" },
    { id: 2, title: "Salaire - Entreprise XYZ", category: "Revenus", type: "Revenu", amount: 32000, date: "2025-11-16 09:00", icon: <i class="fa-brands fa-shopify"></i>, status: "Complété" },
    { id: 3, title: "Netflix Abonnement", category: "Loisirs", type: "Loisir", amount: -13.99, date: "2025-11-15 8:00", icon: <i class="fa-solid fa-film"></i>, status: "Complété" },
    { id: 4, title: "Essence Total", category: "Transport", type: "Transport", amount: -65.0, date: "2025-11-14 09:00", icon: <i class="fa-solid fa-clipboard"></i>, status: "Complété" },
    { id: 5, title: "Virement de marie", category: "Transport", type: "Transport", amount: 15000, date: "2025-11-16 09:00", icon: <i class="fa-solid fa-user"></i>, status: "Complété" },
    { id: 6, title: "Restaurant Le Gourment", category: "Alimentation", type: "Alimentation", amount: -78.5, date: "2025-11-12 20:00", icon: <i class="fa-solid fa-plate-wheat"></i>, status: "Complété" },
    { id: 7, title: "Sportify Premium", category: "Loisirs", type: "Loisir", amount: -9.99, date: "2025-11-11 06:00", icon: <i class="fa-solid fa-music"></i>, status: "Complété" },
    { id: 8, title: "Loyer Appartement", category: "Factures", type: "Facture", amount: -85.0, date: "2025-11-09 15:00", icon: <i class="fa-solid fa-house"></i>, status: "Complété" },
    { id: 9, title: "Freelance - Client ABC", category: "Revenus", type: "Revenu", amount: 450.0, date: "2025-11-16 09:00", icon: <i class="fa-solid fa-computer"></i>, status: "En attente" },
    { id: 10, title: "Pharmacie", category: "Santé", type: "Santé", amount: -32.5, date: "2025-11-06 11:00", icon: <i class="fa-solid fa-prescription-bottle-medical"></i>, status: "Complété" },
    { id: 11, title: "Amazon Shopping", category: "Shopping", type: "Shopping", amount: 32000, date: "2025-11-07 16:00", icon: <i class="fa-solid fa-gift"></i>, status: "Complété" },
    { id: 12, title: "Remboursement Assurance", category: "Revenus", type: "Revenu", amount: 32000, date: "2025-11-06 09:00", icon: <i class="fa-solid fa-shield-halved"></i>, status: "Complété" },
  ];

  // Flitres input
    const filteredTransactions = transactions.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "Tous" || t.type === typeFilter;
    const matchCategory = categoryFilter === "Tous" || t.category === categoryFilter;
    return matchSearch && matchType && matchCategory;
  });

  // calculs rvenus  depense
  const totalRevenus = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDepenses = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-bold" style={{color:"#6b5a49" }}>

{/* .....................HEADER : mon titre.............................*/}

      <h2 className="text-3xl font-bold">Transactions</h2>
      <p className="mb-6 text-sm text-gray-500">Voici la liste de vos transactions récentes.</p>


{/* .....................SECTION 1 : mon 1er section ......................................*/}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 section1">

        <div className="rounded-xl p-5 cart" style={{boxShadow:"2px 0 12px rgb(172, 171, 171)", background: "var(--gradient-beige-gold)", color:"black"}}>
          <p className="font-semibold"> Total Transactions <br />
            <span className=" font-bold text-blue-600">{filteredTransactions.length}</span>   <br />           
            <span className="text-gray-500 text-sm">Ce mois</span>
          </p>
        </div>

        <div className="rounded-xl p-5 cart" style={{boxShadow:"2px 0 12px rgb(172, 171, 171)", background: "var(--gradient-beige-gold)", color:"black"}}>
          <p className="font-semibold">Total Revenus <br />
            <span className=" font-bold text-green-600">+{totalRevenus.toFixed(2)} €</span> <br />
            <span className="text-gray-500 text-sm">Ce mois</span>
          </p>
        </div>

        <div className="rounded-xl p-5 cart" style={{boxShadow:"2px 0 12px rgb(172, 171, 171)", background: "var(--gradient-beige-gold)", color:"black"}}>
          <p className="font-semibold"> Total Dépenses <br />
            <span className=" font-bold text-red-600">{totalDepenses.toFixed(2)} €</span>  <br />
            <span className="text-gray-500 text-sm">Ce mois</span>
          </p>
        </div>

      </div>


{/* .....................SECTION 2 : mon 2er section - barre de recherche Filtres ......................*/}

      <div className="flex flex-wrap gap-4 mb-6">
        <input type="text" placeholder="Rechercher une transaction" className="border border-gray-300 rounded-lg p-2 flex-1"
          onChange={(e) => setSearch(e.target.value)}/>
        
        <select className="border border-gray-300 rounded-lg p-2" onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="Tous">Tous les types</option>
          <option value="Revenu">Revenus</option>
          <option value="Dépense">Dépenses</option>
        </select>

        <select className="border border-gray-300 rounded-lg p-2" onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="Tous">Toutes catégories</option>
          <option>Alimentation</option>
          <option>Transport</option>
          <option>Loisirs</option>
          <option>Facture</option>
          <option>Revenus</option>
          <option>Santé</option>
          <option>Shopping</option>
        </select>
      </div>


{/* .................... SECTION 3 : Liste des transactions ......................... */}

      <h5 className="text-lg font-semibold mb-4"> Liste des transactions ({filteredTransactions.length})</h5>
    
      <div className="section3 space-y-4">

{/* .....On n'affiche que les trois 1er transactions..... */}
      {filteredTransactions.slice(0, visibleCount).map((t) => (
          <div key={t.id} className="liste rounded-xl p-4 flex items-center justify-between" style={{ boxShadow: "2px 0 12px rgb(172, 171, 171)" }}>
              
    {/* .........Les icones............ */}
            <div className="flex-shrink-0">
              <span className="text-2xl p-2 rounded-full font-bold" style={{ background: "#e8dcc7" }}>{t.icon} </span>
            </div>

    {/*.......... détails ...............*/}
            <div className="flex-1 mx-4">
                <p className="font-bold flex flex-wrap items-center">{t.title}   
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold 
                        ${t.status === "Complété" ? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}`}>
                          {t.status}</span>
                </p>

                <p className="text-gray-400 text-sm mt-1"> {t.date} <span className="mx-2">-</span> {t.category} </p>
            </div>

    {/* .......... montant ..............*/}
            <div className={`flex-shrink-0 text-right font-bold  ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}>
              {t.amount > 0 ? "+" : ""}
              {t.amount.toFixed(2)} €
            </div>
          </div>
        ))}
      </div>

    {/* .......... Bouton Voir........... + */}
        {/* {visibleCount < filteredTransactions.length && ( */}
        <div className="text-center mt-4 p-2" style={{ boxShadow: "2px 0 12px rgb(172, 171, 171)" }}>
          {!isExpanded ? (
          // BOUTON VOIR PLUS
          <button onClick={() => {
                  setVisibleCount(filteredTransactions.length); // afficher tout
                  setIsExpanded(true);
                }}className="px-4 py-2 font-semibold">Voir + </button>

                ) : (

          // BOUTON MASQUER
          <button onClick={() => {
                  setVisibleCount(3); // revenir à 6
                  setIsExpanded(false);
                }}className="px-4 py-2 font-semibold">Masquer</button>
        )}
      </div>
    </div>
  );
 }


