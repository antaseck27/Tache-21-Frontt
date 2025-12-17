import React, { useEffect, useState } from "react";
import api from "../services/apitransat";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH TRANSACTIONS ===================== */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions");

        const formatted = res.data.transactions.map((t) => ({
          id: t._id,
          title: t.label || t.merchant || "Transaction",
          category: t.category || "Autre",
          type: t.type === "income" ? "Revenu" : "Dépense",
          amount: t.type === "income" ? t.amount : -t.amount,
          date: new Date(t.date).toLocaleString("fr-FR"),
          status: "Reussie",
        }));

        setTransactions(formatted);
      } catch (error) {
        console.error("Erreur chargement transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  /* ===================== FETCH CATEGORIES ===================== */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Erreur chargement catégories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ===================== ICONES PAR CATEGORIE ===================== */
  const getIconByCategory = (categoryName) => {
    if (!categories.length || !categoryName) {
      return <i className="fa-solid fa-receipt"></i>;
    }
    const cat = categories.find(
      (c) =>
        c.name.toLowerCase().trim() ===
        categoryName.toLowerCase().trim()
    );
    return cat ? <i className={cat.icon}></i> : <i className="fa-solid fa-receipt"></i>;
  };

  /* ===================== FILTRES ===================== */
  const filteredTransactions = transactions.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "Tous" || t.type === typeFilter;
    const matchCategory =
      categoryFilter === "Tous" ||
      (t.category &&
        t.category.toLowerCase().trim() ===
          categoryFilter.toLowerCase().trim());
    return matchSearch && matchType && matchCategory;
  });

  /* ===================== TOTAUX ===================== */
  const totalRevenus = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDepenses = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Transactions</h2>
        <p className="mb-4 md:mb-6 text-sm text-[#8f7e6b]">
          Voici la liste de vos transactions récentes.
        </p>

        {/* Résumé */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <SummaryCard title="Total Transactions" value={filteredTransactions.length} />
          <SummaryCard
            title="Total Revenus"
            value={`+${totalRevenus.toFixed(2)} FCFA`}
            color="text-green-600"
          />
          <SummaryCard
            title="Total Dépenses"
            value={`${totalDepenses.toFixed(2)} FCFA`}
            color="text-red-600"
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher une transaction"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-lg p-2 flex-1 min-w-[150px] md:min-w-[200px]"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-lg p-2 min-w-[120px]"
          >
            <option value="Tous">Tous les types</option>
            <option value="Revenu">Revenus</option>
            <option value="Dépense">Dépenses</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-lg p-2 min-w-[150px]"
          >
            <option value="Tous">Toutes catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Liste des transactions */}
        <div className="space-y-3">
          {filteredTransactions.slice(0, visibleCount).map((t) => (
            <div
              key={t.id}
              className="rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-md bg-white dark:bg-[#2a2a2a] border border-[#e7ded5] dark:border-[#3a3a3a]"
            >
              <span className="text-2xl p-2 rounded-full bg-[#e8dcc7] dark:bg-[#6b5a49] mb-2 sm:mb-0">
                {getIconByCategory(t.category)}
              </span>

              <div className="flex-1 sm:mx-4">
                <p className="font-bold flex flex-wrap items-center gap-2">
                  {t.title}
                  <span className="ml-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {t.status}
                  </span>
                </p>
                <p className="text-sm text-[#8f7e6b] mt-1">
                  {t.date} - {t.category}
                </p>
              </div>

              <div
                className={`font-bold text-lg mt-2 sm:mt-0 ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.amount > 0 ? "+" : ""}
                {t.amount.toFixed(2)} FCFA
              </div>
            </div>
          ))}
        </div>

        {/* Voir / Masquer */}
        {filteredTransactions.length > 3 && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setVisibleCount(isExpanded ? 3 : filteredTransactions.length);
                setIsExpanded(!isExpanded);
              }}
              className="px-4 py-2 bg-[#b9a896] dark:bg-[#6b5a49] text-white rounded"
            >
              {isExpanded ? "Masquer" : "Voir +"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== COMPOSANT SUMMARY CARD ===================== */
const SummaryCard = ({ title, value, color = "" }) => (
  <div className="rounded-xl p-5 shadow-md bg-white dark:bg-[#2a2a2a] border border-[#e7ded5] dark:border-[#3a3a3a] flex flex-col items-start">
    <p className="font-semibold text-sm">{title}</p>
    <span className={`font-bold text-lg ${color} mt-1`}>{value}</span>
    <span className="text-xs text-[#b9a896] mt-1">Ce mois</span>
  </div>
);
