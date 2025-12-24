import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import CardUI from "../components/CardUI.jsx";
import { getMyCards } from "../services/cardService.js";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend
} from "chart.js";
import {
  FiEye,
  FiEyeOff,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiSend,
  FiDownload,
  FiSave
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement,
  Legend
);

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-[#2a2a2a] rounded-xl p-6 shadow-sm border border-beige-100 dark:border-beige-700 ${className}`}
  >
    {children}
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const [activeCard, setActiveCard] = useState("solde");
  const [showCardNumber, setShowCardNumber] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    revenueThisMonth: 0,
    expenseThisMonth: 0,
    expenseCategories: {},
    transactions: [],
    cards: [
      { numero: "•••• •••• •••• 4829", type: "Mastercard", color: ["#b9a896", "#8f7e6b"] },
      { numero: "CVV •••", type: "Mastercard", color: ["#8f7e6b", "#6b5a49"] }
    ],
    comptes: [
      { id: 1, nom: "Compte Principal", type: "Courant", solde: 0 },
      { id: 2, nom: "Épargne", type: "Épargne", solde: 0 },
      { id: 3, nom: "Business", type: "Professionnel", solde: 0 }
    ]
  });

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/dashboard/summary", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDashboardData(prev => ({
        ...prev,
        comptes: res.data.comptes || prev.comptes,
        transactions: res.data.transactions || prev.transactions,
        totalBalance: res.data.totalBalance ?? prev.totalBalance,
        revenueThisMonth: res.data.revenueThisMonth ?? prev.revenueThisMonth,
        expenseThisMonth: res.data.expenseThisMonth ?? prev.expenseThisMonth,
        expenseCategories: res.data.expenseCategories || prev.expenseCategories,
        cards: res.data.cards || prev.cards
      }));
    } catch (err) {
      console.error("Erreur fetch dashboard:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleTransfer = async (transferData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/transfer/internal", transferData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchDashboard();
    } catch (err) {
      console.error("Erreur lors du transfert:", err);
    }
  };

  const nextCard = () => setCardIndex(i => (i + 1) % (dashboardData.cards?.length || 1));
  const prevCard = () => setCardIndex(i => (i - 1 + (dashboardData.cards?.length || 1)) % (dashboardData.cards?.length || 1));

  // ================= GRAPHIQUES =================
  const lineData = {
    labels: ["Revenus", "Dépenses"],
    datasets: [
      {
        label: "Montant",
        data: [dashboardData.revenueThisMonth, dashboardData.expenseThisMonth],
        fill: true,
        backgroundColor: "#d4b8a5",
        borderColor: "#8f7e6b",
        tension: 0.3,
        pointRadius: 0
      }
    ]
  };

  const lineOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  const donutData = {
    labels: Object.keys(dashboardData.expenseCategories || {}),
    datasets: [
      {
        data: Object.values(dashboardData.expenseCategories || {}),
        backgroundColor: ["#d6c7b4", "#bfa98a", "#d4b8a5", "#dfcdb9", "#cbb99a"],
        hoverOffset: 10
      }
    ]
  };

  const donutOptions = { responsive: true, plugins: { legend: { display: false } } };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* HEADER */}
      <div className="p-6 bg-[#e8dcc7] rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-[#8f7e6b]">
          Bienvenue{user?.prenom ? `, ${user.prenom}` : ""}
        </h2>
        <p className="text-sm text-[#6b5a49] mt-1">
          Voici un aperçu de votre situation financière
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SOLDE */}
        <div
          onClick={() => setActiveCard("solde")}
          className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300 ${activeCard === "solde" ? "bg-[#6b5a49] text-white" : "bg-white text-[#6b5a49]"}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm">Solde Total</div>
              <div className="text-sm font-semibold mt-2">
                {showBalance ? `${dashboardData.totalBalance.toLocaleString()} FCFA` : "•••• ••••"}
              </div>
            </div>

            <button onClick={e => { e.stopPropagation(); setShowBalance(s => !s); }}>
              {showBalance ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>

        {/* REVENUS */}
        <div
          onClick={() => setActiveCard("revenu")}
          className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300 ${activeCard === "revenu" ? "bg-[#6b5a49] text-white" : "bg-white text-[#6b5a49]"}`}
        >
          <div className="text-sm font-semibold">Revenus ce mois</div>
          <div className="text-sm font-semibold mt-2 text-green-500">
            {dashboardData.revenueThisMonth.toLocaleString()} FCFA
          </div>
        </div>

        {/* DEPENSES */}
        <div
          onClick={() => setActiveCard("depense")}
          className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300 ${activeCard === "depense" ? "bg-[#6b5a49] text-white" : "bg-white text-[#6b5a49]"}`}
        >
          <div className="text-sm font-semibold">Dépenses ce mois</div>
          <div className="text-sm font-semibold mt-2 text-red-500">
            {dashboardData.expenseThisMonth.toLocaleString()} FCFA
          </div>
        </div>
      </div>

      {/* MES COMPTES */}
      <section className="mt-20 mb-20 flex justify-center">
        <div className="w-full max-w-8xl bg-gradient-to-tr from-[#f3e8d7] via-[#e8dcc7] to-[#f3e8d7] dark:from-[#2b2a28] dark:via-[#222] dark:to-[#2b2a28] rounded-3xl shadow-2xl p-10 relative">
          <h3 className="text-3xl font-bold text-center text-[#6b5a49] mb-12">Mes Comptes</h3>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#d8cbb4] via-[#cbbba3] to-transparent -translate-x-1/2 shadow-md"></div>
            <div className="space-y-16">
              {(dashboardData.comptes || []).map((compte, index) => (
                <div key={compte.id} className={`relative flex items-center w-full ${index % 2 === 0 ? "justify-start pl-[calc(50%+20px)]" : "justify-end pr-[calc(50%+20px)]"}`}>
                  <span className="absolute left-1/2 w-6 h-6 bg-gradient-to-tr from-[#cbb99a] via-[#d4b8a5] to-[#cbb99a] rounded-full shadow-lg -translate-x-1/2 flex items-center justify-center text-white font-bold animate-glow">
                    {index + 1}
                  </span>
                  <div
                    style={{ animationDelay: `${index * 150}ms` }}
                    className="w-full max-w-[400px] p-6 rounded-2xl bg-gradient-to-tr from-[#f3e8d7] via-[#e8dcc7] to-[#f3e8d7] dark:from-[#3a3a3a]/80 dark:via-[#2b2b2b]/80 dark:to-[#3a3a3a]/80 shadow-lg animate-fadeUp transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#6b5a49]/70">{compte.type}</p>
                        <h4 className="text-xl font-bold text-[#6b5a49] mt-1">{compte.nom}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#cbb99a]/30 flex items-center justify-center text-[#6b5a49] shadow-inner">
                        {index % 2 === 0 ? <i className="fas fa-wallet text-lg"></i> : <i className="fas fa-university text-lg"></i>}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-extrabold text-[#6b5a49]">{compte.solde.toLocaleString()} FCFA</p>
                      <p className="text-xs text-[#6b5a49]/60">Solde disponible</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-12 text-center text-[#8f7e6b] italic font-medium text-lg">
            "Gérez vos comptes, simplifiez votre vie financière"
          </p>
        </div>
      </section>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-2xl">
        <div className="lg:col-span-3">
          <Card>
            <div style={{ height: 300 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </Card>
        </div>
      </div>

      {/* CARTE BANCAIRE + TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-2xl">
        <Card className="flex items-center justify-center relative">
          <div
            className="w-64 h-36 rounded-xl p-4 text-white relative"
            style={{
              background: dashboardData.cards?.[cardIndex]
                ? `linear-gradient(135deg, ${dashboardData.cards[cardIndex].color[0]}, ${dashboardData.cards[cardIndex].color[1]})`
                : "#ccc"
            }}
          >
            <div className="text-xs">{dashboardData.cards?.[cardIndex]?.type || ""}</div>
            <div className="text-lg mt-4">{showCardNumber ? dashboardData.cards?.[cardIndex]?.numero || "" : "•••• •••• •••• ••••"}</div>
            <button onClick={() => setShowCardNumber(s => !s)} className="absolute top-2 right-2 text-white p-1 rounded hover:bg-black/20">
              {showCardNumber ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button onClick={prevCard} className="absolute left-2"><FiChevronLeft /></button>
          <button onClick={nextCard} className="absolute right-2"><FiChevronRight /></button>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg mb-4">Transactions récentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {(dashboardData.transactions || []).map((t, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="py-3 flex items-center gap-2">
                        <FiCreditCard />
                        {t.label || t.merchant || "Transaction"}
                      </td>
                      <td className="py-3 text-xs">{t.date ? new Date(t.date).toLocaleDateString() : ""}</td>
                      <td className={`py-3 text-right font-semibold ${t.direction === "income" ? "text-green-500" : "text-red-500"}`}>
                        {(t.direction === "expense" ? "-" : "+") + (t.amount?.toLocaleString() || "0")} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* ANIMATIONS CSS */}
      <style jsx>{`
        @keyframes glow { 0%,100%{box-shadow:0 0 5px #f3e8d7,0 0 10px #cbb99a,0 0 15px #d4b8a5;transform:scale(1);} 50%{box-shadow:0 0 10px #f3e8d7,0 0 20px #cbb99a,0 0 30px #d4b8a5;transform:scale(1.2);} }
        .animate-glow { animation: glow 2s infinite ease-in-out; }
        @keyframes fadeUp {0%{opacity:0;transform:translateY(20px);} 100%{opacity:1;transform:translateY(0);} }
        .animate-fadeUp { animation: fadeUp 0.5s forwards; }
      `}</style>
    </div>
  );
}
