


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Transfer() {
  const [activeTab, setActiveTab] = useState("interne");
  const [accounts, setAccounts] = useState([]);
const [contacts, setContacts] = useState([]);
const [infos] = useState([
  {
    icon: "fa-solid fa-user",
    title: "Les transferts internes sont instantanés.",
    subtitle: "Entre vos comptes BankApp",
  },
  {
    icon: "fa-solid fa-wallet",
    title: "Gérez facilement vos portefeuilles.",
    subtitle: "Toutes vos cartes BankApp",
  },
  {
    icon: "fa-solid fa-credit-card",
    title: "Vos paiements sécurisés.",
    subtitle: "Cartes BankApp protégées",
  },
]);


  const [formData, setFormData] = useState({
    sourceAccount: "",
    destinationAccount: "",
    beneficiaryIban: "",
    amount: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");
  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
  const fetchContacts = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API_BASE}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error("Erreur chargement contacts", err);
    }
  };

  fetchContacts();
}, [token]);
const handleContactClick = (contact) => {
  setActiveTab("externe");
  setFormData((prev) => ({
    ...prev,
    beneficiaryIban: contact.iban,
  }));
};


  //  Récupération des comptes utilisateur
  useEffect(() => {
    const fetchAccounts = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_BASE}/accounts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccounts(res.data || []);
      } catch (err) {
        console.error("Erreur récupération comptes:", err);
      }
    };
    fetchAccounts();
  }, [token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Vérifications frontend
    if (!formData.sourceAccount || !formData.amount || (activeTab === "interne" && !formData.destinationAccount) || (activeTab === "externe" && !formData.beneficiaryIban)) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs requis." });
      setLoading(false);
      return;
    }

    if (activeTab === "interne" && formData.sourceAccount === formData.destinationAccount) {
      setMessage({ type: "error", text: "Le compte source et destination doivent être différents." });
      setLoading(false);
      return;
    }

    try {
      if (activeTab === "interne") {
        const res = await axios.post(`${API_BASE}/transfer/internal`, {
              sourceAccount: formData.sourceAccount,
    destinationAccount: formData.destinationAccount,
    amount: Number(formData.amount)

        }, { headers: { Authorization: `Bearer ${token}` } });
        setMessage({ type: "success", text: res.data.message });
      } else {
        const res = await axios.post(`${API_BASE}/transfer/external`, {
          sourceAccount: formData.sourceAccount,
    beneficiaryIban: formData.beneficiaryIban,
    amount: Number(formData.amount)
        }, { headers: { Authorization: `Bearer ${token}` } });
        setMessage({ type: "success", text: res.data.message });
      }

      // Reset form
      setFormData({ sourceAccount: "", destinationAccount: "", beneficiaryIban: "", amount: "", description: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Erreur serveur" });
    } finally {
      setLoading(false);
    }
  };

  //  Comptes source et destination
  const sourceAccounts = accounts; 
  const destinationAccounts = activeTab === "interne"
    ? accounts.filter(acc => acc._id !== formData.sourceAccount)
    : [];

  return (
    <div className="min-h-screen p-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 dark:text-[#f1e8dc]">Transfert d'argent</h2>
        <p className="text-[#8f7e6b] dark:text-[#d6c5a9] text-lg">Envoyez de l'argent à vos proches ou payez vos factures</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulaire */}
        <div className="md:col-span-2 bg-white dark:bg-[#2a2a2a] p-6 md:p-8 rounded-xl shadow-lg border border-[#e7ded5] dark:border-[#3a3a3a] transition-colors">
          <div className="flex mb-6">
            <div className="w-full rounded-xl flex bg-[#e9e0d7] dark:bg-[#262424] border border-[#d6c7b8] dark:border-[#3a3a3a] p-1">
              <button onClick={() => setActiveTab("interne")} className={`px-4 py-2 rounded-lg text-sm font-medium w-1/2 transition ${activeTab==="interne" ? "bg-white dark:bg-[#2a2a2a] text-[#6b5a49] dark:text-[#f1e8dc]" : "text-[#8f7e6b] dark:text-[#d6c5a9]"}`}>Transfert interne</button>
              <button onClick={() => setActiveTab("externe")} className={`px-4 py-2 rounded-lg text-sm font-medium w-1/2 transition ${activeTab==="externe" ? "bg-white dark:bg-[#2a2a2a] text-[#6b5a49] dark:text-[#f1e8dc]" : "text-[#8f7e6b] dark:text-[#d6c5a9]"}`}>Transfert externe</button>
            </div>
          </div>

          {message && <div className={`mb-4 p-3 rounded ${message.type==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{message.text}</div>}

          {/* Formulaire interne */}
          {activeTab==="interne" && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte source</label>
                <select name="sourceAccount" value={formData.sourceAccount} onChange={handleChange} className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
                  <option value="">Sélectionnez un compte</option>
                  {sourceAccounts.map(acc => (<option key={acc._id} value={acc._id}>{acc.name} ({acc.type}) - {acc.balance} FCFA</option>))}
                </select>
              </div>

              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte destination</label>
                <select name="destinationAccount" value={formData.destinationAccount} onChange={handleChange} className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
                  <option value="">Sélectionnez un compte</option>
                  {destinationAccounts.map(acc => (<option key={acc._id} value={acc._id}>{acc.name} ({acc.type}) - {acc.balance} FCFA</option>))}
                </select>
              </div>

              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Montant (FCFA)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="0" className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition" placeholder="0"/>
              </div>

              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Description (optionnel)</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition" placeholder="Ex: Épargne mensuelle"/>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] dark:from-[#6b5a49] dark:to-[#3b352c] text-[#f7f3ee] p-3 rounded-xl font-semibold hover:opacity-95 transition">{loading ? "En cours..." : "Envoyer"}</button>
            </form>
          )}

          {/* Formulaire externe */}
          {activeTab==="externe" && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Compte source</label>
                <select name="sourceAccount" value={formData.sourceAccount} onChange={handleChange} className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#1b1b1b] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition">
                  <option value="">Sélectionnez un compte</option>
                  {sourceAccounts.map(acc => (<option key={acc._id} value={acc._id}>{acc.name} ({acc.type}) - {acc.balance} FCFA</option>))}
                </select>
              </div>

              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">IBAN du bénéficiaire</label>
                <input type="text" name="beneficiaryIban" value={formData.beneficiaryIban} onChange={handleChange} className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition" placeholder="Ex: SN76XXXXXXXXXXXXXXX"/>
              </div>

              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Montant (FCFA)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="0" className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition" placeholder="0"/>
              </div>

              <div>
                <label className="block text-[#6b5a49] dark:text-[#f1e8dc] mb-1">Description (optionnel)</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-[#d6c7b8] dark:border-[#4a4a4a] rounded-xl bg-white dark:bg-[#111] text-[#333] dark:text-[#f1e8dc] focus:ring-2 focus:ring-[#b9a896] transition" placeholder="Ex: Paiement facture SENELEC"/>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] dark:from-[#6b5a49] dark:to-[#3b352c] text-[#f7f3ee] p-3 rounded-xl font-semibold hover:opacity-95 transition">{loading ? "En cours..." : "Envoyer"}</button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#2a2a2a] p-5 rounded-xl shadow border border-[#e7ded5] dark:border-[#3a3a3a]">
            <h3 className="text-lg font-semibold mb-3 dark:text-[#f1e8dc]">Contacts récents</h3>
              <ul className="space-y-3">
              {contacts.length === 0 ? (
  <p className="text-sm text-[#8f7e6b]">
    Aucun contact enregistré
  </p>
) : (
  contacts.map((c) => (
    <li
      key={c._id}
      onClick={() => handleContactClick(c)}
      className="flex items-center gap-3 cursor-pointer hover:bg-[#f1ece6] dark:hover:bg-[#333] p-2 rounded-lg transition"
    >
      <i className="fa-solid fa-user text-[#8f7e6b] text-xl" />
      <div>
        <p className="font-semibold">{c.name}</p>
        <p className="text-sm text-[#8f7e6b]">{c.iban}</p>
      </div>
    </li>
  ))
)}

          </ul>

          </div>

          <div className="bg-white dark:bg-[#2a2a2a] p-5 rounded-xl shadow border border-[#e7ded5] dark:border-[#3a3a3a]">
            <h3 className="text-lg font-semibold mb-3 dark:text-[#f1e8dc]">Informations</h3>
            <ul className="space-y-4">
              {infos.map((info,i)=>(<li key={i} className="flex items-start gap-3"><i className={`${info.icon} text-[#8f7e6b] dark:text-[#d6c5a9] text-xl`}/><div><p className="font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">{info.title}</p><p className="text-sm text-[#8f7e6b] dark:text-[#d6c5a9]">{info.subtitle}</p></div></li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    
  );
  
}

