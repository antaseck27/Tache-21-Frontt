
import React from "react";

export default function Dashboard() {
  // mock transactions
  const tx = [
    { id: 1, title: "Airbnb", meta: "Travel", amount: "-53,937.48 ¥" },
    { id: 2, title: "Sara & Tyler", meta: "Transfer", amount: "-30,000 ¥" },
    { id: 3, title: "Netflix", meta: "Streaming", amount: "-2,100 ¥" },
    { id: 4, title: "Spotify", meta: "Music", amount: "-1,500.99 ¥" },
  ];

  return (
    <div className="min-h-screen bg-gray-10 pt-10 px-4 md:px-6 pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Bienvenue, Idrissa
          </h1>
          <p className="text-gray-500 mt-1">
            Voici un aperçu de votre situation financière
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-xl p-6 text-white bg-gradient-to-r from-blue-600 to-violet-600">
            <div className="flex items-start justify-between">
              <div className="text-sm">Solde Total</div>
              <div className="bg-white/20 px-2 py-1 rounded">Main</div>
            </div>
            <div className="mt-6 text-3xl font-bold">24,580.45 €</div>
            <div className="mt-3 text-sm text-white/80">+12.5% ce mois</div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl p-6 bg-white border border-gray-100">
            <div className="text-sm text-gray-500">Revenus ce mois</div>
            <div className="mt-4 text-2xl font-semibold text-green-600">
              7,200.00 €
            </div>
            <div className="mt-3 text-sm text-green-500">+8.2% vs mois dernier</div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl p-6 bg-white border border-gray-100">
            <div className="text-sm text-gray-500">Dépenses ce mois</div>
            <div className="mt-4 text-2xl font-semibold text-red-600">4,500.00 €</div>
            <div className="mt-3 text-sm text-red-500">-3.5% vs mois dernier</div>
          </div>
        </div>

        {/* Charts + catégories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* CHART */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Revenus & Dépenses</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full" /> Revenus
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full" /> Dépenses
                </span>
              </div>
            </div>
            <div className="mt-6 h-56 rounded-lg bg-gradient-to-r from-white to-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300">
              Graphique (à remplacer par Chart.js ou ApexCharts)
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold">Catégories de dépenses</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Food</div>
                  <div className="text-sm text-gray-400">-1,630.20 €</div>
                </div>
                <div className="w-24 h-3 bg-green-100 rounded-full" />
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Shopping</div>
                  <div className="text-sm text-gray-400">-930.70 €</div>
                </div>
                <div className="w-20 h-3 bg-purple-100 rounded-full" />
              </li>
            </ul>
          </div>
        </div>

        {/* TRANSACTIONS LIST */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Historique des transactions</h3>
            <div className="text-sm text-gray-500">07 Apr, 2021</div>
          </div>

          <div className="mt-4 space-y-2">
            {tx.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    A
                  </div>
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-sm text-gray-400">{t.meta}</div>
                  </div>
                </div>
                <div className="text-gray-700 font-medium">{t.amount}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
