

// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { FiEye, FiEyeOff, FiSend, FiDownload, FiCreditCard, FiSave, FiChevronLeft, FiChevronRight } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, ArcElement, Legend);

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  const cards = [
    { face: "recto", numero: "•••• •••• •••• 4829", type: "Mastercard", color: "from-gray-800 to-gray-700" },
    { face: "verso", numero: "CVV •••", type: "Mastercard", color: "from-gray-700 to-gray-500" },
  ];
  const nextCard = () => setCardIndex((i) => (i + 1) % cards.length);
  const prevCard = () => setCardIndex((i) => (i - 1 + cards.length) % cards.length);

  // --- Line chart ---
  const lineData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Revenus",
        data: [4200, 4800, 4500, 5200, 6000, 7800],
        fill: true,
        backgroundColor: "rgba(59,130,246,0.12)",
        borderColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Dépenses",
        data: [3700, 4100, 3900, 4200, 4500, 5200],
        fill: true,
        backgroundColor: "rgba(147,51,234,0.06)",
        borderColor: "#8b5cf6",
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    scales: { x: { grid: { display: false }, ticks: { color: "#6b7280" } }, y: { grid: { color: "rgba(15,23,42,0.03)" }, ticks: { color: "#6b7280" } } },
    animation: { duration: 1500, easing: "easeOutQuart" },
  };

  // --- Donut chart ---
  const donutData = {
    labels: ["Alimentation", "Transport", "Loisirs", "Factures", "Autres"],
    datasets: [{ data: [850, 420, 320, 1200, 310], backgroundColor: ["#3b82f6", "#6366f1", "#fb7185", "#fb923c", "#34d399"], hoverOffset: 10 }],
  };
  const donutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    animation: { animateRotate: true, animateScale: true, easing: "easeOutQuart" },
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>{children}</div>


  );

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold">Bienvenue, Mouhamed</h1>
        <p className="text-sm text-gray-500">Voici un aperçu de votre situation financière</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {/* Solde total */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl p-6 text-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm opacity-90">Solde Total</div>
                <div className="text-sm font-semibold mt-2">{showBalance ? "24 580.45 €" : "•••• ••••"}</div>
                <div className="text-sm mt-2 opacity-80">+12.5% ce mois</div>
              </div>
              <button
                onClick={() => setShowBalance((s) => !s)}
                aria-label={showBalance ? "Cacher solde" : "Afficher solde"}
                className="ml-4 rounded-md bg-white/20 p-2 text-white hover:bg-white/30"
              >
                {showBalance ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Revenus */}
        <Card>
          <div className="text-sm text-gray-500">Revenus ce mois</div>
          <div className="text-sm font-semibold mt-2">7 200.00 €</div>
          <div className="text-sm text-green-500 mt-2">+8.2% vs mois dernier</div>
        </Card>

        {/* Dépenses */}
        <Card>
          <div className="text-sm text-gray-500">Dépenses ce mois</div>
          <div className="text-sm font-semibold mt-2">4 500.00 €</div>
          <div className="text-sm text-red-400 mt-2">-3.5% vs mois dernier</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line chart */}
        <div className="lg:col-span-2">
          <Card className="h-90">
            <Line data={lineData} options={lineOptions} />
          </Card>
        </div>

        {/* Donut chart */}
        <Card className="h-90 flex flex-col items-center justify-center">
          <div className="w-48 h-48 mb-1">
            <Doughnut data={donutData} options={donutOptions} />
          </div>
          <ul className="text-sm text-gray-600 space-y-2 w-full max-w-xs">
            <li className="flex justify-between"><span>Alimentation</span><span>850 €</span></li>
            <li className="flex justify-between"><span>Transport</span><span>420 €</span></li>
            <li className="flex justify-between"><span>Loisirs</span><span>320 €</span></li>
            <li className="flex justify-between"><span>Factures</span><span>1200 €</span></li>
            <li className="flex justify-between"><span>Autres</span><span>310 €</span></li>
          </ul>
        </Card>
      </div>

      {/* Carte avec pagination */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="relative">
          <Card className="h-full flex flex-col items-center justify-center relative">
            <div className={`w-64 h-36 bg-gradient-to-r p-4 text-white rounded-xl flex flex-col justify-center transition-all duration-500 ease-in-out ${cards[cardIndex].color}`}>
              <div className="text-xs opacity-80">{cards[cardIndex].type}</div>
              <div className="text-lg mt-3">{cards[cardIndex].numero}</div>
            </div>
            <button onClick={prevCard} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-blue-600">
              <FiChevronLeft size={24} />
            </button>
            <button onClick={nextCard} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-blue-600">
              <FiChevronRight size={24} />
            </button>
          </Card>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Transactions récentes</h3>
              <a className="text-sm text-blue-600" href="#!">Voir tout</a>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><FiCreditCard /></div>
                  <div>
                    <div className="font-medium">Supermarché Carrefour</div>
                    <div className="text-xs text-gray-400">Aujourd'hui, 14:30</div>
                  </div>
                </div>
                <div className="text-red-500">-85.50 €</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><FiCreditCard /></div>
                  <div>
                    <div className="font-medium">Essence Total</div>
                    <div className="text-xs text-gray-400">14 Nov, 2025</div>
                  </div>
                </div>
                <div className="text-red-500">-65.00 €</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><FiCreditCard /></div>
                  <div>
                    <div className="font-medium">Virement de Marie</div>
                    <div className="text-xs text-gray-400">13 Nov, 2025</div>
                  </div>
                </div>
                <div className="text-green-500">+150.00 €</div>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="lg:col-span-3 mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-indigo-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-2"><FiSend /></div>
          <div className="text-sm text-gray-700">Envoyer</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-2"><FiDownload /></div>
          <div className="text-sm text-gray-700">Recevoir</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-red-400 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-2"><FiCreditCard /></div>
          <div className="text-sm text-gray-700">Payer</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-2"><FiSave /></div>
          <div className="text-sm text-gray-700">Épargner</div>
        </div>
      </div>
    </div>
  );
}

