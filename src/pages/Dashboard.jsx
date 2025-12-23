// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Line, Doughnut } from "react-chartjs-2";
// import { 
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, ArcElement, Legend 
// } from "chart.js";
// import { 
//   FiEye, FiEyeOff, FiChevronLeft, FiChevronRight, FiCreditCard, FiSend, FiDownload, FiSave 
// } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext.jsx";
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, ArcElement, Legend);

// const Card = ({ children, className = "" }) => (
//   <div className={`bg-white dark:bg-[#2a2a2a] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
//     {children}
//   </div>
// );

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [showBalance, setShowBalance] = useState(true);
//   const [cardIndex, setCardIndex] = useState(0);
//   const [activeCard, setActiveCard] = useState(null);
// // const [userCard, setUserCard] = useState(null); 
//  const [dashboardData, setDashboardData] = useState({
//   totalBalance: 0,
//   revenueThisMonth: 0,
//   expenseThisMonth: 0,
//   expenseCategories: {},
//   transactions: [],
//   cards: [
//     { face: "recto", numero: "•••• •••• •••• 4829", type: "Mastercard", color: ["#b9a896", "#8f7e6b"] },
//     { face: "verso", numero: "CVV •••", type: "Mastercard", color: ["#8f7e6b", "#6b5a49"] }
//   ]
// });
//  useEffect(() => {
//   const fetchDashboard = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get(
//         "http://localhost:5000/api/dashboard/summary",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setDashboardData(prev => ({
//         ...prev,
//         ...res.data
//       }));
//     } catch (err) {
//       console.error("Erreur fetch dashboard:", err);
//     }
//   };

//   fetchDashboard();
// }, []);



//   const nextCard = () => setCardIndex(i => (i + 1) % dashboardData.cards.length);
//   const prevCard = () => setCardIndex(i => (i - 1 + dashboardData.cards.length) % dashboardData.cards.length);

//   // --- Graphiques ---
// const lineData = {
//   labels: ["Revenus", "Dépenses"],
//   datasets: [
//     {
//       label: "Montant",
//       data: [
//         dashboardData.revenueThisMonth,
//         dashboardData.expenseThisMonth
//       ],
//       fill: true,
//       backgroundColor: "#d4b8a5",
//       borderColor: "#8f7e6b",
//       tension: 0.3,
//       pointRadius: 0
//     }
//   ]
// };


//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: { mode: "index", intersect: false },
//     plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
//     scales: {
//       x: { grid: { display: false }, ticks: { color: "#6b5a49" } },
//       y: { grid: { color: "rgba(15,23,42,0.03)" }, ticks: { color: "#6b5a49" } }
//     },
//     animation: { duration: 800, easing: "easeOutQuart" }
//   };

//  const donutData = {
//   labels: Object.keys(dashboardData.expenseCategories),
//   datasets: [
//     {
//       data: Object.values(dashboardData.expenseCategories),
//       backgroundColor: [
//         "#d6c7b4",
//         "#bfa98a",
//         "#d4b8a5",
//         "#dfcdb9",
//         "#cbb99a"
//       ],
//       hoverOffset: 10
//     }
//   ]
// };


//   const donutOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: true } }, animation: { animateRotate: true, animateScale: true, easing: "easeOutQuart" } };

//   return (
//     <div className="space-y-6 p-4 sm:p-6">

//       {/* Header Welcome */}
//       <div className="p-6 bg-gradient-to-r from-[#f3e8d7] to-[#e8dcc7] rounded-xl shadow-md dark:from-[#2b2a28] dark:to-[#222]">
//         <h2 className="text-3xl font-semibold text-[#8f7e6b] dark:text-[#f1e8dc]">  Bienvenue{user?.prenom ? `, ${user.prenom}` : ""} </h2>
//         <p className="text-sm text-[#6b5a49] dark:text-[#d6c5a9] mt-1">Voici un aperçu de votre situation financière</p>
//       </div>

//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Solde Total */}
//         <div
//           onClick={() => setActiveCard("solde")}
//           className={`relative rounded-xl p-6 shadow-md cursor-pointer transition
//             ${activeCard === "solde" ? "bg-[#cbb99a] text-[#6b5a49]" : "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700"}
//           `}
//         >
//           <div className="flex justify-between items-start">
//             <div>
//               <div className="text-sm opacity-90">Solde Total</div>
//               <div className="text-sm font-semibold mt-2">{showBalance
//   ? `${dashboardData.totalBalance.toLocaleString()} FCFA`
//   : "•••• ••••"}</div>
//               <div className="text-sm mt-2 opacity-80 text-[#8f7e6b]">0% ce mois</div>
//             </div>
//             <button
//               onClick={(e) => { e.stopPropagation(); setShowBalance(s => !s); }}
//               className="ml-4 rounded-md bg-[#8f7e6b]/30 p-2 hover:bg-[#8f7e6b]/50 transition"
//             >
//               {showBalance ? <FiEye size={18} /> : <FiEyeOff size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Revenus */}
//         <div
//           onClick={() => setActiveCard("revenus")}
//           className={`rounded-xl p-6 shadow-md cursor-pointer transition
//             ${activeCard === "revenus" ? "bg-[#cbb99a] text-[#6b5a49]" : "bg-white dark:bg-[#222] text-beige-700 dark:text-[#d6c5a9]"}
//           `}
//         >
//           <div className="text-sm opacity-90 font-semibold dark:text-[#8f7e6b]">Revenus ce mois</div>
//           <div className="text-sm font-semibold mt-2">{dashboardData.revenueThisMonth.toLocaleString()} FCFA FCFA</div>
//           <div className="text-sm text-green-500 mt-2">0% vs mois dernier</div>
//         </div>

//         {/* Dépenses */}
//         <div
//           onClick={() => setActiveCard("depenses")}
//           className={`rounded-xl p-6 shadow-md cursor-pointer transition
//             ${activeCard === "depenses" ? "bg-[#cbb99a] text-[#6b5a49]" : "bg-white dark:bg-[#222] text-[#6b5a49] dark:text-[#6b5a49]"}
//           `}
//         >
//           <div className="text-sm font-semibold dark:text-[#8f7e6b]">Dépenses ce mois</div>
//           <div className="text-sm font-semibold mt-2">{dashboardData.expenseThisMonth.toLocaleString()} FCFA</div>
//           <div className="text-sm text-red-400 mt-2">0% vs mois dernier</div>
//         </div>

//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <Card className="h-90">
//             <div style={{ height: 320 }}>
//               <Line data={lineData} options={lineOptions} />
//             </div>
//           </Card>
//         </div>
//         <Card className="h-90 flex flex-col items-center justify-center">
//           <div className="w-48 h-48 mb-1">
//             <Doughnut data={donutData} options={donutOptions} />
//           </div>
//           <ul className="text-sm space-y-2 w-full max-w-xs">
//   {Object.entries(dashboardData.expenseCategories).map(
//     ([cat, value], i) => (
//       <li key={i} className="flex justify-between">
//         <span>{cat}</span>
//         <span>{value.toLocaleString()} FCFA</span>
//       </li>
//     )
//   )}
// </ul>

//         </Card>
//       </div>

//       {/* Carte Bancaire */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="h-full flex flex-col items-center justify-center relative">
//           {dashboardData.cards.length > 0 && (
//             <div
//               className={`w-64 h-36 p-4 text-white rounded-xl flex flex-col justify-center transition-all duration-500 ease-in-out`}
//               style={{ background: `linear-gradient(135deg, ${dashboardData.cards[cardIndex].color[0]}, ${dashboardData.cards[cardIndex].color[1]})` }}
//             >
//               <div className="text-xs opacity-80">{dashboardData.cards[cardIndex].type}</div>
//               <div className="text-lg mt-3">{dashboardData.cards[cardIndex].numero}</div>
//             </div>
//           )}
//           <button onClick={prevCard} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-white"><FiChevronLeft size={24} /></button>
//           <button onClick={nextCard} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-white"><FiChevronRight size={24} /></button>
//         </Card>

//         {/* Transactions récentes */}
//         <div className="lg:col-span-2">
//           <Card>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-medium dark:text-[#f1e8dc]">Transactions récentes</h3>
//               <a className="text-sm text-beige-6000" href="#!">Voir tout</a>
//             </div>
//             // <ul className="space-y-4">
//             //   {(dashboardData.transactions || []).map((t, i) => (
//             //     <li key={i} className="flex items-center justify-between">
//             //       <div className="flex items-center gap-3">
//             //         <div className="w-10 h-10 rounded-lg bg-beige-100 dark:bg-[#1f1f1f] flex items-center justify-center">
//             //           <FiCreditCard />
//             //         </div>
//             //         <div>
//             //           <div className="font-medium dark:text-[#f1e8dc]">{t.title || "Transaction"}</div>
//             //           <div className="text-xs text-beige-900 dark:text-[#bfb6a5]">{t.date || "Aujourd'hui"}</div>
//             //         </div>
//             //       </div>
//             //       <div className={t.amount >= 0 ? "text-green-500" : "text-red-500"}>{t.amount || 0} FCFA</div>
//             //     </li>
//             //   ))}
//             // </ul>
//             <ul className="space-y-4">
//   {dashboardData.transactions.map((t, i) => (
//     <li key={i} className="flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-lg bg-beige-100 flex items-center justify-center">
//           <FiCreditCard />
//         </div>
//         <div>
//           <div className="font-medium">
//             {t.label || t.merchant || "Transaction"}
//           </div>
//           <div className="text-xs opacity-70">
//             {new Date(t.date).toLocaleDateString()}
//           </div>
//         </div>
//       </div>

//       <div className={
//         t.direction === "income"
//           ? "text-green-500"
//           : "text-red-500"
//       }>
//         {t.direction === "expense" ? "-" : "+"}
//         {t.amount.toLocaleString()} FCFA
//       </div>
//     </li>
//   ))}
//             </ul>

//           </Card>
//         </div>
//       </div>
      

//       {/* Actions */}
//       <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {[
//           { icon: FiSend, label: "Envoyer", from: "#cbb99a", to: "#cbb99a" },
//           { icon: FiDownload, label: "Recevoir", from: "#cbb99a", to: "#cbb99a" },
//           { icon: FiCreditCard, label: "Payer", from: "#cbb99a", to: "#cbb99a" },
//           { icon: FiSave, label: "Épargner", from: "#cbb99a", to: "#cbb99a" },
//         ].map((item, i) => (
//           <div key={i} className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center">
//             <div
//               className="text-[#f4efe6] w-12 h-12 rounded-lg flex items-center justify-center mb-2"
//               style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}
//             >
//               <item.icon />
//             </div>
//             <div className="text-sm text-[#6b5a49] dark:text-[#f1e8dc]">{item.label}</div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }


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

  const [showBalance, setShowBalance] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
    const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [loadingCards, setLoadingCards] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    revenueThisMonth: 0,
    expenseThisMonth: 0,
    expenseCategories: {},
    transactions: [],
   
  });

  const refreshCards = async () => {
  const token = user?.token || localStorage.getItem("token");
  if (!token) return;

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


  const nextCard = () =>
    setCardIndex(i => (i + 1) % cards.length);

  const prevCard = () =>
    setCardIndex(i => (i - 1 + cards.length) % cards.length);
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
        data: [
          dashboardData.revenueThisMonth,
          dashboardData.expenseThisMonth
        ],
        fill: true,
        backgroundColor: "#d4b8a5",
        borderColor: "#8f7e6b",
        tension: 0.3,
        pointRadius: 0
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const donutData = {
    labels: Object.keys(dashboardData.expenseCategories),
    datasets: [
      {
        data: Object.values(dashboardData.expenseCategories),
        backgroundColor: [
          "#d6c7b4",
          "#bfa98a",
          "#d4b8a5",
          "#dfcdb9",
          "#cbb99a"
        ],
        hoverOffset: 10
      }
    ]
  };

  const donutOptions = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

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
          className="rounded-xl p-6 shadow-md cursor-pointer bg-gradient-to-br from-[#b9a896] to-[#8f7e6b]"
        >
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Solde Total</div>
              <div className="text-sm font-semibold mt-2">
                {showBalance
                  ? `${dashboardData.totalBalance.toLocaleString()} FCFA`
                  : "•••• ••••"}
              </div>
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                setShowBalance(s => !s);
              }}
            >
              {showBalance ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>

        {/* REVENUS */}
        <div className="rounded-xl p-6 shadow-md bg-white">
          <div className="text-sm font-semibold">Revenus ce mois</div>
          <div className="text-sm font-semibold mt-2 text-green-500">
            {dashboardData.revenueThisMonth.toLocaleString()} FCFA
          </div>
        </div>

        {/* DEPENSES */}
        <div className="rounded-xl p-6 shadow-md bg-white">
          <div className="text-sm font-semibold">Dépenses ce mois</div>
          <div className="text-sm font-semibold mt-2 text-red-500">
            {dashboardData.expenseThisMonth.toLocaleString()} FCFA
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div style={{ height: 300 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </Card>
        </div>

        <Card className="flex flex-col items-center">
          <div className="w-48 h-48">
            <Doughnut data={donutData} options={donutOptions} />
          </div>

          <ul className="text-sm mt-4 w-full max-w-xs space-y-2">
            {Object.entries(dashboardData.expenseCategories).map(
              ([cat, value], i) => (
                <li key={i} className="flex justify-between">
                  <span>{cat}</span>
                  <span>{value.toLocaleString()} FCFA</span>
                </li>
              )
            )}
          </ul>
        </Card>
      </div>

      {/* CARTE BANCAIRE + TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

       {/* CARTE */}
        <Card className="flex justify-center">
          {loadingCards ? (
            <p>Chargement carte...</p>
          ) : cards.length === 0 ? (
            <p>Aucune carte</p>
          ) : (
            <CardUI
              card={cards[cardIndex]}
              nextCard={nextCard}
              prevCard={prevCard}
            />
          )}
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
                      <div className="text-xs">
                        {new Date(t.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      t.direction === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {t.direction === "expense" ? "-" : "+"}
                    {t.amount.toLocaleString()} FCFA
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