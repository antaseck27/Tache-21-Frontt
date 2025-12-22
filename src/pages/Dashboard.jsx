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
import { useAuth } from "../context/AuthContext.jsx";

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
  // const [activeCard, setActiveCard] = useState(null);
  const [activeCard, setActiveCard] = useState("solde");
  const [showCardNumber, setShowCardNumber] = useState(true);



  // const [dashboardData, setDashboardData] = useState({
  //   totalBalance: 0,
  //   revenueThisMonth: 0,
  //   expenseThisMonth: 0,
  //   expenseCategories: {},
  //   transactions: [],
  //   cards: [
  //     {
  //       numero: "•••• •••• •••• 4829",
  //       type: "Mastercard",
  //       color: ["#b9a896", "#8f7e6b"]
  //     },
  //     {
  //       numero: "CVV •••",
  //       type: "Mastercard",
  //       color: ["#8f7e6b", "#6b5a49"]
  //     }
  //   ]

  // });
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

  // ✅ NOUVELLE SECTION
comptes: [
  {
    id: 1,
    nom: "Compte Principal",
    type: "Courant",
    solde: 245000
  },
  {
    id: 2,
    nom: "Épargne",
    type: "Épargne",
    solde: 780000
  },
  {
    id: 3,
    nom: "Business",
    type: "Professionnel",
    solde: 120000
  }
]

});


  

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

  const nextCard = () =>
    setCardIndex(i => (i + 1) % dashboardData.cards.length);
  const prevCard = () =>
    setCardIndex(i => (i - 1 + dashboardData.cards.length) % dashboardData.cards.length);

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

  const [visibleCount, setVisibleCount] = useState(3);

  const fakeTransactions = [
  {
    label: "Achat Supermarché",
    date: "2025-01-02",
    direction: "expense",
    amount: 12500
  },
  {
    label: "Salaire Mensuel",
    date: "2025-01-01",
    direction: "income",
    amount: 250000
  },
  {
    label: "Restaurant",
    date: "2024-12-30",
    direction: "expense",
    amount: 8500
  },
  {
    label: "Virement reçu",
    date: "2024-12-29",
    direction: "income",
    amount: 40000
  },
  {
    label: "Transport",
    date: "2024-12-28",
    direction: "expense",
    amount: 3000
  },
  {
    label: "Abonnement Internet",
    date: "2024-12-27",
    direction: "expense",
    amount: 15000
  },
  {
    label: "Bonus",
    date: "2024-12-26",
    direction: "income",
    amount: 50000
  },
  {
    label: "Facture électricité",
    date: "2024-12-25",
    direction: "expense",
    amount: 12000
  }
];
const transactionsList =
  dashboardData.transactions.length >= 5
    ? dashboardData.transactions
    : fakeTransactions;
    



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



      

      {/*-------------------------------------- TOP CARDS  -------------------------------------------------*/}
     
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* SOLDE */}
  <div
    onClick={() => setActiveCard("solde")}
    className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300
      ${activeCard === "solde"
        ? "bg-[#6b5a49] text-white"
        : "bg-white text-[#6b5a49]"}
    `}
  >
    <div className="flex justify-between items-start">
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
  <div
    onClick={() => setActiveCard("revenu")}
    className={`rounded-xl p-12 shadow-lg cursor-pointer transition-all duration-300
      ${activeCard === "revenu"
        ? "bg-[#6b5a49] text-white"
        : "bg-white text-[#6b5a49]"}
    `}
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
      ${activeCard === "depense"
        ? "bg-[#6b5a49] text-white"
        : "bg-white text-[#6b5a49]"}
    `}
  >
    <div className="text-sm font-semibold">Dépenses ce mois</div>
    <div className="text-sm font-semibold mt-2 text-red-500">
      {dashboardData.expenseThisMonth.toLocaleString()} FCFA
    </div>
  </div>

</div>

{/* ================= CARD MES COMPTES ================= */}
{/* ================= CARD MES COMPTES ================= */}
<section className="mt-20 mb-20 flex justify-center">
  <div className="w-full max-w-8xl bg-gradient-to-tr from-[#f3e8d7] via-[#e8dcc7] to-[#f3e8d7] dark:from-[#2b2a28] dark:via-[#222] dark:to-[#2b2a28] rounded-3xl shadow-2xl p-10 relative">
    
    {/* Titre */}
    <h3 className="text-3xl font-bold text-center text-[#6b5a49] mb-12">
      Mes Comptes
    </h3>

    {/* Timeline */}
    <div className="relative">
      {/* Ligne centrale */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#d8cbb4] via-[#cbbba3] to-transparent -translate-x-1/2 shadow-md"></div>

      <div className="space-y-16">
        {dashboardData.comptes.map((compte, index) => (
          <div
            key={compte.id}
            className={`relative flex items-center w-full ${
              index % 2 === 0
                ? "justify-start pl-[calc(50%+20px)]"
                : "justify-end pr-[calc(50%+20px)]"
            }`}
          >
            {/* Point sur la ligne avec glow */}
            <span className="absolute left-1/2 w-6 h-6 bg-gradient-to-tr from-[#cbb99a] via-[#d4b8a5] to-[#cbb99a] rounded-full shadow-lg -translate-x-1/2 flex items-center justify-center text-white font-bold animate-glow">
              {index + 1}
            </span>

            {/* Card interne */}
            <div
              style={{ animationDelay: `${index * 150}ms` }}
              className="w-full max-w-[400px] p-6 rounded-2xl bg-gradient-to-tr from-[#f3e8d7] via-[#e8dcc7] to-[#f3e8d7] dark:from-[#3a3a3a]/80 dark:via-[#2b2b2b]/80 dark:to-[#3a3a3a]/80 shadow-lg animate-fadeUp transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#6b5a49]/70">
                    {compte.type}
                  </p>
                  <h4 className="text-xl font-bold text-[#6b5a49] mt-1">
                    {compte.nom}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#cbb99a]/30 flex items-center justify-center text-[#6b5a49] shadow-inner">
                  {index % 2 === 0 ? (
                    <i className="fas fa-wallet text-lg"></i>
                  ) : (
                    <i className="fas fa-university text-lg"></i>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-extrabold text-[#6b5a49]">
                  {compte.solde.toLocaleString()} FCFA
                </p>
                <p className="text-xs text-[#6b5a49]/60">Solde disponible</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Slogan */}
    <p className="mt-12 text-center text-[#8f7e6b] italic font-medium text-lg">
      "Gérez vos comptes, simplifiez votre vie financière"
    </p>
  </div>
</section>

{/* ================= ANIMATIONS CSS ================= */}
<style jsx>{`
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px #f3e8d7, 0 0 10px #cbb99a, 0 0 15px #d4b8a5;
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 10px #f3e8d7, 0 0 20px #cbb99a, 0 0 30px #d4b8a5;
      transform: scale(1.2);
    }
  }

  .animate-glow {
    animation: glow 2s infinite ease-in-out;
  }

  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeUp {
    animation: fadeUp 0.5s forwards;
  }
`}</style>


{/* ================= ANIMATIONS CSS ================= */}
<style jsx>{`
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px #f3e8d7, 0 0 10px #cbb99a, 0 0 15px #d4b8a5;
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 10px #f3e8d7, 0 0 20px #cbb99a, 0 0 30px #d4b8a5;
      transform: scale(1.2);
    }
  }

  .animate-glow {
    animation: glow 2s infinite ease-in-out;
  }

  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeUp {
    animation: fadeUp 0.5s forwards;
  }
`}</style>




      {/* CHARTS */}
{/* CHARTS */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-2xl">

  {/* ---------------------------LINE CHART - Évolution prix par semaine ------------------------------*/}
  <div className="lg:col-span-3">
    <Card>
      <div style={{ height: 300 }}>
        <Line
          data={{
            labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
            datasets: [
              {
                label: "Prix FCFA",
                data: [120000, 150000, 100000, 180000], // valeurs statiques pour test
                fill: true,
                backgroundColor: "rgba(203,185,154,0.2)", // beige pailleté clair
                borderColor: "#cbb99a", // ligne beige foncé
                tension: 0.3,
                pointBackgroundColor: "#cbb99a",
                pointRadius: 4,
                pointHoverRadius: 6
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.dataset.label + ": " + context.parsed.y.toLocaleString() + " FCFA";
                  }
                }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: "#6b5a49" } },
              y: {
                grid: { color: "rgba(203,185,154,0.1)" },
                ticks: {
                  color: "#6b5a49",
                  callback: function(value) { return value.toLocaleString() + " FCFA"; }
                }
              }
            }
          }}
        />
      </div>
    </Card>
  </div>

</div>

  {/* ---------------------------LINE CHART - Évolution prix par semaine ------------------------------*/}
  {/* <div className="lg:col-span-2 ">
    <Card>
      <div style={{ height: 300 }}>
        <Line
          data={{
            labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
            datasets: [
              {
                label: "Prix FCFA",
                data: [120000, 150000, 100000, 180000], 
                fill: true,
                backgroundColor: "rgba(203,185,154,0.2)", 
                borderColor: "#cbb99a", 
                tension: 0.3,
                pointBackgroundColor: "#cbb99a",
                pointRadius: 4,
                pointHoverRadius: 6
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.dataset.label + ": " + context.parsed.y.toLocaleString() + " FCFA";
                  }
                }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: "#6b5a49" } },
              y: {
                grid: { color: "rgba(203,185,154,0.1)" },
                ticks: {
                  color: "#6b5a49",
                  callback: function(value) { return value.toLocaleString() + " FCFA"; }
                }
              }
            }
          }}
        />
      </div>
    </Card>
  </div> */}




  

  {/* ---------------------------DONUT CHART - Catégories de dépenses----------------------------------------- */}
  {/* <Card className="flex flex-col items-center">
    <div className="w-37 h-37">
      <Doughnut
        data={{
          labels: ["Transport", "Nourriture", "Loisirs", "Abonnement", "Autres"],
          datasets: [
            {
              data: [15000, 30000, 8000, 12000, 5000], 
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
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } }
        }}
      />
    </div>

    <ul className="text-sm mt-4 w-full max-w-xs space-y-2">
      {[
        { cat: "Transport", value: 15000 },
        { cat: "Nourriture", value: 30000 },
        { cat: "Loisirs", value: 8000 },
        { cat: "Abonnement", value: 12000 },
        { cat: "Autres", value: 5000 }
      ].map((item, i) => (
        <li key={i} className="flex justify-between">
          <span>{item.cat}</span>
          <span>{item.value.toLocaleString()} FCFA</span>
        </li>
      ))}
    </ul>
  </Card> */}
{/* </div> */}





      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div> */}

      {/*--------------------------------------CARTE BANCAIRE + TRANSACTIONS------------------------------------------------------------*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-2xl">
     

  <Card className="flex items-center justify-center relative">
    <div
      className="w-64 h-36 rounded-xl p-4 text-white relative"
      style={{
        background: `linear-gradient(135deg,
          ${dashboardData.cards[cardIndex].color[0]},
          ${dashboardData.cards[cardIndex].color[1]})`
      }}
    >
      <div className="text-xs">{dashboardData.cards[cardIndex].type}</div>

      <div className="text-lg mt-4">
        {showCardNumber
          ? dashboardData.cards[cardIndex].numero
          : "•••• •••• •••• ••••"}
      </div>

      {/* BOUTON VOIR / MASQUER */}
      <button
        onClick={() => setShowCardNumber(s => !s)}
        className="absolute top-2 right-2 text-white p-1 rounded hover:bg-black/20"
      >
        {showCardNumber ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>

    <button onClick={prevCard} className="absolute left-2">
      <FiChevronLeft />
    </button>
    <button onClick={nextCard} className="absolute right-2">
      <FiChevronRight />
    </button>
  </Card>




        {/* <Card className="flex items-center justify-center relative">
          <div
            className="w-64 h-36 rounded-xl p-4 text-white"
            style={{
              background: `linear-gradient(135deg,
                ${dashboardData.cards[cardIndex].color[0]},
                ${dashboardData.cards[cardIndex].color[1]})`
            }}
          >
            <div className="text-xs">{dashboardData.cards[cardIndex].type}</div>
            <div className="text-lg mt-4">
              {dashboardData.cards[cardIndex].numero}
            </div>
          </div>

          <button onClick={prevCard} className="absolute left-2">
            <FiChevronLeft />
          </button>
          <button onClick={nextCard} className="absolute right-2">
            <FiChevronRight />
          </button>
        </Card> */}



        {/* ------------------------------Transaction ---------------------------------------*/}

        {/* <div className="lg:col-span-2">
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
        </div> */}
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
          {transactionsList
            .slice(0, visibleCount)
            .map((t, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-3 flex items-center gap-2">
                  <FiCreditCard />
                  {t.label || t.merchant || "Transaction"}
                </td>

                <td className="py-3 text-xs">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                <td
                  className={`py-3 text-right font-semibold ${
                    t.direction === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {t.direction === "expense" ? "-" : "+"}
                  {t.amount.toLocaleString()} FCFA
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/*------------------------- VOIR PLUS / VOIR MOINS------------------------------------ */}
    {transactionsList.length > 3 && (
      <div className="mt-4 text-center">
        {visibleCount < transactionsList.length ? (
          <button
            onClick={() => setVisibleCount(c => c + 3)}
            className="text-sm text-[#6b5a49] hover:underline"
          >
            Voir plus
          </button>
        ) : (
          <button
            onClick={() => setVisibleCount(3)}
            className="text-sm text-[#6b5a49] hover:underline"
          >
            Voir moins
          </button>
        )}
      </div>
    )}
  </Card>
</div>





      </div>

      {/* ACTIONS */}
     
{/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {[
    { icon: FiSend, label: "Envoyer" },
    { icon: FiDownload, label: "Télécharger" },
    { icon: FiCreditCard, label: "Carte" },
    { icon: FiSave, label: "Enregistrer" }
  ].map((item, i) => {
    const Icon = item.icon;
    return (
      <div
        key={i}
        className="bg-white rounded-xl p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition"
      >
        <Icon className="text-xl mb-2" />
        <span className="text-sm text-[#6b5a49]">{item.label}</span>
      </div>
    );
  })}



</div> */}

{/* ================= TIMELINE MES COMPTES PREMIUM ================= */}






    </div>
  );
}


