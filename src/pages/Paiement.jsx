
import { useState } from "react";
import FormPaiement from "../components/FormPaiement";
import api from "../services/apitransat";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";



const Section1 = () => {
const [activeForm, setActiveForm] = useState(null);
const [historique, setHistorique] = useState([]);
const [loading, setLoading] = useState(false);
const solde = Number(localStorage.getItem("solde")) || 0;
const accountId = localStorage.getItem("accountId");
const Loader = () => (
  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);
const closeForm = () => setActiveForm(null);

// Fonction appelée par "Confirmer le paiement"
const ajouterPaiement = async ({ type, fournisseur, montant, facture }) => {
  if (!fournisseur || !montant) {
    toast.error("Veuillez remplir tous les champs");
    return;
  }

  // Vérification du solde
  if (Number(montant) > solde) {
    toast.error("Solde insuffisant");
    return;
  }

  try {
    setLoading(true);

    const res = await api.post("/payments", {
      accountId,
      amount: Number(montant),
      service: `${type} - ${fournisseur}`,
      reference: facture,
    });

    setHistorique(res.data.history);
    toast.success("Paiement effectué avec succès");

    // Si tu veux générer directement un PDF après paiement
    const paiement = res.data.history[res.data.history.length - 1];
    const doc = new jsPDF();
    doc.text(`Reçu de paiement: ${paiement.service}`, 20, 20);
    doc.text(`Montant: ${paiement.amount}`, 20, 30);
    doc.text(`Référence: ${paiement.reference}`, 20, 40);
    doc.text(`Date: ${paiement.date}`, 20, 50);
    doc.save(`reçu_${paiement.reference}.pdf`);

    closeForm();
  } catch (err) {
    toast.error(err.response?.data?.error || "Erreur paiement");
  } finally {
    setLoading(false);
  }
};




// ---------- FORMULAIRE MOBILE ----------
const FormMobile = () => {
const [fournisseur, setFournisseur] = useState("");
const [montant, setMontant] = useState("");
const [facture, setFacture] = useState("");

return (
<div className="flex flex-col gap-3 text-sm md:text-sm">
<div className="flex gap-2 items-center">
<i className="fa-solid fa-phone iconeMobile text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
<p className="text-sm dark:text-[#f1e8dc]">
<span className="font-semibold">Paiement Mobile</span>
<br />
Effectuer un paiement pour Mobile
</p>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
<input
type="text"
placeholder="Nom du fournisseur"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={fournisseur}
onChange={(e) => setFournisseur(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
<input
type="text"
placeholder="0.00"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={montant}
onChange={(e) => setMontant(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
<input
type="text"
placeholder="Ex: 123456789"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={facture}
onChange={(e) => setFacture(e.target.value)}
/>
</div>

  <button
          onClick={() =>
            ajouterPaiement({
              type: "Mobile",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })
          }
          className="w-full py-2 rounded text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition flex justify-center items-center"
          disabled={loading}
        >
          {loading && <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />}
          Confirmer le paiement
        </button>

</div>
);
};

// ---------- FORMULAIRE INTERNET ----------
const FormInternet = () => {
const [fournisseur, setFournisseur] = useState("");
const [montant, setMontant] = useState("");
const [facture, setFacture] = useState("");

return (
<div className="flex flex-col gap-3 text-sm md:text-sm">
<div className="flex gap-2 items-center">
<i className="fa-solid fa-wifi iconeInternet text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
<p className="text-sm dark:text-[#f1e8dc]">
<span className="font-semibold">Internet</span>
<br />
Paiement de facture
</p>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
<input
type="text"
placeholder="Nom du fournisseur"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={fournisseur}
onChange={(e) => setFournisseur(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
<input
type="text"
placeholder="0.00"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={montant}
onChange={(e) => setMontant(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
<input
type="text"
placeholder="Ex: 123456789"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={facture}
onChange={(e) => setFacture(e.target.value)}
/>
</div>

<button
          onClick={() =>
            ajouterPaiement({
              type: "Internet",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })
          }
          className="w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition flex justify-center items-center"
          disabled={loading}
        >
          {loading && <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />}
          Confirmer le paiement
        </button>

</div>
);
};

// ---------- FORMULAIRE ELECTRICITE ----------
const FormElectricite = () => {
const [fournisseur, setFournisseur] = useState("");
const [montant, setMontant] = useState("");
const [facture, setFacture] = useState("");

return (
<div className="flex flex-col gap-3 text-sm md:text-sm">
<div className="flex gap-2 items-center">
<i className="fa-solid fa-bolt iconeElectricite text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
<p className="text-sm dark:text-[#f1e8dc]">
<span className="font-semibold">Électricité</span>
<br />
Paiement de facture
</p>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
<input
type="text"
placeholder="Nom du fournisseur"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={fournisseur}
onChange={(e) => setFournisseur(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
<input
type="text"
placeholder="0.00"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={montant}
onChange={(e) => setMontant(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
<input
type="text"
placeholder="Ex: 123456789"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={facture}
onChange={(e) => setFacture(e.target.value)}
/>
</div>
<button
          onClick={() =>
            ajouterPaiement({
              type: "Electricité",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })
          }
          className="w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition flex justify-center items-center"
          disabled={loading}
        >
          {loading && <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />}
          Confirmer le paiement
        </button>

</div>
);
};

// ---------- FORMULAIRE EAU ----------
const FormEau = () => {
const [fournisseur, setFournisseur] = useState("");
const [montant, setMontant] = useState("");
const [facture, setFacture] = useState("");

return (
<div className="flex flex-col gap-3 text-sm md:text-sm">
<div className="flex gap-2 items-center">
<i className="fa-solid fa-droplet iconeEau text-lg text-[#6b5a49] dark:text-[#d6c5a9]" />
<p className="text-sm dark:text-[#f1e8dc]">
<span className="font-semibold">Eau</span>
<br />
Paiement de facture
</p>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Fournisseur</label>
<input
type="text"
placeholder="Nom du fournisseur"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={fournisseur}
onChange={(e) => setFournisseur(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Montant</label>
<input
type="text"
placeholder="0.00"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={montant}
onChange={(e) => setMontant(e.target.value)}
/>
</div>

<div className="flex flex-col">
<label className="text-sm text-[#6b5a49] dark:text-[#d6c5a9]">Numéro de facture</label>
<input
type="text"
placeholder="Ex: 123456789"
className="border border-[#d6c7b8] dark:border-[#3a3a3a] rounded p-2 bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc] focus:outline-none focus:ring-2 focus:ring-[#b9a896] transition"
value={facture}
onChange={(e) => setFacture(e.target.value)}
/>
</div>

<button
          onClick={() =>
            ajouterPaiement({
              type: "Eau",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })
          }
          className="w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition flex justify-center items-center"
          disabled={loading}
        >
          {loading && <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />}
          Confirmer le paiement
        </button>

</div>
);
};

return (
<div className="relative container mx-auto p-4 section1 text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
{/* ------------ LES BOUTONS ----------- */}
<div className="flex flex-wrap justify-center gap-4 md:gap-6 md:justify-center
max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-3 max-[400px]:grid-cols-1">
<div
role="button"
tabIndex={0}
onClick={() => setActiveForm("mobile")}
className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton max-[768px]:max-w-full max-[768px]:p-4 md:max-w-[180px]
bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
>
<div className="icone1 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
<i className="fa-solid fa-phone"></i>
</div>
<p className="dark:text-[#f1e8dc]">Mobile</p>
</div>

<div
role="button"
tabIndex={0}
onClick={() => setActiveForm("internet")}
className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton md:max-w-[180px] max-[768px]:max-w-full max-[768px]:p-4
bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
>
<div className="icone2 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
<i className="fa-solid fa-wifi"></i>
</div>
<p className="dark:text-[#f1e8dc]">Internet</p>
</div>

<div
role="button"
tabIndex={0}
onClick={() => setActiveForm("electricite")}
className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton max-[768px]:max-w-full max-[768px]:p-4 md:max-w-[180px]
bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
>
<div className="icone3 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
<i className="fa-solid fa-bolt"></i>
</div>
<p className="dark:text-[#f1e8dc]">Electricité</p>
</div>

<div
role="button"
tabIndex={0}
onClick={() => setActiveForm("eau")}
className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton max-[768px]:max-w-full max-[768px]:p-4 md:max-w-[180px]
bg-white dark:bg-[#2a2a2a] transition shadow hover:shadow-md"
>
<div className="icone4 text-3xl mb-2 text-[#6b5a49] dark:text-[#d6c5a9]">
<i className="fa-solid fa-droplet"></i>
</div>
<p className="dark:text-[#f1e8dc]">Eau</p>
</div>
</div>

{/* ------------ ARRIÈRE-PLAN SOMBRE ----------- */}
{activeForm && (
<div
className="fixed top-0 left-0 w-full h-full bg-black/60 dark:bg-black/60 backdrop-blur-sm z-10"
onClick={closeForm}
/>
)}

{/* ------------ MODAL (FORMULAIRE AU CENTRE) ----------- */}
{activeForm && (
<div
className="fixed inset-0 z-20 flex items-center justify-center p-4"
aria-modal="true"
role="dialog"
>
<div
onClick={(e) => e.stopPropagation()} // prevent overlay click from closing when clicking inside modal
className="w-[90%] max-w-md bg-white dark:bg-[#1b1b1b] rounded-xl shadow-lg p-6 md:p-8 transition"
>
<div className="text-right">
<button
className="bg-red-500 text-white px-3 py-1 rounded"
onClick={closeForm}
>
X
</button>
</div>

{/* Affichage dynamique du bon formulaire */}
<div className="mt-2">
{activeForm === "mobile" && <FormMobile />}
{activeForm === "internet" && <FormInternet />}
{activeForm === "electricite" && <FormElectricite />}
{activeForm === "eau" && <FormEau />}
</div>
</div>
</div>
)}

<FormPaiement historique={historique} />
</div>
);
};

export default Section1;
