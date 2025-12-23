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
    className={`bg-white dark:bg-[#2a2a2a] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}
  >
    {children}
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();

  const [showBalance, setShowBalance] = useState(true);
  const [activeCard, setActiveCard] = useState("solde");
  const [showCardNumber, setShowCardNumber] = useState(true);

  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);

  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    revenueThisMonth: 0,
    expenseThisMonth: 0,
    expenseCategories: {},
    transactions: [],
    cards: [
      {
        numero: "•••• •••• •••• 4829",
        type: "Mastercard",
        color: ["#b9a896", "#8f7e6b"]
      },
      {
        numero: "CVV •••",
        type: "Mastercard",
        color: ["#8f7e6b", "#6b5a49"]
      }
    ],
    comptes: [
      { id: 1, nom: "Compte Principal", type: "Courant", solde: 245000 },
      { id: 2, nom: "Épargne", type: "Épargne", solde: 780000 },
      { id: 3, nom: "Business", type: "Professionnel", solde: 120000 }
    ]
  });

  /* ================= FETCH CARTES ================= */
  useEffect(() => {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      setLoadingCards(false);
      return;
    }

    const fetchCards = async () => {
      try {
        const data = await getMyCards(token);
        console.log("CARTES API:", data);
        setCards(data);
      } catch (err) {
        console.error("Erreur chargement cartes", err);
      } finally {
        setLoadingCards(false);
      }
    };

    fetchCards();
  }, [user]);

  const nextCard = () => {
    if (cards.length === 0) return;
    setCardIndex(i => (i + 1) % cards.length);
  };

  const prevCard = () => {
    if (cards.length === 0) return;
    setCardIndex(i => (i - 1 + cards.length) % cards.length);
  };

  /* ================= FETCH DASHBOARD ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDashboardData(prev => ({
          ...prev,
          ...res.data
        }));
      } catch (err) {
        console.error("Erreur fetch dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  /* ================= GRAPHIQUES ================= */
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

  const fakeTransactions = [
    { label: "Achat Supermarché", date: "2025-01-02", direction: "expense", amount: 12500 },
    { label: "Salaire Mensuel", date: "2025-01-01", direction: "income", amount: 250000 },
    { label: "Restaurant", date: "2024-12-30", direction: "expense", amount: 8500 },
    { label: "Virement reçu", date: "2024-12-29", direction: "income", amount: 40000 },
    { label: "Transport", date: "2024-12-28", direction: "expense", amount: 3000 },
    { label: "Abonnement Internet", date: "2024-12-27", direction: "expense", amount: 15000 },
    { label: "Bonus", date: "2024-12-26", direction: "income", amount: 50000 },
    { label: "Facture électricité", date: "2024-12-25", direction: "expense", amount: 12000 }
  ];

  const transactionsList = dashboardData.transactions.length >= 5 ? dashboardData.transactions : fakeTransactions;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* HEADER */}
      <div className="p-6 bg-gradient-to-r from-[#f3e8d7] to-[#e8dcc7] rounded-xl shadow-md">
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
          className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300
            ${activeCard === "solde" ? "bg-[#6b5a49] text-white" : "bg-white text-[#6b5a49]"}`}
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
          className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300
            ${activeCard === "revenu" ? "bg-[#6b5a49] text-white" : "bg-white text-[#6b5a49]"}`}
        >
          <div className="text-sm font-semibold">Revenus ce mois</div>
          <div className="text-sm font-semibold mt-2 text-green-500">
            {dashboardData.revenueThisMonth.toLocaleString()} FCFA
          </div>
        </div>

        {/* DEPENSES */}
        <div
          onClick={() => setActiveCard("depense")}
          className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300
            ${activeCard === "depense" ? "bg-[#6b5a49] text-white" : "bg-white text-[#6b5a49]"}`}
        >
          <div className="text-sm font-semibold">Dépenses ce mois</div>
          <div className="text-sm font-semibold mt-2 text-red-500">
            {dashboardData.expenseThisMonth.toLocaleString()} FCFA
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card><div style={{ height: 300 }}><Line data={lineData} options={lineOptions} /></div></Card>
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
        <Card className="flex items-center justify-center relative">
          <div
            className="w-64 h-36 rounded-xl p-4 text-white relative"
            style={{
              background: `linear-gradient(135deg, ${dashboardData.cards[cardIndex].color[0]}, ${dashboardData.cards[cardIndex].color[1]})`
            }}
          >
            <div className="text-xs">{dashboardData.cards[cardIndex].type}</div>
            <div className="text-lg mt-4">
              {showCardNumber ? dashboardData.cards[cardIndex].numero : "•••• •••• •••• ••••"}
            </div>
          </div>
          <button onClick={prevCard} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-white"><FiChevronLeft size={24} /></button>
          <button onClick={nextCard} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-white"><FiChevronRight size={24} /></button>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <ul className="space-y-4">
              {transactionsList.map((t, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-beige-100 flex items-center justify-center">
                      <FiCreditCard />
                    </div>
                    <div>
                      <div className="font-medium">{t.label || t.merchant || "Transaction"}</div>
                      <div className="text-xs opacity-70">{new Date(t.date).toLocaleDateString()}</div>
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
          <div key={i} className="bg-white rounded-xl p-4 flex flex-col items-center">
            <Icon />
          </div>
        ))}
      </div>
    </div>
  );
}
