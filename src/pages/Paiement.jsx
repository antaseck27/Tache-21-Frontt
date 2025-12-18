// import { useState } from "react";
// import FormPaiement from "../components/FormPaiement";

// const Section1 = () => {
//   const [activeForm, setActiveForm] = useState(null); 
//   const [historique, setHistorique] = useState([]);

//   const closeForm = () => setActiveForm(null);

//   // Fonction appelée par "Confirmer le paiement"
//   const ajouterPaiement = (data) => {
//     setHistorique(prev => [...prev, data]);
//     closeForm();
//  };

// // ---------- FORMULAIRE MOBILE ----------
//   const FormMobile = () => {
//     const [fournisseur, setFournisseur] = useState("");
//     const [montant, setMontant] = useState("");
//     const [facture, setFacture] = useState("");

//     return (
//     <div className="flex flex-col gap-3 text-sm max-[768px]:text-xs md:text-sm">
//        <div className="flex gap-1">
//          <i className="fa-solid fa-phone iconeMobile"></i>
//          <p><span className="font-semibold">Paiement Mobile</span> <br /> Effectuer un paiement pour Mobile</p>
//        </div>
       

//         <div className="flex flex-col">
//           <label>Fournisseur</label>
//           <input type="text"  placeholder="Nom du fournisseur"  className="border rounded p-2" value={fournisseur}
//                  onChange={(e) => setFournisseur(e.target.value)}/>
//         </div>

//         <div className="flex flex-col">
//           <label>Montant</label>
//           <input type="text" placeholder="0.00" className="border rounded p-2" value={montant} 
//                  onChange={(e) => setMontant(e.target.value)}/>
//         </div>

//         <div className="flex flex-col">
//           <label>Numéro de facture</label>
//           <input type="text" placeholder="Ex: 123456789"  className="border rounded p-2" value={facture} 
//                  onChange={(e) => setFacture(e.target.value)}/>
//         </div>

//         <button className="text-white w-full py-2 rounded" style={{background:"#22c55e"}}
//                 onClick={() => ajouterPaiement({
//                     type: "Mobile",
//                     fournisseur,
//                     montant,
//                     facture,
//                     date: new Date().toLocaleDateString()
//                  })}>Confirmer le paiement
//         </button> 
//     </div>
//   );
// };

// // ---------- FORMULAIRE INTERNET ----------
//   const FormInternet = () => {
//     const [fournisseur, setFournisseur] = useState("");
//     const [montant, setMontant] = useState("");
//     const [facture, setFacture] = useState("");

//   return(
//     <div className="flex flex-col gap-3 text-sm max-[768px]:text-xs md:text-sm">
//        <div className="flex gap-1">
//         <i className="fa-solid fa-wifi iconeInternet"></i>
//          <p><span className="font-semibold">Internet</span> <br /> Paiement de facture</p>
//        </div>

//         <div className="flex flex-col">
//           <label>Fournisseur</label>
//           <input type="text" placeholder="Nom du fournisseur" className="border rounded p-2" value={fournisseur} 
//                  onChange={(e) => setFournisseur(e.target.value)} />
//         </div>

//         <div className="flex flex-col">
//           <label>Montant</label>
//           <input type="text" placeholder="0.00" className="border rounded p-2" value={montant} 
//                  onChange={(e) => setMontant(e.target.value)}/>
//         </div>

//         <div className="flex flex-col">
//           <label>Numéro de facture</label>
//           <input type="text" placeholder="Ex: 123456789" className="border rounded p-2" value={facture} 
//                  onChange={(e) => setFacture(e.target.value)}/>
//         </div>

//         <button className="text-white w-full py-2 rounded" style={{background:"#2563eb"}}
//                 onClick={() => ajouterPaiement({
//                     type: "Internet",
//                     fournisseur,
//                     montant,
//                     facture,
//                     date: new Date().toLocaleDateString(),
//                 })}>Confirmer le paiement
//         </button>
//     </div>
//   );
// };

// // ---------- FORMULAIRE ELECTRICITE ----------
//   const FormElectricite = () => {
//     const [fournisseur, setFournisseur] = useState("");
//     const [montant, setMontant] = useState("");
//     const [facture, setFacture] = useState("");

//    return(
//     <div className="flex flex-col gap-3 text-sm max-[768px]:text-xs md:text-sm">
//        <div className="flex gap-1">
//         <i className="fa-solid fa-bolt iconeElectricite"></i>
//          <p><span className="font-semibold">Électricité</span> <br /> Paiement de facture</p>
//        </div>

//         <div className="flex flex-col">
//           <label>Fournisseur</label>
//           <input type="text"  placeholder="Nom du fournisseur"  className="border rounded p-2" value={fournisseur} 
//                  onChange={(e) => setFournisseur(e.target.value)}/>
//         </div>

//         <div className="flex flex-col">
//           <label>Montant</label>
//           <input type="text"  placeholder="0.00" className="border rounded p-2" value={montant} 
//                  onChange={(e) => setMontant(e.target.value)}/>
//         </div>

//         <div className="flex flex-col">
//           <label>Numéro de facture</label>
//           <input type="text" placeholder="Ex: 123456789" className="border rounded p-2" value={facture} 
//                  onChange={(e) => setFacture(e.target.value)}/>
//         </div>
            
//         <button className="text-white w-full py-2 rounded" style={{background:"#f97316"}}
//                 onClick={() =>  ajouterPaiement({
//                         type: "Électricité",
//                         fournisseur,
//                         montant,
//                         facture,
//                         date: new Date().toLocaleDateString(),
//                      })}> Confirmer le paiement 
//         </button>
        
          
          
//     </div>
//   );
// };

// // ---------- FORMULAIRE EAU ----------
//   const FormEau = () => {
//     const [fournisseur, setFournisseur] = useState("");
//     const [montant, setMontant] = useState("");
//     const [facture, setFacture] = useState("");
  
//     return(
//     <div className="flex flex-col gap-3 text-sm max-[768px]:text-xs md:text-sm">
//         <div className="flex gap-1">
//           <i className="fa-solid fa-droplet iconeEau"></i>
//           <p><span className="font-semibold">Eau</span> <br />Paiement de facture</p>
//         </div>

//         <div className="flex flex-col">
//           <label>Fournisseur</label>
//           <input type="text" placeholder="Nom du fournisseur" className="border rounded p-2" value={fournisseur} 
//                  onChange={(e) => setFournisseur(e.target.value)}/> 
//         </div>

//         <div className="flex flex-col">
//           <label>Montant</label>
//           <input type="text" placeholder="0.00" className="border rounded p-2" value={montant} 
//                  onChange={(e) => setMontant(e.target.value)}/>
//         </div>

//         <div className="flex flex-col">
//           <label>Numéro de facture</label>
//           <input type="text" placeholder="Ex: 123456789" className="border rounded p-2" value={facture} 
//                  onChange={(e) => setFacture(e.target.value)}/>
//         </div>

//         <button className="text-white w-full py-2 rounded" style={{background:"#3b82f6"}}
//                 onClick={() => ajouterPaiement({
//                     type: "Eau",
//                     fournisseur,
//                     montant,
//                     facture,
//                     date: new Date().toLocaleDateString(),
//                  })}> Confirmer le paiement
//         </button>       
//     </div>
//   );
// };

//   return (
//     <div className="relative container mx-auto p-4 section1">

// {/* ------------ LES BOUTONS ----------- */}
//       <div className="flex flex-wrap justify-center gap-4  md:gap-6 md:justify-center  
//                       max-[768px]:grid  max-[768px]:grid-cols-2  max-[768px]:gap-3  max-[400px]:grid-cols-1">

//         <div className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton
//                         max-[768px]:max-w-full max-[768px]:p-4  md:max-w-[180px]"
//              onClick={() => setActiveForm("mobile")}>
//            <div className="icone1 text-3xl mb-2">
//              <i className="fa-solid fa-phone"></i></div>
//              <p>Mobile</p>
//         </div>

//         <div className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton
//                         md:max-w-[180px] max-[768px]:max-w-full max-[768px]:p-4"
//              onClick={() => setActiveForm("internet")}>
//            <div className="icone2 text-3xl mb-2">
//              <i className="fa-solid fa-wifi"></i></div>
//              <p>Internet</p>
//         </div>

//         <div className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton
//                         max-[768px]:max-w-full max-[768px]:p-4  md:max-w-[180px]"
//              onClick={() => setActiveForm("electricite")}>
//           <div className="icone3 text-3xl mb-2">
//              <i className="fa-solid fa-bolt"></i></div>
//              <p>Electricité</p>
//         </div>

//         <div className="bg-white rounded shadow p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton
//                         max-[768px]:max-w-full max-[768px]:p-4  md:max-w-[180px]"
//              onClick={() => setActiveForm("eau")} >
          
//         <div className="icone4 text-3xl mb-2">
//              <i className="fa-solid fa-droplet"></i></div>
//              <p>Eau</p>
//         </div>

//       </div>

// {/* ------------ ARRIÈRE-PLAN SOMBRE ----------- */}
//       {activeForm && ( 
//         <div  className="fixed top-0 left-0 w-full h-full  bg-opacity-60 backdrop-blur-sm z-10" onClick={closeForm}> </div>
//       )}

// {/* ------------ MODAL (FORMULAIRE AU CENTRE) ----------- */}
//       {activeForm && (
//         <div  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] 
//                          max-w-md bg-white rounded-xl shadow-lg z-20 p-6 md:p-8 max-[768px]:p-4">
//           <div className="text-right">
//              <button className="bg-red-500 text-white px-3 py-1 rounded"  onClick={closeForm}> X </button>
//           </div>

//           {/* Affichage dynamique du bon formulaire */}
//           {activeForm === "mobile" && <FormMobile />}
//           {activeForm === "internet" && <FormInternet />}
//           {activeForm === "electricite" && <FormElectricite />}
//           {activeForm === "eau" && <FormEau />}
//         </div>
//       )}
//       <FormPaiement historique={historique}/>
//     </div>
//   );
// };

// export default Section1;


















// import { useEffect, useState } from "react";
// import {
// FaMobileAlt,
// FaWifi,
// FaBolt,
// FaTint,
// FaUsers,
// FaHistory,
// } from "react-icons/fa";

// /* ================= SERVICES ================= */
// const services = [
// { id: "mobile", label: "Mobile", icon: <FaMobileAlt /> },
// { id: "internet", label: "Internet", icon: <FaWifi /> },
// { id: "electricite", label: "Électricité", icon: <FaBolt /> },
// { id: "eau", label: "Eau", icon: <FaTint /> },
// ];

// export default function Paiement() {
// const [activeTab, setActiveTab] = useState("beneficiaires");
// const [activeService, setActiveService] = useState(null);
// const [showPaymentModal, setShowPaymentModal] = useState(false);

// const [beneficiaires, setBeneficiaires] = useState([]);
// const [historique, setHistorique] = useState([]);

// const [paymentForm, setPaymentForm] = useState({
// montant: "",
// reference: "",
// });

// useEffect(() => {
// setBeneficiaires([
// {
// id: 1,
// nom: "Orange",
// type: "Mobile ••••7890",
// service: "mobile",
// },
// {
// id: 2,
// nom: "EDF",
// type: "Électricité ••••3456",
// service: "electricite",
// },
// ]);

// setHistorique([
// {
// id: 1,
// service: "Électricité",
// montant: "25 000 FCFA",
// date: "14/11/2025",
// statut: "Payé",
// },
// ]);
// }, []);

// const openPaymentFromBenef = (benef) => {
// const service = services.find((s) => s.id === benef.service);
// setActiveService(service);
// setShowPaymentModal(true);
// };

// const confirmPayment = () => {
// setHistorique((prev) => [
// {
// id: Date.now(),
// service: activeService.label,
// montant: paymentForm.montant,
// date: new Date().toLocaleDateString(),
// statut: "Payé",
// },
// ...prev,
// ]);
// setShowPaymentModal(false);
// setPaymentForm({ montant: "", reference: "" });
// };

// return (
// <div className="min-h-screen bg-[#f6f1e9] dark:bg-neutral-900 p-10">
// <div className="max-w-6xl mx-auto">

// <h1 className="text-3xl font-bold text-[#6b4f2c] dark:text-white mb-8">
// Paiements
// </h1>

// {/* SERVICES */}
// <div className="grid grid-cols-4 gap-6 mb-10">
// {services.map((s) => (
// <button
// key={s.id}
// onClick={() => {
// setActiveService(s);
// setShowPaymentModal(true);
// }}
// className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow text-center"
// >
// <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#e6c28b] text-white flex items-center justify-center text-xl">
// {s.icon}
// </div>
// <p className="font-medium text-[#6b4f2c] dark:text-white">
// {s.label}
// </p>
// </button>
// ))}
// </div>

// {/* TABS */}
// <div className="flex justify-center mb-6">
// <div className="bg-white dark:bg-neutral-800 rounded-full p-1 shadow flex gap-1">
// <button
// onClick={() => setActiveTab("beneficiaires")}
// className={`px-6 py-2 rounded-full flex items-center gap-2 ${
// activeTab === "beneficiaires"
// ? "bg-[#e6c28b] text-white"
// : "text-gray-500"
// }`}
// >
// <FaUsers /> Bénéficiaires
// </button>
// <button
// onClick={() => setActiveTab("historique")}
// className={`px-6 py-2 rounded-full flex items-center gap-2 ${
// activeTab === "historique"
// ? "bg-[#e6c28b] text-white"
// : "text-gray-500"
// }`}
// >
// <FaHistory /> Historique
// </button>
// </div>
// </div>

// {/* CONTENT */}
// <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6">

// {/* BENEFICIAIRES */}
// {activeTab === "beneficiaires" &&
// beneficiaires.map((b) => {
// const service = services.find((s) => s.id === b.service);
// return (
// <div
// key={b.id}
// className="flex items-center justify-between bg-[#faf7f2] dark:bg-neutral-700 p-4 rounded-xl mb-3"
// >
// <div className="flex items-center gap-4">
// <div className="w-10 h-10 rounded-full bg-[#e6c28b] text-white flex items-center justify-center">
// {service.icon}
// </div>
// <div>
// <p className="font-medium text-[#6b4f2c] dark:text-white">
// {b.nom}
// </p>
// <p className="text-sm text-gray-500">{b.type}</p>
// </div>
// </div>

// <button
// onClick={() => openPaymentFromBenef(b)}
// className="bg-[#5b6cff] text-white px-4 py-2 rounded-lg"
// >
// Payer
// </button>
// </div>
// );
// })}

// {/* HISTORIQUE */}
// {activeTab === "historique" && (
// <table className="w-full table-fixed text-center">
// <thead className="text-gray-500">
// <tr>
// <th className="text-left">Service</th>
// <th>Montant</th>
// <th>Date</th>
// <th>Statut</th>
// </tr>
// </thead>
// <tbody>
// {historique.map((h) => (
// <tr key={h.id} className="border-t">
// <td className="text-left py-3">{h.service}</td>
// <td>{h.montant}</td>
// <td>{h.date}</td>
// <td>
// <span className="bg-[#e6c28b] text-white px-3 py-1 rounded-lg text-sm">
// {h.statut}
// </span>
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// )}
// </div>
// </div>

// {/* MODAL PAIEMENT */}
// {showPaymentModal && (
// <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md">
// <div className="flex items-center gap-3 mb-4">
// <div className="w-10 h-10 rounded-full bg-[#e6c28b] text-white flex items-center justify-center">
// {activeService.icon}
// </div>
// <h3 className="font-semibold text-[#6b4f2c] dark:text-white">
// Paiement {activeService.label}
// </h3>
// </div>

// <input
// placeholder="Montant"
// className="w-full mb-3 p-3 rounded-xl border"
// value={paymentForm.montant}
// onChange={(e) =>
// setPaymentForm({ ...paymentForm, montant: e.target.value })
// }
// />
// <input
// placeholder="Référence / Facture"
// className="w-full mb-4 p-3 rounded-xl border"
// value={paymentForm.reference}
// onChange={(e) =>
// setPaymentForm({ ...paymentForm, reference: e.target.value })
// }
// />

// <div className="flex justify-center gap-4">
// <button onClick={() => setShowPaymentModal(false)}>
// Annuler
// </button>
// <button
// onClick={confirmPayment}
// className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl"
// >
// Confirmer le paiement
// </button>
// </div>
// </div>
// </div>
// )}
// </div>
// );
// }





// // // src/pages/Section1.jsx
// // import { useState } from "react";
// // import FormPaiement from "../components/FormPaiement";

// // const Section1 = () => {
// // const [activeForm, setActiveForm] = useState(null);
// // const [historique, setHistorique] = useState([]);

// // const closeForm = () => setActiveForm(null);

// // // Fonction appelée par "Confirmer le paiement"
// // const ajouterPaiement = (data) => {
// // setHistorique((prev) => [...prev, data]);
// // closeForm();
// // };

// // // ---------- FORMULAIRE MOBILE ----------
// // const FormMobile = () => {
// // const [fournisseur, setFournisseur] = useState("");
// // const [montant, setMontant] = useState("");
// // const [facture, setFacture] = useState("");

// // return (
// // <div className="flex flex-col gap-3 text-sm md:text-sm">
// // <div className="flex gap-2 items-center">
// // <i className="fa-solid fa-phone iconeMobile text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
// // <p className="text-sm dark:text-[#f1e8dc]">
// // <span className="font-semibold">Paiement Mobile</span>
// // <br />
// // Effectuer un paiement pour Mobile
// // </p>
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
// // <input
// // type="text"
// // placeholder="Nom du fournisseur"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={fournisseur}
// // onChange={(e) => setFournisseur(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
// // <input
// // type="text"
// // placeholder="0.00"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={montant}
// // onChange={(e) => setMontant(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
// // <input
// // type="text"
// // placeholder="Ex: 123456789"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={facture}
// // onChange={(e) => setFacture(e.target.value)}
// // />
// // </div>

// // <button
// // onClick={() =>
// // ajouterPaiement({
// // type: "Mobile",
// // fournisseur,
// // montant,
// // facture,
// // date: new Date().toLocaleDateString(),
// // })
// // }
// // className="w-full py-2 rounded text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition"
// // >
// // Confirmer le paiement
// // </button>
// // </div>
// // );
// // };

// // // ---------- FORMULAIRE INTERNET ----------
// // const FormInternet = () => {
// // const [fournisseur, setFournisseur] = useState("");
// // const [montant, setMontant] = useState("");
// // const [facture, setFacture] = useState("");

// // return (
// // <div className="flex flex-col gap-3 text-sm md:text-sm">
// // <div className="flex gap-2 items-center">
// // <i className="fa-solid fa-wifi iconeInternet text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
// // <p className="text-sm dark:text-[#f1e8dc]">
// // <span className="font-semibold">Internet</span>
// // <br />
// // Paiement de facture
// // </p>
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
// // <input
// // type="text"
// // placeholder="Nom du fournisseur"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={fournisseur}
// // onChange={(e) => setFournisseur(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
// // <input
// // type="text"
// // placeholder="0.00"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={montant}
// // onChange={(e) => setMontant(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
// // <input
// // type="text"
// // placeholder="Ex: 123456789"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={facture}
// // onChange={(e) => setFacture(e.target.value)}
// // />
// // </div>

// // <button
// // onClick={() =>
// // ajouterPaiement({
// // type: "Internet",
// // fournisseur,
// // montant,
// // facture,
// // date: new Date().toLocaleDateString(),
// // })
// // }
// // className="w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
// // >
// // Confirmer le paiement
// // </button>
// // </div>
// // );
// // };

// // // ---------- FORMULAIRE ELECTRICITE ----------
// // const FormElectricite = () => {
// // const [fournisseur, setFournisseur] = useState("");
// // const [montant, setMontant] = useState("");
// // const [facture, setFacture] = useState("");

// // return (
// // <div className="flex flex-col gap-3 text-sm md:text-sm">
// // <div className="flex gap-2 items-center">
// // <i className="fa-solid fa-bolt iconeElectricite text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
// // <p className="text-sm dark:text-[#f1e8dc]">
// // <span className="font-semibold">Électricité</span>
// // <br />
// // Paiement de facture
// // </p>
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
// // <input
// // type="text"
// // placeholder="Nom du fournisseur"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={fournisseur}
// // onChange={(e) => setFournisseur(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
// // <input
// // type="text"
// // placeholder="0.00"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={montant}
// // onChange={(e) => setMontant(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
// // <input
// // type="text"
// // placeholder="Ex: 123456789"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={facture}
// // onChange={(e) => setFacture(e.target.value)}
// // />
// // </div>

// // <button
// // onClick={() =>
// // ajouterPaiement({
// // type: "Électricité",
// // fournisseur,
// // montant,
// // facture,
// // date: new Date().toLocaleDateString(),
// // })
// // }
// // className="w-full py-2 rounded text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition"
// // >
// // Confirmer le paiement
// // </button>
// // </div>
// // );
// // };

// // // ---------- FORMULAIRE EAU ----------
// // const FormEau = () => {
// // const [fournisseur, setFournisseur] = useState("");
// // const [montant, setMontant] = useState("");
// // const [facture, setFacture] = useState("");

// // return (
// // <div className="flex flex-col gap-3 text-sm md:text-sm">
// // <div className="flex gap-2 items-center">
// // <i className="fa-solid fa-droplet iconeEau text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
// // <p className="text-sm dark:text-[#f1e8dc]">
// // <span className="font-semibold">Eau</span>
// // <br />
// // Paiement de facture
// // </p>
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
// // <input
// // type="text"
// // placeholder="Nom du fournisseur"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={fournisseur}
// // onChange={(e) => setFournisseur(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
// // <input
// // type="text"
// // placeholder="0.00"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={montant}
// // onChange={(e) => setMontant(e.target.value)}
// // />
// // </div>

// // <div className="flex flex-col">
// // <label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
// // <input
// // type="text"
// // placeholder="Ex: 123456789"
// // className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
// // value={facture}
// // onChange={(e) => setFacture(e.target.value)}
// // />
// // </div>

// // <button
// // onClick={() =>
// // ajouterPaiement({
// // type: "Eau",
// // fournisseur,
// // montant,
// // facture,
// // date: new Date().toLocaleDateString(),
// // })
// // }
// // className="w-full py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition"
// // >
// // Confirmer le paiement
// // </button>
// // </div>
// // );
// // };

// // return (
// // <div className="relative container mx-auto p-4 section1 text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
// // {/* ------------ LES BOUTONS ----------- */}
// // <div className="flex flex-wrap justify-center gap-4 md:gap-6 md:justify-center
// // max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-3 max-[400px]:grid-cols-1">
// // <div
// // role="button"
// // tabIndex={0}
// // onClick={() => setActiveForm("mobile")}
// // className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton max-[768px]:max-w-full max-[768px]:p-4 md:max-w-[180px]
// // bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
// // >
// // <div className="icone1 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
// // <i className="fa-solid fa-phone"></i>
// // </div>
// // <p className="dark:text-[#f1e8dc]">Mobile</p>
// // </div>

// // <div
// // role="button"
// // tabIndex={0}
// // onClick={() => setActiveForm("internet")}
// // className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton md:max-w-[180px] max-[768px]:max-w-full max-[768px]:p-4
// // bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
// // >
// // <div className="icone2 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
// // <i className="fa-solid fa-wifi"></i>
// // </div>
// // <p className="dark:text-[#f1e8dc]">Internet</p>
// // </div>

// // <div
// // role="button"
// // tabIndex={0}
// // onClick={() => setActiveForm("electricite")}
// // className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton max-[768px]:max-w-full max-[768px]:p-4 md:max-w-[180px]
// // bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
// // >
// // <div className="icone3 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
// // <i className="fa-solid fa-bolt"></i>
// // </div>
// // <p className="dark:text-[#f1e8dc]">Electricité</p>
// // </div>

// // <div
// // role="button"
// // tabIndex={0}
// // onClick={() => setActiveForm("eau")}
// // className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton max-[768px]:max-w-full max-[768px]:p-4 md:max-w-[180px]
// // bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
// // >
// // <div className="icone4 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
// // <i className="fa-solid fa-droplet"></i>
// // </div>
// // <p className="dark:text-[#f1e8dc]">Eau</p>
// // </div>
// // </div>

// // {/* ------------ ARRIÈRE-PLAN SOMBRE ----------- */}
// // {activeForm && (
// // <div
// // className="fixed top-0 left-0 w-full h-full bg-black/60 dark:bg-black/60 backdrop-blur-sm z-10"
// // onClick={closeForm}
// // />
// // )}

// // {/* ------------ MODAL (FORMULAIRE AU CENTRE) ----------- */}
// // {activeForm && (
// // <div
// // className="fixed inset-0 z-20 flex items-center justify-center p-4"
// // aria-modal="true"
// // role="dialog"
// // >
// // <div
// // onClick={(e) => e.stopPropagation()} // prevent overlay click from closing when clicking inside modal
// // className="w-[90%] max-w-md bg-white dark:bg-[#1b1b1b] rounded-xl shadow-lg p-6 md:p-8 transition"
// // >
// // <div className="text-right">
// // <button
// // className="bg-red-500 text-white px-3 py-1 rounded"
// // onClick={closeForm}
// // >
// // X
// // </button>
// // </div>

// // {/* Affichage dynamique du bon formulaire */}
// // <div className="mt-2">
// // {activeForm === "mobile" && <FormMobile />}
// // {activeForm === "internet" && <FormInternet />}
// // {activeForm === "electricite" && <FormElectricite />}
// // {activeForm === "eau" && <FormEau />}
// // </div>
// // </div>
// // </div>
// // )}

// // <FormPaiement historique={historique} />
// // </div>
// // );
// // };

// // export default Section1;



import { useEffect, useState } from "react";
import {
FaMobileAlt,
FaWifi,
FaBolt,
FaTint,
FaUsers,
FaHistory,
} from "react-icons/fa";

/* ================= SERVICES ================= */
const services = [
{ id: "mobile", label: "Mobile", icon: <FaMobileAlt /> },
{ id: "internet", label: "Internet", icon: <FaWifi /> },
{ id: "electricite", label: "Électricité", icon: <FaBolt /> },
{ id: "eau", label: "Eau", icon: <FaTint /> },
];

export default function Paiement() {
const [activeTab, setActiveTab] = useState("beneficiaires");
const [activeService, setActiveService] = useState(null);
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [showNewBenefModal, setShowNewBenefModal] = useState(false);

const [beneficiaires, setBeneficiaires] = useState([]);
const [historique, setHistorique] = useState([]);

const [paymentForm, setPaymentForm] = useState({
montant: "",
reference: "",
});

const [newBenefForm, setNewBenefForm] = useState({
nom: "",
type: "",
service: "",
});

useEffect(() => {
setBeneficiaires([
{ id: 1, nom: "Orange", type: "Mobile ••••7890", service: "mobile" },
{ id: 2, nom: "EDF", type: "Électricité ••••3456", service: "electricite" },
]);

setHistorique([
{ id: 1, service: "Électricité", montant: "25 000 FCFA", date: "14/11/2025", statut: "Payé" },
]);
}, []);

const openPaymentFromBenef = (benef) => {
const service = services.find((s) => s.id === benef.service);
setActiveService(service);
setShowPaymentModal(true);
};

const confirmPayment = () => {
setHistorique((prev) => [
{ id: Date.now(), service: activeService.label, montant: paymentForm.montant, date: new Date().toLocaleDateString(), statut: "Payé" },
...prev,
]);
setShowPaymentModal(false);
setPaymentForm({ montant: "", reference: "" });
};

const addNewBeneficiaire = () => {
if (!newBenefForm.nom || !newBenefForm.type || !newBenefForm.service) return;
setBeneficiaires((prev) => [
{ id: Date.now(), ...newBenefForm },
...prev,
]);
setShowNewBenefModal(false);
setNewBenefForm({ nom: "", type: "", service: "" });
};

return (
<div className="min-h-screen bg-[#f6f1e9] dark:bg-neutral-900 p-10">
<div className="max-w-6xl mx-auto">

{/* TITRE + SLOGAN */}
{/* <h1 className="text-3xl font-bold text-[#6b4f2c] dark:text-white mb-2">Paiements</h1>
<p className="text-center text-beige-600 mb-8">Effectuez vos paiements facilement et en toute sécurité</p> */}
 <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 dark:text-[#f1e8dc]">Paiements</h2>
        <p className="text-[#8f7e6b] dark:text-[#d6c5a9] text-lg">Effectuez vos paiements facilement et en toute sécurité</p>
      </div>

{/* SERVICES */}
<div className="grid grid-cols-4 gap-6 mb-10">
{services.map((s) => (
<button
key={s.id}
onClick={() => {
setActiveService(s);
setShowPaymentModal(true);
}}
className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow text-center"
>
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white flex items-center justify-center text-xl">{s.icon}</div>
<p className="font-medium text-[#6b4f2c] dark:text-white">{s.label}</p>
</button>
))}
</div>

{/* TABS */}
<div className="flex justify-center mb-8">
<div className="bg-white dark:bg-neutral-800 rounded-full p-2 shadow flex gap-1">
<button
onClick={() => setActiveTab("beneficiaires")}
className={`px-6 py-2 rounded-full flex items-center gap-2 ${
activeTab === "beneficiaires" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white" : "text-beig-500"
}`}
>
<FaUsers /> Bénéficiaires
</button>
<button
onClick={() => setActiveTab("historique")}
className={`px-6 py-2 rounded-full flex items-center gap-2 ${
activeTab === "historique" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b]  text-beige-700 text-white" : "text-beige"
}`}
>
<FaHistory /> Historique
</button>
</div>
</div>

{/* CONTENT */}
<div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6">

{/* BENEFICIAIRES */}
{activeTab === "beneficiaires" && (
<>
{/* BOUTON NOUVEAU BENEFICIAIRE */}
<div className="flex justify-end mb-4">
<button
onClick={() => setShowNewBenefModal(true)}
className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white px-4 py-2 rounded-xl"
>
Nouveau bénéficiaire
</button>
</div>

{beneficiaires.map((b) => {
const service = services.find((s) => s.id === b.service);
return (
<div key={b.id} className="flex items-center justify-between bg-[#faf7f2] dark:bg-neutral-700 p-4 rounded-xl mb-3">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-[#6b4f2c] text-white flex items-center justify-center">{service.icon}</div>
<div>
<p className="font-medium text-[#6b4f2c] dark:text-white">{b.nom}</p>
<p className="text-sm text-gray-500">{b.type}</p>
</div>
</div>
<button
onClick={() => openPaymentFromBenef(b)}
className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white px-4 py-2 rounded-xl"
>
Payer
</button>
</div>
);
})}
</>
)}

{/* HISTORIQUE */}
{activeTab === "historique" && (
<table className="w-full table-fixed text-center">
<thead className="text-gray-500">
<tr>
<th className="text-left">Service</th>
<th>Montant</th>
<th>Date</th>
<th>Statut</th>
</tr>
</thead>
<tbody>
{historique.map((h) => (
<tr key={h.id} className="border-t">
<td className="text-left py-3">{h.service}</td>
<td>{h.montant}</td>
<td>{h.date}</td>
<td>
<span className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b]  text-white px-3 py-1 rounded-lg text-sm">{h.statut}</span>
</td>
</tr>
))}
</tbody>
</table>
)}
</div>
</div>

{/* MODAL PAIEMENT */}
{showPaymentModal && (
<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
<div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-[#6b5a49] text-white flex items-center justify-center">{activeService.icon}</div>
<h3 className="font-semibold text-[#6b4f2c] dark:text-white">Paiement {activeService.label}</h3>
</div>
<input
placeholder="Montant"
className="w-full mb-3 p-3 rounded-xl border"
value={paymentForm.montant}
onChange={(e) => setPaymentForm({ ...paymentForm, montant: e.target.value })}
/>
<input
placeholder="Référence / Facture"
className="w-full mb-4 p-3 rounded-xl border"
value={paymentForm.reference}
onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
/>
<div className="flex justify-center gap-4">
<button onClick={() => setShowPaymentModal(false)}>Annuler</button>
<button onClick={confirmPayment} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">
Confirmer le paiement
</button>
</div>
</div>
</div>
)}

{/* MODAL NOUVEAU BENEFICIAIRE */}
{showNewBenefModal && (
<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
<div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md">
<h3 className="font-semibold text-[#6b4f2c] dark:text-white mb-4">Nouveau bénéficiaire</h3>
<input
placeholder="Nom"
className="w-full mb-3 p-3 rounded-xl border"
value={newBenefForm.nom}
onChange={(e) => setNewBenefForm({ ...newBenefForm, nom: e.target.value })}
/>
<input
placeholder="Type (ex: Mobile ••••1234)"
className="w-full mb-3 p-3 rounded-xl border-[#6b5a49]"
value={newBenefForm.type}
onChange={(e) => setNewBenefForm({ ...newBenefForm, type: e.target.value })}
/>
<select
className="w-full mb-4 p-3 rounded-xl border"
value={newBenefForm.service}
onChange={(e) => setNewBenefForm({ ...newBenefForm, service: e.target.value })}
>
<option value="">Sélectionner un service</option>
{services.map((s) => (
<option key={s.id} value={s.id}>{s.label}</option>
))}
</select>
<div className="flex justify-center gap-4">
<button onClick={() => setShowNewBenefModal(false)}>Annuler</button>
<button onClick={addNewBeneficiaire} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">Ajouter</button>
</div>
</div>
</div>
)}
</div>
);
}
