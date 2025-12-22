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
  <div className={`bg-white dark:bg-[#2a2a2a] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [loadingCards, setLoadingCards] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    revenueThisMonth: 0,
    expenseThisMonth: 0,
    expenseCategories: {},
    transactions: []
  });

  // ================= FETCH CARTES =================
  const fetchCards = async () => {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      setLoadingCards(false);
      return;
    }
    try {
      setLoadingCards(true);
      const data = await getMyCards(token);
      setCards(data);
    } catch (err) {
      console.error("Erreur chargement cartes", err);
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    if (user) fetchCards();
  }, [user]);

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/dashboard/summary", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(res.data);
    } catch (err) {
      console.error("Erreur fetch dashboard:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user]);

  // ================= GESTION CARTE =================
  const nextCard = () => setCardIndex(i => (i + 1) % cards.length);
  const prevCard = () => setCardIndex(i => (i - 1 + cards.length) % cards.length);

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
    labels: Object.keys(dashboardData.expenseCategories),
    datasets: [
      {
        data: Object.values(dashboardData.expenseCategories),
        backgroundColor: ["#d6c7b4", "#bfa98a", "#d4b8a5", "#dfcdb9", "#cbb99a"],
        hoverOffset: 10
      }
    ]
  };

  const donutOptions = { responsive: true, plugins: { legend: { display: false } } };

  return (
    <div className="space-y-6 p-4 sm:p-6">

      {/* HEADER */}
      <div className="p-6 bg-gradient-to-r from-[#f3e8d7] to-[#e8dcc7] rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-[#8f7e6b]">
          Bienvenue{user?.prenom ? `, ${user.prenom}` : ""}
        </h2>
        <p className="text-sm text-[#6b5a49] mt-1">Voici un aperçu de votre situation financière</p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => setShowBalance(s => !s)} className="rounded-xl p-6 shadow-md cursor-pointer bg-gradient-to-br from-[#b9a896] to-[#8f7e6b]">
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Solde Total</div>
              <div className="text-sm font-semibold mt-2">{showBalance ? `${dashboardData.totalBalance.toLocaleString()} FCFA` : "•••• ••••"}</div>
            </div>
            <button onClick={e => e.stopPropagation()}>{showBalance ? <FiEye /> : <FiEyeOff />}</button>
          </div>
        </div>

        <div className="rounded-xl p-6 shadow-md bg-white">
          <div className="text-sm font-semibold">Revenus ce mois</div>
          <div className="text-sm font-semibold mt-2 text-green-500">{dashboardData.revenueThisMonth.toLocaleString()} FCFA</div>
        </div>

        <div className="rounded-xl p-6 shadow-md bg-white">
          <div className="text-sm font-semibold">Dépenses ce mois</div>
          <div className="text-sm font-semibold mt-2 text-red-500">{dashboardData.expenseThisMonth.toLocaleString()} FCFA</div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div style={{ height: 300 }}><Line data={lineData} options={lineOptions} /></div>
          </Card>
        </div>

        <Card className="flex flex-col items-center">
          <div className="w-48 h-48"><Doughnut data={donutData} options={donutOptions} /></div>
          <ul className="text-sm mt-4 w-full max-w-xs space-y-2">
            {Object.entries(dashboardData.expenseCategories).map(([cat, value], i) => (
              <li key={i} className="flex justify-between">
                <span>{cat}</span>
                <span>{value.toLocaleString()} FCFA</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* CARTE BANCAIRE + TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex justify-center">
          {loadingCards ? <p>Chargement carte...</p> : cards.length === 0 ? <p>Aucune carte</p> : <CardUI card={cards[cardIndex]} nextCard={nextCard} prevCard={prevCard} />}
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg mb-4">Transactions récentes</h3>
            <ul className="space-y-4">
              {dashboardData.transactions.map((t, i) => (
                <li key={i} className="flex justify-between">
                  <div className="flex gap-3">
                    <FiCreditCard />
                    <div>
                      <div>{t.label || t.merchant || "Transaction"}</div>
                      <div className="text-xs">{new Date(t.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className={t.direction === "income" ? "text-green-500" : "text-red-500"}>
                    {t.direction === "expense" ? "-" : "+"}{t.amount.toLocaleString()} FCFA
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[FiSend, FiDownload, FiCreditCard, FiSave].map((Icon, i) => (
          <div key={i} className="bg-white rounded-xl p-4 flex flex-col items-center"><Icon /></div>
        ))}
      </div>
    </div>
  );
}
