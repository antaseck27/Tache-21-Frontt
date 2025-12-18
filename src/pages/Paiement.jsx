
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
// const [showNewBenefModal, setShowNewBenefModal] = useState(false);

// const [beneficiaires, setBeneficiaires] = useState([]);
// const [historique, setHistorique] = useState([]);

// const [paymentForm, setPaymentForm] = useState({
// montant: "",
// reference: "",
// });

// const [newBenefForm, setNewBenefForm] = useState({
// nom: "",
// type: "",
// service: "",
// });

// useEffect(() => {
// setBeneficiaires([
// { id: 1, nom: "Orange", type: "Mobile ••••7890", service: "mobile" },
// { id: 2, nom: "EDF", type: "Électricité ••••3456", service: "electricite" },
// ]);

// setHistorique([
// { id: 1, service: "Électricité", montant: "25 000 FCFA", date: "14/11/2025", statut: "Payé" },
// ]);
// }, []);

// const openPaymentFromBenef = (benef) => {
// const service = services.find((s) => s.id === benef.service);
// setActiveService(service);
// setShowPaymentModal(true);
// };

// const confirmPayment = () => {
// setHistorique((prev) => [
// { id: Date.now(), service: activeService.label, montant: paymentForm.montant, date: new Date().toLocaleDateString(), statut: "Payé" },
// ...prev,
// ]);
// setShowPaymentModal(false);
// setPaymentForm({ montant: "", reference: "" });
// };

// const addNewBeneficiaire = () => {
// if (!newBenefForm.nom || !newBenefForm.type || !newBenefForm.service) return;
// setBeneficiaires((prev) => [
// { id: Date.now(), ...newBenefForm },
// ...prev,
// ]);
// setShowNewBenefModal(false);
// setNewBenefForm({ nom: "", type: "", service: "" });
// };

// return (
// <div className="min-h-screen bg-[#f6f1e9] dark:bg-neutral-900 p-10">
// <div className="max-w-6xl mx-auto">

// {/* TITRE + SLOGAN */}
// {/* <h1 className="text-3xl font-bold text-[#6b4f2c] dark:text-white mb-2">Paiements</h1>
// <p className="text-center text-beige-600 mb-8">Effectuez vos paiements facilement et en toute sécurité</p> */}
//  <div className="max-w-6xl mx-auto text-center mb-8">
//         <h2 className="text-3xl font-bold mb-2 dark:text-[#f1e8dc]">Paiements</h2>
//         <p className="text-[#8f7e6b] dark:text-[#d6c5a9] text-lg">Effectuez vos paiements facilement et en toute sécurité</p>
//       </div>

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
// <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white flex items-center justify-center text-xl">{s.icon}</div>
// <p className="font-medium text-[#6b4f2c] dark:text-white">{s.label}</p>
// </button>
// ))}
// </div>

// {/* TABS */}
// <div className="flex justify-center mb-8">
// <div className="bg-white dark:bg-neutral-800 rounded-full p-2 shadow flex gap-1">
// <button
// onClick={() => setActiveTab("beneficiaires")}
// className={`px-6 py-2 rounded-full flex items-center gap-2 ${
// activeTab === "beneficiaires" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white" : "text-beig-500"
// }`}
// >
// <FaUsers /> Bénéficiaires
// </button>
// <button
// onClick={() => setActiveTab("historique")}
// className={`px-6 py-2 rounded-full flex items-center gap-2 ${
// activeTab === "historique" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b]  text-beige-700 text-white" : "text-beige"
// }`}
// >
// <FaHistory /> Historique
// </button>
// </div>
// </div>

// {/* CONTENT */}
// <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6">

// {/* BENEFICIAIRES */}
// {activeTab === "beneficiaires" && (
// <>
// {/* BOUTON NOUVEAU BENEFICIAIRE */}
// <div className="flex justify-end mb-4">
// <button
// onClick={() => setShowNewBenefModal(true)}
// className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white px-4 py-2 rounded-xl"
// >
// Nouveau bénéficiaire
// </button>
// </div>

// {beneficiaires.map((b) => {
// const service = services.find((s) => s.id === b.service);
// return (
// <div key={b.id} className="flex items-center justify-between bg-[#faf7f2] dark:bg-neutral-700 p-4 rounded-xl mb-3">
// <div className="flex items-center gap-4">
// <div className="w-10 h-10 rounded-full bg-[#6b4f2c] text-white flex items-center justify-center">{service.icon}</div>
// <div>
// <p className="font-medium text-[#6b4f2c] dark:text-white">{b.nom}</p>
// <p className="text-sm text-gray-500">{b.type}</p>
// </div>
// </div>
// <button
// onClick={() => openPaymentFromBenef(b)}
// className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white px-4 py-2 rounded-xl"
// >
// Payer
// </button>
// </div>
// );
// })}
// </>
// )}

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
// <span className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b]  text-white px-3 py-1 rounded-lg text-sm">{h.statut}</span>
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
// <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md">
// <div className="flex items-center gap-3 mb-4">
// <div className="w-10 h-10 rounded-full bg-[#6b5a49] text-white flex items-center justify-center">{activeService.icon}</div>
// <h3 className="font-semibold text-[#6b4f2c] dark:text-white">Paiement {activeService.label}</h3>
// </div>
// <input
// placeholder="Montant"
// className="w-full mb-3 p-3 rounded-xl border"
// value={paymentForm.montant}
// onChange={(e) => setPaymentForm({ ...paymentForm, montant: e.target.value })}
// />
// <input
// placeholder="Référence / Facture"
// className="w-full mb-4 p-3 rounded-xl border"
// value={paymentForm.reference}
// onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
// />
// <div className="flex justify-center gap-4">
// <button onClick={() => setShowPaymentModal(false)}>Annuler</button>
// <button onClick={confirmPayment} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">
// Confirmer le paiement
// </button>
// </div>
// </div>
// </div>
// )}

// {/* MODAL NOUVEAU BENEFICIAIRE */}
// {showNewBenefModal && (
// <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md">
// <h3 className="font-semibold text-[#6b4f2c] dark:text-white mb-4">Nouveau bénéficiaire</h3>
// <input
// placeholder="Nom"
// className="w-full mb-3 p-3 rounded-xl border"
// value={newBenefForm.nom}
// onChange={(e) => setNewBenefForm({ ...newBenefForm, nom: e.target.value })}
// />
// <input
// placeholder="Type (ex: Mobile ••••1234)"
// className="w-full mb-3 p-3 rounded-xl border-[#6b5a49]"
// value={newBenefForm.type}
// onChange={(e) => setNewBenefForm({ ...newBenefForm, type: e.target.value })}
// />
// <select
// className="w-full mb-4 p-3 rounded-xl border"
// value={newBenefForm.service}
// onChange={(e) => setNewBenefForm({ ...newBenefForm, service: e.target.value })}
// >
// <option value="">Sélectionner un service</option>
// {services.map((s) => (
// <option key={s.id} value={s.id}>{s.label}</option>
// ))}
// </select>
// <div className="flex justify-center gap-4">
// <button onClick={() => setShowNewBenefModal(false)}>Annuler</button>
// <button onClick={addNewBeneficiaire} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">Ajouter</button>
// </div>
// </div>
// </div>
// )}
// </div>
// );
// }











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
    <div className="min-h-screen bg-[#f6f1e9] dark:bg-neutral-900 p-4 sm:p-10">
      <div className="max-w-6xl mx-auto">

        {/* TITRE + SLOGAN */}
        <div className="text-center mb-8 px-2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 dark:text-[#f1e8dc]">Paiements</h2>
          <p className="text-[#8f7e6b] dark:text-[#d6c5a9] text-base sm:text-lg">Effectuez vos paiements facilement et en toute sécurité</p>
        </div>

        {/* SERVICES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
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
        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-2 sm:gap-4">
          <div className="bg-white dark:bg-neutral-800 rounded-full p-2 shadow flex gap-1 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab("beneficiaires")}
              className={`px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 ${
                activeTab === "beneficiaires" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white" : "text-beige"
              }`}
            >
              <FaUsers /> Bénéficiaires
            </button>
            <button
              onClick={() => setActiveTab("historique")}
              className={`px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 ${
                activeTab === "historique" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-beige-700 text-white" : "text-beige"
              }`}
            >
              <FaHistory /> Historique
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4 sm:p-6 overflow-x-auto">

          {/* BENEFICIAIRES */}
          {activeTab === "beneficiaires" && (
            <>
              <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
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
                  <div key={b.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#faf7f2] dark:bg-neutral-700 p-4 rounded-xl mb-3 gap-3">
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
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-center min-w-[500px]">
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
                        <span className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white px-3 py-1 rounded-lg text-sm">{h.statut}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* MODAL PAIEMENT */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md sm:max-w-lg">
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md sm:max-w-lg">
            <h3 className="font-semibold text-[#6b4f2c] dark:text-white mb-4">Nouveau bénéficiaire</h3>
            <input
              placeholder="Nom"
              className="w-full mb-3 p-3 rounded-xl border"
              value={newBenefForm.nom}
              onChange={(e) => setNewBenefForm({ ...newBenefForm, nom: e.target.value })}
            />
            <input
              placeholder="Type (ex: Mobile ••••1234)"
              className="w-full mb-3 p-3 rounded-xl border"
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => setShowNewBenefModal(false)}>Annuler</button>
              <button onClick={addNewBeneficiaire} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
