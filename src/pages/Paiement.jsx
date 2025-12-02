import { useState } from "react";
import FormPaiement from "../components/FormPaiement";

const Section1 = () => {
  const [activeForm, setActiveForm] = useState(null); 
  const [historique, setHistorique] = useState([]);

  const closeForm = () => setActiveForm(null);

  // Fonction appelée par "Confirmer le paiement"
  const ajouterPaiement = (data) => {
    setHistorique(prev => [...prev, data]);
    closeForm();
 };

// ---------- FORMULAIRE MOBILE ----------
  const FormMobile = () => {
    const [fournisseur, setFournisseur] = useState("");
    const [montant, setMontant] = useState("");
    const [facture, setFacture] = useState("");

    return (
    <div className="flex flex-col gap-3 text-sm">
       <div className="flex gap-1">
         <i className="fa-solid fa-phone iconeMobile"></i>
         <p><span className="font-semibold">Paiement Mobile</span> <br /> Effectuer un paiement pour Mobile</p>
       </div>
       

        <div className="flex flex-col">
          <label>Fournisseur</label>
          <input type="text"  placeholder="Nom du fournisseur"  className="border rounded p-2" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)}/>
        </div>

        <div className="flex flex-col">
          <label>Montant</label>
          <input type="text" placeholder="0.00" className="border rounded p-2" value={montant}  onChange={(e) => setMontant(e.target.value)}/>
        </div>

        <div className="flex flex-col">
          <label>Numéro de facture</label>
          <input type="text" placeholder="Ex: 123456789"  className="border rounded p-2" value={facture} onChange={(e) => setFacture(e.target.value)}/>
        </div>

        <button className="text-white w-full py-2 rounded" style={{background:"#22c55e"}}
        onClick={() => ajouterPaiement({
          type: "Mobile",
          fournisseur,
          montant,
          facture,
          date: new Date().toLocaleDateString()
        })}
        >Confirmer le paiement </button> 
    </div>
  );
};

// ---------- FORMULAIRE INTERNET ----------
  const FormInternet = () => {
    const [fournisseur, setFournisseur] = useState("");
    const [montant, setMontant] = useState("");
    const [facture, setFacture] = useState("");

  return(
    <div className="flex flex-col gap-3 text-sm">
       <div className="flex gap-1">
        <i className="fa-solid fa-wifi iconeInternet"></i>
         <p><span className="font-semibold">Internet</span> <br /> Paiement de facture</p>
       </div>

        <div className="flex flex-col">
          <label>Fournisseur</label>
          <input  type="text" placeholder="Nom du fournisseur" className="border rounded p-2" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label>Montant</label>
          <input type="text" placeholder="0.00" className="border rounded p-2" value={montant} onChange={(e) => setMontant(e.target.value)}/>
        </div>

        <div className="flex flex-col">
          <label>Numéro de facture</label>
          <input type="text" placeholder="Ex: 123456789" className="border rounded p-2" value={facture} onChange={(e) => setFacture(e.target.value)}/>
        </div>

        <button className="text-white w-full py-2 rounded" style={{background:"#2563eb"}}
         onClick={() => ajouterPaiement({
              type: "Internet",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })}
        > Confirmer le paiement </button>
    </div>
  );
};

// ---------- FORMULAIRE ELECTRICITE ----------
  const FormElectricite = () => {
    const [fournisseur, setFournisseur] = useState("");
    const [montant, setMontant] = useState("");
    const [facture, setFacture] = useState("");

   return(
    <div className="flex flex-col gap-3 text-sm">
       <div className="flex gap-1">
        <i className="fa-solid fa-bolt iconeElectricite"></i>
         <p><span className="font-semibold">Électricité</span> <br /> Paiement de facture</p>
       </div>

        <div className="flex flex-col">
          <label>Fournisseur</label>
          <input  type="text"  placeholder="Nom du fournisseur"  className="border rounded p-2" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)}/>
        </div>

        <div className="flex flex-col">
          <label>Montant</label>
          <input type="text"  placeholder="0.00" className="border rounded p-2" value={montant} onChange={(e) => setMontant(e.target.value)}/>
        </div>

        <div className="flex flex-col">
          <label>Numéro de facture</label>
          <input type="text" placeholder="Ex: 123456789" className="border rounded p-2" value={facture} onChange={(e) => setFacture(e.target.value)}/>
        </div>
            
        <button className="text-white w-full py-2 rounded" style={{background:"#f97316"}}
        onClick={() =>  ajouterPaiement({
              type: "Électricité",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })}
        > Confirmer le paiement </button>
          
          
    </div>
  );
};

  // ---------- FORMULAIRE EAU ----------
  const FormEau = () => {
    const [fournisseur, setFournisseur] = useState("");
    const [montant, setMontant] = useState("");
    const [facture, setFacture] = useState("");
  
    return(
    <div className="flex flex-col gap-3 text-sm">
        <div className="flex gap-1">
          <i className="fa-solid fa-droplet iconeEau"></i>
          <p><span className="font-semibold">Eau</span> <br />Paiement de facture</p>
        </div>

        <div className="flex flex-col">
          <label>Fournisseur</label>
          <input type="text" placeholder="Nom du fournisseur" className="border rounded p-2" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)}/> 
        </div>

        <div className="flex flex-col">
          <label>Montant</label>
          <input type="text" placeholder="0.00" className="border rounded p-2" value={montant} onChange={(e) => setMontant(e.target.value)}/>
        </div>

        <div className="flex flex-col">
          <label>Numéro de facture</label>
          <input type="text" placeholder="Ex: 123456789" className="border rounded p-2" value={facture} onChange={(e) => setFacture(e.target.value)}/>
        </div>

        <button className="text-white w-full py-2 rounded" style={{background:"#3b82f6"}}
         onClick={() => ajouterPaiement({
              type: "Eau",
              fournisseur,
              montant,
              facture,
              date: new Date().toLocaleDateString(),
            })}
        > Confirmer le paiement </button>
             
    </div>
  );
};

  return (
    <div className="relative container mx-auto p-4 section1">

{/* ------------ LES BOUTONS ----------- */}
      <div className="flex flex-wrap justify-center gap-4">

        <div className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton"
             onClick={() => setActiveForm("mobile")}>
           <div className="icone1 text-3xl mb-2">
             <i className="fa-solid fa-phone"></i></div>
             <p>Mobile</p>
        </div>

        <div className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton"
             onClick={() => setActiveForm("internet")}>
           <div className="icone2 text-3xl mb-2">
             <i className="fa-solid fa-wifi"></i></div>
             <p>Internet</p>
        </div>

        <div className="rounded p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton"
             onClick={() => setActiveForm("electricite")}>
          <div className="icone3 text-3xl mb-2">
             <i className="fa-solid fa-bolt"></i></div>
             <p>Electricité</p>
        </div>

        <div className="bg-white rounded shadow p-6 flex-1 max-w-[200px] text-center cursor-pointer blocBouton"
             onClick={() => setActiveForm("eau")} >
          
        <div className="icone4 text-3xl mb-2">
             <i className="fa-solid fa-droplet"></i></div>
             <p>Eau</p>
        </div>

      </div>

{/* ------------ ARRIÈRE-PLAN SOMBRE ----------- */}
      {activeForm && ( 
        <div  className="fixed top-0 left-0 w-full h-full  bg-opacity-60 backdrop-blur-sm z-10" onClick={closeForm}> </div>
      )}

{/* ------------ MODAL (FORMULAIRE AU CENTRE) ----------- */}
      {activeForm && (
        <div  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-lg z-20 p-6">
          <div className="text-right">
             <button className="bg-red-500 text-white px-3 py-1 rounded"  onClick={closeForm}> X </button>
          </div>

          {/* Affichage dynamique du bon formulaire */}
          {activeForm === "mobile" && <FormMobile />}
          {activeForm === "internet" && <FormInternet />}
          {activeForm === "electricite" && <FormElectricite />}
          {activeForm === "eau" && <FormEau />}
        </div>
      )}
      <FormPaiement historique={historique}/>
    </div>
  );
};

export default Section1;
