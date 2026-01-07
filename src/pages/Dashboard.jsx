// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import api from "../services/apitransat.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import { Line } from "react-chartjs-2";
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
import { FiEye, FiEyeOff } from "react-icons/fi";
import CardUI from "../components/CardUI.jsx";
import { getMyCards } from "../services/cardService.js";

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
const getMonthlyStats = (transactions) => {
  const months = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];

  const revenue = Array(12).fill(0);
  const expense = Array(12).fill(0);

  transactions.forEach((t) => {
    const date = new Date(t.createdAt || t.date);
    const month = date.getMonth(); // 0 → 11

    if (t.direction === "income") {
      revenue[month] += t.amount;
    } else {
      expense[month] += t.amount;
    }
  });

  return { months, revenue, expense };
};


export default function Dashboard() {
  const { user } = useAuth();

  const [showBalance, setShowBalance] = useState(true);
  const [activeCard, setActiveCard] = useState("solde");
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [loadingCards, setLoadingCards] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    comptes: [],
    loading: true,
    error: null,
    totalBalance: 0,
    revenueThisMonth: 0,
    expenseThisMonth: 0,
    expenseCategories: {},
    transactions: [],
    cards: []
  });

const fetchDashboard = async () => {
  try {
    const res = await api.get("/api/dashboard/summary");

    setDashboardData(prev => ({
      ...prev,
      totalBalance: res.data.totalBalance || 0,
      revenueThisMonth:
        res.data.revenueThisMonth ??
        res.data.incomeThisMonth ??
        0,
      expenseThisMonth:
        res.data.expenseThisMonth ??
        res.data.totalExpenseThisMonth ??
        0,
      transactions: res.data.transactions || [],
      loading: false,
      error: null,
    }));
  } catch (err) {
    console.error("Erreur fetch dashboard:", err);
    setDashboardData(prev => ({
      ...prev,
      loading: false,
      error: "Erreur chargement dashboard",
    }));
  }
};


  const fetchComptes = async () => {
    try {
     const res = await api.get("/api/accounts");

setDashboardData(prev => ({
  ...prev,
  comptes: res.data,
  loading: false,
  error: null,
}));


    } catch (err) {
      console.error(err);
      setDashboardData(prev => ({
        ...prev,
        comptes: [],
        loading: false,
        error: "Impossible de charger les comptes",
      }));
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchComptes();
  }, []);

  useEffect(() => {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      setLoadingCards(false);
      return;
    }

    const fetchCards = async () => {
      try {
        const data = await getMyCards(token);
        setCards(data);
      } catch (err) {
        console.error("Erreur chargement cartes", err);
      } finally {
        setLoadingCards(false);
      }
    };

    fetchCards();
  }, [user]);

  const nextCard = () => setCardIndex(i => (i + 1) % cards.length);
  const prevCard = () => setCardIndex(i => (i - 1 + cards.length) % cards.length);

  if (dashboardData.loading) return <p className="text-center mt-20">Chargement des comptes...</p>;
  if (dashboardData.error) return <p className="text-center text-red-500">{dashboardData.error}</p>;
const { months, revenue, expense } = getMonthlyStats(
  dashboardData.transactions
);

const lineData = {
  labels: months,
  datasets: [
    {
      label: "Revenus",
      data: revenue,
      borderColor: "#6b5a49", 
      backgroundColor: "rgba(107, 90, 73, 0.25)",
      pointBackgroundColor: "#6b5a49",
      pointBorderColor: "#6b5a49",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Dépenses",
      data: expense,
      borderColor: "#8f7e6b", // même que texte carte
      backgroundColor: "rgba(143, 126, 107, 0.25)",
      pointBackgroundColor: "#8f7e6b",
      pointBorderColor: "#8f7e6b",
      tension: 0.4,
      fill: true,
    },
  ],
};



const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#6b5a49",
        font: {
          weight: "600",
        },
      },
    },
    tooltip: {
      backgroundColor: "#f3e8d7",
      titleColor: "#6b5a49",
      bodyColor: "#6b5a49",
      borderColor: "#d4b8a5",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#6b5a49",
      },
      grid: {
        color: "rgba(107, 90, 73, 0.1)",
      },
    },
    y: {
      ticks: {
        color: "#6b5a49",
        callback: value => `${value.toLocaleString()} FCFA`,
      },
      grid: {
        color: "rgba(107, 90, 73, 0.1)",
      },
    },
  },
};





  return (
    <div className="space-y-6 p-4 sm:p-6 ">

      {/* Header */}
      <div className=" welcome-card p-6 bg-[#e8dcc7] dark:bg-[#3a2e2a] rounded-xl shadow-lg"> 
        <h2 className="welcome-title text-3xl font-semibold text-[#8f7e6b]">
  Bienvenue
  {user?.prenom
    ? `, ${user.prenom.charAt(0).toUpperCase()}${user.prenom.slice(1)}`
    : ""}
</h2>

        <p className="welcome-text text-sm text-[#6b5a49] mt-1">
          Voici un aperçu de votre situation financière
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  dashboard-container">
        <div
          onClick={() => setActiveCard("solde")}
          className={`rounded-xl card p-10 shadow-lg cursor-pointer transition-all duration-300 ${activeCard === "solde" ? "bg-[#6b5a49] text-white" : "bg-white dark:bg-[#2a2a2a] dark:text-[#f1e8dc] text-[#6b5a49]"}`}
        >
          <div className="flex justify-between items-start ">
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

        <div
          onClick={() => setActiveCard("revenu")}
          className={`rounded-xl p-10 shadow-lg cursor-pointer transition-all duration-300 card ${activeCard === "revenu" ? "bg-[#6b5a49] text-white" : "bg-white dark:bg-[#2a2a2a] dark:text-[#f1e8dc] text-[#6b5a49]"}`}
        >
          <div className="text-sm font-semibold">Revenus ce mois</div>
          <div className="text-sm font-semibold mt-2 text-green-500">
            {dashboardData.revenueThisMonth.toLocaleString()} FCFA
          </div>
        </div>

        <div
          onClick={() => setActiveCard("depense")}
          className={`rounded-xl p-10 shadow-lg cursor-pointer transition-all duration-300 card ${activeCard === "depense" ? "bg-[#6b5a49] text-white" : "bg-white dark:bg-[#2a2a2a] dark:text-[#f1e8dc] text-[#6b5a49]"}`}
        >
          <div className="text-sm font-semibold">Dépenses ce mois</div>
          <div className="text-sm font-semibold mt-2 text-red-500">
            {dashboardData.expenseThisMonth.toLocaleString()} FCFA
          </div>
        </div>
      </div>

      {/* Mes Comptes */}
      <section className="mt-17 mb-20 flex justify-center ">
        <div className="w-full max-w-7xl card-timeline rounded-3xl shadow-1xl p-10 relative">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-[#6b5a49] mb-12 account-card">Mes Comptes</h3>
          <div className="relative">
            <div className="hidden sm:block timeline-gradient absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#d8cbb4] via-[#cbbba3] to-transparent -translate-x-1/2 shadow-md dark:from-neutral-600 dark:via-neutral-500 "></div>
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {dashboardData.comptes.map((compte, index) => (
                <div
                  key={compte._id}
                  className={`relative flex items-center w-full justify-center sm:justify-start ${index % 2 === 0 ? "sm:pl-[calc(50%+24px)]" : "sm:justify-end sm:pr-[calc(50%+24px)]"}`}
                >
                  <span className="timeline-bubble  hidden sm:flex absolute left-1/2 w-6 h-6 bg-gradient-to-tr from-[#cbb99a] via-[#d4b8a5] to-[#cbb99a] rounded-full shadow-lg -translate-x-1/2  flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </span>

                  <div className=" timeline-gradient w-full max-w-sm sm:max-w-md mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-tr from-[#f3e8d7] via-[#e8dcc7] to-[#f3e8d7] shadow-lg  dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700">
                    <div className="flex items-center justify-between">
                      <div className="card-info">
                        <p className="text-xs uppercase tracking-widest text-[#6b5a49]/70 dark:text-neutral-100">{compte.type}</p>
                        <h4 className="text-lg sm:text-xl font-bold text-[#6b5a49] mt-1 dark:text-neutral-300">{compte.name}</h4>
                        <p className="text-xs sm:text-sm text-[#6b5a49]/70">
                          Numéro : {compte.accountNumber ? compte.accountNumber.replace(/(.{4})/g, "$1 ") : "N/A"}
                        </p>
                      </div>

                      <div className=" card-info w-10 h-10 sm:w-12 sm:h-12 icon-circle rounded-full bg-[#cbb99a]/30 flex items-center justify-center text-[#6b5a49]">
                        <i className={`fas ${compte.type === "courant" ? "fa-wallet" : compte.type === "epargne" ? "fa-piggy-bank" : "fa-briefcase"}`}></i>
                      </div>
                    </div>

                    <div className="card-info mt-4">
                      <p className="text-lg sm:text-xl  md:text-2xl font-extrabold text-[#6b5a49]">{compte.balance.toLocaleString()} {compte.currency}</p>
                      <p className="text-xs sm:text-sm text-[#6b5a49]/60 dark:text-neutral-400">Solde disponible</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 sm:mt-12 text-center text-[#8f7e6b] italic font-medium  text-base sm:text-lg">
            "Gérez vos comptes, simplifiez votre vie financière"
          </p>
        </div>
      </section>

      {/* Charts et carte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="lg:col-span-1 bg-beige-50 dark:bg-[#2a2a2a] rounded-xl p-6 shadow-sm border border-beige-100 dark:border-beige-700"> 
          <Card>
            <div style={{ height: 300 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </Card>
        </div>
        {/* Carte avec rotation */}
<div className="flex justify-center my-6">
  <div className="relative perspective-1000">
    <div className="w-72 h-40 transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-180">
      {/* Face avant de la carte */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8f7e6b] to-[#6b5a49] p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-xl font-bold">Numéro de Compte</h3>
        <p className="mt-2 text-sm">1234 5678 9876 5432</p>
      </div>

      {/* Face arrière de la carte */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6b5a49] to-[#8f7e6b] p-6 rounded-xl shadow-lg text-white transform rotate-y-180">
        <h3 className="text-xl font-bold">Détails de la carte</h3>
        <p className="mt-4">CVV: 123</p>
        <p>Date d'Expiration: 12/25</p>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
