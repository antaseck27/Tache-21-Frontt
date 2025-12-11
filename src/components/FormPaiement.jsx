import { useState } from "react";

const FormPaiement = () => {
  const [activeForm, setActiveForm] = useState("paiement");

  const [historique, setHistorique] = useState([]);

  const [beneficiaires, setBeneficiaires] = useState([
    { nom: "EDF", type: "Mobile ****1111", icon: <i className="fa-solid fa-phone"></i> },
    { nom: "Orange", type: "Mobile ****2222", icon: <i className="fa-solid fa-wifi"></i> },
    { nom: "Free", type: "Mobile ****3333", icon: <i className="fa-solid fa-bolt"></i> },
    { nom: "Veolia", type: "Mobile ****4444", icon: <i className="fa-solid fa-droplet"></i> },
  ]);

  const [beneficiaireInput, setBeneficiaireInput] = useState("");
  const [montant, setMontant] = useState("");
  const [reference, setReference] = useState("");

  // ------ MODAL ------
  const [showModal, setShowModal] = useState(false);
  const [newNom, setNewNom] = useState("");
  const [newType, setNewType] = useState("");

// ➤ Ajouter un paiement manuel
  const handlePaiement = () => {
    if (!beneficiaireInput || !montant)
      return alert("Veuillez remplir les champs obligatoires.");

    const newEntry = {
      title: beneficiaireInput,
      montant: `-${montant}`,
      date: new Date().toLocaleDateString(),
      ref: reference || "Paiement",
    };

    setHistorique([newEntry, ...historique]);

    setBeneficiaireInput("");
    setMontant("");
    setReference("");

    setActiveForm(null);
  };

// ➤ Ajouter dans historique depuis bénéficiaire
  const handleBeneficiairePay = (b) => {
    setHistorique([
      {
        title: b.nom,
        montant: "-???",
        date: new Date().toLocaleDateString(),
        ref: b.type,
      },
      ...historique,
    ]);
  };

// ➤ Ajouter un bénéficiaire via modal
  const handleAddBeneficiaire = () => {
    if (!newNom || !newType) return;

    setBeneficiaires([{ nom: newNom, type: newType }, ...beneficiaires]);

    setNewNom("");
    setNewType("");

    setShowModal(false);
  };

  
  return (
    <div className="container mx-auto p-4 formPaiement">

{/*................ BARRE DE MENU ..............*/}
      <div className="flex justify-center mt-5 pt-3 bg-white gap-5 barreMenu">
          <p onClick={() => setActiveForm("paiement")} className="cursor-pointer">Paiement</p>
          <p onClick={() => setActiveForm("beneficiaire")} className="cursor-pointer">Bénéficiaire</p>
          <p onClick={() => setActiveForm("historique")} className="cursor-pointer">Historique</p>
      </div>


{/* ..................FORMULAIRE PAIEMENT ACTIVE ........................ */}
      {activeForm === "paiement" && (
        <div className="bg-white mt-5 p-5 font-bold rounded-lg shadow" style={{color:"#6b5a49"}}>
            <p className="text-lg font-semibold">Paiement manuel</p>

            <input type="text" className="border p-2 rounded mt-3 w-full" placeholder="Bénéficiaire" value={beneficiaireInput}
                   onChange={(e) => setBeneficiaireInput(e.target.value)}  required/>
            
            <input type="text" className="border p-2 rounded mt-3 w-full" placeholder="Montant" value={montant}
                   onChange={(e) => setMontant(e.target.value)}  required/>
            
            <input type="text" className="border p-2 rounded mt-3 w-full" placeholder="Référence" value={reference}
                   onChange={(e) => setReference(e.target.value)}  required/>
            
            <button onClick={handlePaiement} className=" w-full py-2 rounded mt-4" >Effectuer le paiement</button>       
        </div>
      )}


{/* ...................... FORMULAIRE BÉNÉFICIAIRES ........................... */}
      {activeForm === "beneficiaire" && (
        <div className="bg-white mt-5 p-5 font-bold rounded-lg shadow"  style={{color:"#6b5a49"}}>
          <div className="flex justify-between items-center mb-5">
              <div>
                <p className="font-semibold">Mes bénéficiaires</p>
                <p className="text-gray-500 text-sm">Gérez vos contacts favoris</p>
              </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Nouveau Bénéficiaire</button>
          </div>

          {beneficiaires.map((b, i) => (
            <div key={i} className="flex justify-between items-center p-3 mb-3 border rounded">
                <div className="flex gap-3 items-center">
                  <p style={{background:"var(--gradient-beige-gold)", padding:"10px", borderRadius:"10px"}}> {b.icon} </p>
                  <div>
                    <p className="font-semibold">{b.nom}</p>
                    <p className="text-gray-500 text-sm">{b.type}</p>
                  </div>
                </div>
                <button onClick={() => handleBeneficiairePay(b)} className="bg-green-500 text-white px-4 py-1 rounded">Payé</button>
            </div>
          ))}
        </div>
      )}


{/* ................... HISTORIQUE ...................... */}
      {activeForm === "historique" && (
        <div className="bg-white mt-5 p-5 rounded-lg shadow">
          <p className="text-lg font-semibold mb-3">Historique</p>

          {historique.length === 0 && <p>Aucune transaction pour le moment.</p>}

          {historique.map((h, i) => (
            <div key={i} className="p-4 mb-3 shadow rounded">
              <div className="flex justify-between">
                <p>{h.title}</p>
                <p>{h.montant}</p>
              </div>
              <p className="text-gray-500 text-sm">{h.date} • {h.ref}</p>
            </div>
          ))}
        </div>
      )}


{/* ................... MODAL AJOUTER UN BÉNÉFICIAIRE ...................*/}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 animate-fade">
            <h3 className="text-lg font-semibold mb-3">Nouveau bénéficiaire</h3>

            <input type="text" placeholder="Nom du bénéficiaire" className="border p-2 rounded w-full mb-3" value={newNom}
              onChange={(e) => setNewNom(e.target.value)}/>
            
            <input type="text" placeholder="Type (ex: Mobile ****7777)" className="border p-2 rounded w-full mb-3" value={newType}
              onChange={(e) => setNewType(e.target.value)}/>

            <div className="flex justify-end gap-3 mt-4">
              <button  className="px-4 py-1 bg-gray-300 rounded" onClick={() => setShowModal(false)}> Annuler </button>
              <button className="px-4 py-1 bg-blue-600 text-white rounded" onClick={handleAddBeneficiaire}>Ajouter</button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default FormPaiement;
