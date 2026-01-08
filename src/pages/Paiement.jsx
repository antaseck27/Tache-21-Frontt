


import { useEffect, useState } from "react";
import {
  FaMobileAlt,
  FaWifi,
  FaBolt,
  FaTint,
  FaUsers,
  FaHistory,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const [paymentForm, setPaymentForm] = useState({ montant: "", reference: "" , meterNumber: "",});
  const [newBenefForm, setNewBenefForm] = useState({ nom: "", type: "", service: "", reference: "" });

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  /* ================= HISTORIQUE ================= */
  const fetchHistorique = async (page = 1) => {
    try {
      const res = await fetch(`${API}/api/payments?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erreur récupération historique");
      const data = await res.json();

      setHistorique(
        data.payments.map((p) => ({
          id: p._id,
          service: p.category,
          montant: `${p.amount} FCFA`,
          date: new Date(p.createdAt).toLocaleDateString(),
          statut: "Payé",
        }))
      );
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de récupérer l'historique");
    }
  };

  useEffect(() => {
    fetchHistorique(currentPage);
  }, [currentPage]);

  /* ================= BÉNÉFICIAIRES ================= */
  const fetchBeneficiaires = async () => {
    try {
      const res = await fetch(`${API}/api/beneficiaires`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur récupération bénéficiaires");
      const data = await res.json();
      setBeneficiaires(data);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de récupérer les bénéficiaires");
    }
  };

  useEffect(() => {
    fetchBeneficiaires();
  }, []);

  const openPaymentFromBenef = (benef) => {
    const service = services.find((s) => s.id === benef.service);
    if (!service) return;
    setActiveService(service);
    setPaymentForm({ montant: "", reference: benef.reference || "" });
    setShowPaymentModal(true);
  };

  /* ================= CONFIRMER PAIEMENT ================= */
  const confirmPayment = async () => {
    if (!paymentForm.montant || !activeService) {
      toast.error("Veuillez saisir un montant");
      return;
    }

    try {
      const res = await fetch(`${API}/api/payments/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify({
  amount: Number(paymentForm.montant),
  service: activeService.label,
  invoiceNumber: paymentForm.reference, 
  meterNumber: paymentForm.meterNumber,
}),

      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Erreur paiement");
        return;
      }

      toast.success("Paiement réussi !");
      await fetchHistorique(); // rafraîchir historique

      // Réinitialiser
      setPaymentForm({ montant: "", reference: "",meterNumber: ""  });
      setActiveService(null);
      setShowPaymentModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur paiement, réessayez");
    }
  };

  /* ================= AJOUT BÉNÉFICIAIRE ================= */
  const addNewBeneficiaire = async () => {
    if (!newBenefForm.nom || !newBenefForm.service) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      const res = await fetch(`${API}/api/beneficiaires`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBenefForm),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Erreur ajout bénéficiaire");
        return;
      }

      setBeneficiaires((prev) => [data, ...prev]);
      toast.success("Bénéficiaire ajouté");

      setNewBenefForm({ nom: "", type: "", service: "", reference: "" });
      setShowNewBenefModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen collectMode dark:bg-neutral-900 p-4 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* TITRE */}
        <div className="text-center mb-8 px-2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 dark:text-[#f1e8dc]">Paiements</h2>
          <p className="text-[#8f7e6b] dark:text-[#d6c5a9] text-base sm:text-lg">
            Effectuez vos paiements facilement et en toute sécurité
          </p>
        </div>

        {/* SERVICES */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveService(s); setShowPaymentModal(true); }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 rounded-xl shadow text-center"
            >
              <div className="w-14 h-14 rounded-xl mx-auto mb-3 rounded-full bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white flex items-center justify-center text-xl">{s.icon}</div>
              <p className="font-medium text-[#6b4f2c] dark:text-white">{s.label}</p>
            </button>
          ))}
        </div>

        {/* TABS */}
        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-2 sm:gap-4">
          <div className="bg-white rounded-xl dark:bg-neutral-800 rounded-full p-2 shadow flex gap-1 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab("beneficiaires")}
              className={`px-4 sm:px-6 py-2 rounded-full rounded-xl flex  items-center gap-2 ${activeTab === "beneficiaires" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white" : "text-beige"}`}
            >
              <FaUsers /> Bénéficiaires
            </button>
            <button
              onClick={() => setActiveTab("historique")}
              className={`px-4 sm:px-6 py-2 rounded-full rounded-xl flex items-center gap-2 ${activeTab === "historique" ? "bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white" : "text-beige"}`}
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
              <div className="flex justify-end mb-4">
                <button onClick={() => setShowNewBenefModal(true)} className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white px-4 py-2 rounded-xl">
                  Nouveau bénéficiaire
                </button>
              </div>

              {beneficiaires.map((b) => {
                const service = services.find((s) => s.id === b.service);
                return (
                  <div key={b._id} className="flex justify-between items-center bg-[#faf7f2] dark:bg-neutral-700 p-4 rounded-xl mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl   rounded-full bg-[#6b4f2c] text-white flex items-center justify-center">{service.icon}</div>
                      <div>
                        <p className=" rounded-xl font-medium text-[#6b4f2c] dark:text-white">{b.nom}</p>
                        <p className=" rounded-xl text-sm text-gray-500">{b.type}</p>
                      </div>
                    </div>
                    <button onClick={() => openPaymentFromBenef(b)} className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white px-4 py-2 rounded-xl">Payer</button>
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
                      <td><span className="bg-gradient-to-br from-[#b9a896] to-[#8f7e6b] text-white px-3 py-1 rounded-lg text-sm">{h.statut}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 rounded-xl">Précédent</button>
                <span className="text-sm text-gray-600">Page {currentPage} / {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 rounded-xl">Suivant</button>
              </div>
            </div>
          )}
        </div>

        {/* MODAL PAIEMENT */}
        {showPaymentModal && (
          <div className="fixed  inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md sm:max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6b5a49] flex items-center justify-center">{activeService.icon}</div>
                <h3 className="font-semibold text-[#6b5a49] dark:text-white">Paiement {activeService.label}</h3>
              </div>
              <input placeholder="Montant" className="w-full mb-3 p-3 rounded-xl border" value={paymentForm.montant} onChange={(e) => setPaymentForm({ ...paymentForm, montant: e.target.value })} />
              <input placeholder="Référence / Facture" className="w-full mb-4 p-3 rounded-xl border" value={paymentForm.reference} onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })} />
              <input
  placeholder="Numéro de compteur"
  className="w-full mb-4 p-3 rounded-xl border"
  value={paymentForm.meterNumber}
  onChange={(e) => setPaymentForm({ ...paymentForm, meterNumber: e.target.value })}
/>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setShowPaymentModal(false)}>Annuler</button>
                <button type="button" onClick={confirmPayment} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">Confirmer le paiement</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL NOUVEAU BENEFICIAIRE */}
        {showNewBenefModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md sm:max-w-lg">
              <h3 className="font-semibold text-[#6b4f2c] dark:text-white mb-4">Nouveau bénéficiaire</h3>
              <input placeholder="Nom" className="w-full mb-3 p-3 rounded-xl border" value={newBenefForm.nom} onChange={(e) => setNewBenefForm({ ...newBenefForm, nom: e.target.value })} />
              <input placeholder="Référence / Numéro client" className="w-full mb-3 p-3 rounded-xl border" value={newBenefForm.reference} onChange={(e) => setNewBenefForm({ ...newBenefForm, reference: e.target.value })} />
              <input placeholder="Type (ex: Mobile ••••1234)" className="w-full mb-3 p-3 rounded-xl border" value={newBenefForm.type} onChange={(e) => setNewBenefForm({ ...newBenefForm, type: e.target.value })} />
              <select className="w-full mb-4 p-3 rounded-xl border" value={newBenefForm.service} onChange={(e) => setNewBenefForm({ ...newBenefForm, service: e.target.value })}>
                <option value="">Sélectionner un service</option>
                {services.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setShowNewBenefModal(false)}>Annuler</button>
                <button onClick={addNewBeneficiaire} className="bg-[#6b5a49] text-white px-6 py-2 rounded-xl">Ajouter</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} pauseOnHover />
    </div>
  );
}
