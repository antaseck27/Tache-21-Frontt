// src/pages/Transactions.jsx
import React, { useEffect, useState, useMemo } from "react";
import api from "../services/apitransat";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH ALL ===================== */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [txRes, catRes] = await Promise.all([
          api.get("/api/transactions"),
          api.get("/api/categories"),
        ]);

        const formatted = txRes.data.transactions.map((t) => ({
          id: t._id,
          title: t.label || "Transaction",
          type: t.direction === "income" ? "Revenu" : "Dépense",
          category: t.category || "Autre",
          amount: t.direction === "income" ? t.amount : -t.amount,
          date: new Date(t.createdAt).toLocaleString("fr-FR"),
          status: "Réussie",
        }));

        setTransactions(formatted);
        setCategories(catRes.data);
      } catch (e) {
        console.error("Erreur chargement transactions", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  /* ===================== FILTRAGE OPTIMISÉ ===================== */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch = t.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchType = typeFilter === "Tous" || t.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [transactions, search, typeFilter]);

  /* ===================== TOTAUX ===================== */
  const totalRevenus = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.amount > 0)
        .reduce((a, b) => a + b.amount, 0),
    [filteredTransactions]
  );

  const totalDepenses = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.amount < 0)
        .reduce((a, b) => a + b.amount, 0),
    [filteredTransactions]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-[#f7f3ee] dark:bg-[#1a1a1a]">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      {/* Filtres */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher"
          className="border p-2 rounded w-full"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Tous">Tous</option>
          <option value="Revenu">Revenus</option>
          <option value="Dépense">Dépenses</option>
        </select>
      </div>

      {/* Résumé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SummaryCard title="Transactions" value={filteredTransactions.length} />
        <SummaryCard
          title="Revenus"
          value={`+${totalRevenus.toFixed(2)} FCFA`}
          color="text-green-600"
        />
        <SummaryCard
          title="Dépenses"
          value={`${totalDepenses.toFixed(2)} FCFA`}
          color="text-red-600"
        />
      </div>

      {/* Liste */}
      {filteredTransactions.slice(0, visibleCount).map((t) => (
        <div key={t.id} className="p-3 bg-white rounded shadow mb-2">
          <p className="font-bold">{t.title}</p>
          <p className="text-sm">{t.date}</p>
          <p
            className={`font-bold ${
              t.amount > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {t.amount.toFixed(2)} FCFA
          </p>
        </div>
      ))}

      {filteredTransactions.length > 3 && (
        <button
          onClick={() => {
            setVisibleCount(expanded ? 3 : filteredTransactions.length);
            setExpanded(!expanded);
          }}
          className="mt-4 px-4 py-2 bg-[#6b5a49] text-white rounded"
        >
          {expanded ? "Masquer" : "Voir plus"}
        </button>
      )}
    </div>
  );
}

/* ===================== SUMMARY CARD ===================== */
const SummaryCard = ({ title, value, color = "" }) => (
  <div className="p-4 bg-white rounded shadow">
    <p className="text-sm">{title}</p>
    <p className={`font-bold ${color}`}>{value}</p>
  </div>
);
