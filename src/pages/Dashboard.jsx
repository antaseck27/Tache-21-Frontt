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
  const [isFlipped, setIsFlipped] = useState(false);

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

  if (dashboardData.loading)
    return <p className="text-center mt-20">Chargement des comptes...</p>;

  if (dashboardData.error)
    return <p className="text-center text-red-500">{dashboardData.error}</p>;

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
        borderColor: "#8f7e6b",
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
          font: { weight: "600" },
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
        ticks: { color: "#6b5a49" },
        grid: { color: "rgba(107, 90, 73, 0.1)" },
      },
      y: {
        ticks: {
          color: "#6b5a49",
          callback: value => `${value.toLocaleString()} FCFA`,
        },
        grid: { color: "rgba(107, 90, 73, 0.1)" },
      },
    },
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* … TOUT LE CONTENU IDENTIQUE … */}

      {/* Charts et carte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full min-h-[300px]">
            <div className="h-[300px]">
              <Line data={lineData} options={lineOptions} />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full min-h-[300px] flex justify-center items-center">
            {loadingCards ? (
              <p>Chargement carte...</p>
            ) : cards.length === 0 ? (
              <p>Aucune carte disponible</p>
            ) : (
              <CardUI
                card={cards[cardIndex]}
                nextCard={nextCard}
                prevCard={prevCard}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
