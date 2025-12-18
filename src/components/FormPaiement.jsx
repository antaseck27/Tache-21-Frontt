import { useState, useEffect } from "react";
import api from "../services/apitransat";

const FormPaiement = () => {
  const [activeForm, setActiveForm] = useState("paiement");
  const [historique, setHistorique] = useState([]);
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [beneficiaireInput, setBeneficiaireInput] = useState("");
  const [montant, setMontant] = useState("");
  const [reference, setReference] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newNom, setNewNom] = useState("");
  const [newType, setNewType] = useState("");

  const accountId = localStorage.getItem("accountId");

  // Charger les bénéficiaires depuis le backend
  useEffect(() => {
    if (!accountId) return;

    const fetchBeneficiaires = async () => {
      try {
        const res = await api.get(`/beneficiaires/${accountId}`);
        setBeneficiaires(res.data);
      } catch (err) {
        console.error("Erreur chargement bénéficiaires", err);
      }
    };

    fetchBeneficiaires();
  }, [accountId]);

  // Charger l'historique
  useEffect(() => {
    if (!accountId) return;

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/payments/${accountId}`);
        setHistorique(res.data);
      } catch (err) {
        console.error("Erreur chargement historique", err);
      }
    };

    fetchHistory();
  }, [accountId]);

  // Paiement manuel
  const handlePaiement = async () => {
    if (!beneficiaireInput || !montant) {
      return alert("Veuillez remplir les champs obligatoires.");
    }

    try {
      const res = await api.post("/payments", {
        accountId,
        amount: Number(montant),
        service: beneficiaireInput,
        reference,
      });

      setHistorique(res.data.history);
      setBeneficiaireInput("");
      setMontant("");
      setReference("");
      setActiveForm("historique");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur paiement");
    }
  };

  // Paiement via bénéficiaire
  const handleBeneficiairePay = async (b) => {
    try {
      const res = await api.post("/payments", {
        accountId,
        amount: 5000,
        service: b.nom,
      });

      setHistorique(res.data.history);
      setActiveForm("historique");
    } catch (err) {
      alert("Erreur paiement bénéficiaire");
    }
  };

  // Ajouter bénéficiaire
  const handleAddBeneficiaire = async () => {
    if (!newNom || !newType) {
      return alert("Veuillez remplir tous les champs du nouveau bénéficiaire");
    }

    try {
      await api.post("/beneficiaires", {
        accountId,
        nom: newNom,
        type: newType,
      });

      // Recharger la liste depuis le backend
      const res = await api.get(`/beneficiaires/${accountId}`);
      setBeneficiaires(res.data);

      setNewNom("");
      setNewType("");
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.error || "Erreur ajout bénéficiaire");
    }
  };

  return (
    <div className="container mx-auto p-4 formPaiement">
      {/* MENU */}
      <div className="flex justify-center mt-5 pt-3 bg-white gap-5 barreMenu">
        <p onClick={() => setActiveForm("paiement")} className="cursor-pointer">Paiement</p>
        <p onClick={() => setActiveForm("beneficiaire")} className="cursor-pointer">Services</p>
        <p onClick={() => setActiveForm("historique")} className="cursor-pointer">Historique</p>
      </div>

      {/* FORM PAIEMENT */}
      {activeForm === "paiement" && (
        <div className="bg-white mt-5 p-5 font-bold rounded-lg shadow text-[#6b5a49]">
          <p className="text-lg font-semibold">Paiement manuel</p>

          <input
            className="border p-2 rounded mt-3 w-full"
            placeholder="Bénéficiaire"
            value={beneficiaireInput}
            onChange={(e) => setBeneficiaireInput(e.target.value)}
          />

          <input
            className="border p-2 rounded mt-3 w-full"
            placeholder="Montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />

          <input
            className="border p-2 rounded mt-3 w-full"
            placeholder="Référence"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />

          <button
            onClick={handlePaiement}
            className="w-full py-2 rounded mt-4 bg-green-600 text-white"
          >
            Effectuer le paiement
          </button>
        </div>
      )}

      {/* BÉNÉFICIAIRES */}
      {activeForm === "beneficiaire" && (
        <div className="bg-white mt-5 p-5 font-bold rounded-lg shadow text-[#6b5a49]">
          <div className="flex justify-between mb-5">
            <div>
              <p className="font-semibold">Mes Services</p>
              <p className="text-gray-500 text-sm">Gérez vos contacts favoris</p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(true)}
            >
              Nouveau Service
            </button>
          </div>

          {beneficiaires.map((b, i) => (
            <div key={i} className="flex justify-between items-center p-3 mb-3 border rounded">
              <div className="flex gap-3 items-center">
                <div className="p-3 rounded bg-gray-200">{b.icon || <i className="fa-solid fa-user"></i>}</div>
                <div>
                  <p className="font-semibold">{b.nom}</p>
                  <p className="text-gray-500 text-sm">{b.type}</p>
                </div>
              </div>
              <button
                onClick={() => handleBeneficiairePay(b)}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Payé
              </button>
            </div>
          ))}
        </div>
      )}

      {/* HISTORIQUE */}
      {activeForm === "historique" && (
        <div className="bg-white mt-5 p-5 rounded-lg shadow">
          <p className="text-lg font-semibold mb-3">Historique</p>
          {historique.length === 0 && <p>Aucune transaction pour le moment.</p>}

          {historique.map((h, i) => (
            <div key={i} className="p-4 mb-3 shadow rounded">
              <div className="flex justify-between">
                <p>{h.service}</p>
                <p>-{h.amount} FCFA</p>
              </div>
              <p className="text-gray-500 text-sm">{new Date(h.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">Nouveau Service</h3>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Nom du bénéficiaire"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="bg-blue-600 text-white px-4 py-1 rounded">Annuler</button>
              <button
                onClick={handleAddBeneficiaire}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPaiement;
