import { useState, useEffect } from "react";

export default function ProfilePage() {
  // Etats des toggles
  const [twoFA, setTwoFA] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [lightMode, setLightMode] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    prenom: "Mouhamed",
    nom: "Ndiaye",
    email: "mouhamed22@gmail.com",
    numero: "+221 78 182 52 22",
  });

    // Fonction pour modifier les données
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false); // On ferme le formulaire après sauvegarde
  };


  // Mode sombre / clair
  useEffect(() => {
    if (!lightMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [lightMode]);

  return (
    <div className=" px-4 md:px-8" style={{color:"#6b5a49"}}>
      <h2 className="text-3xl font-bold">Informations personnelles</h2>
      <p className="text-gray-600 mb-6">Mettez à jour vos informations.</p>

      <div className=" section1-profil ">

{/* ..........................................Profil......................................... */}
        <div className="infoPersonel flex justify-center gap-3 
                      md:flex-row md:items-start md:gap-5  
                      flex-col items-center w-full gap-3">

        {/* ----------- PROFIL QUI SE TROUVE A GAUCHE ----------- */}
            <div className="text-center w-full p-5" style={{  background: "#e8dcc7", boxShadow: "2px 0 12px rgb(172, 171, 171)",}}>
              <h5 className="mb-5 font-bold">Profil</h5>
              <p className="photo">MHD</p>
              <h4 className="mt-3">{user.prenom} {user.nom}</h4>
              <p className=" w-50 m-auto rounded text-gray-400"> Client Prenium </p>
              <button className="px-4 py-2 mt-7 font-bold"  style={{ background: "var(--gradient-beige-gold)", borderRadius: "7px",}}
                      onClick={() => setIsEditing(true)}> Modifier Profil </button>  
            </div>

        {/* ----------- LES INFORMATION QUI SE TROUVE A DROITE ----------- */}
            <div className="w-full p-5" style={{ background: "#e8dcc7", boxShadow:"2px 0 12px rgb(172, 171, 171)"}}>
            
              {!isEditing ? (
                <div>

            {/* --- Affichage des informations --- */}
                    <h5 className="mb-5 font-bold">Information général</h5>
                    <div className="flex justify-between mt-6 p-1 border-b">
                      <p>Prenom</p> <p>{user.prenom}</p>
                    </div>
                    <div className="flex justify-between mt-6 p-1 border-b">
                      <p>Nom</p> <p>{user.nom}</p>
                    </div>
                    <div className="flex justify-between mt-6 p-1 border-b">
                      <p>Email</p> <p>{user.email}</p>
                    </div>
                    <div className="flex justify-between mt-6 p-1 border-b">
                      <p>Numéro</p> <p>{user.numero}</p>
                    </div>
                </div>
              ) : (
                <div>

          {/* --- Formulaire de modification QUI VA REMPLACER LES INFORMATION GENERAL --- */}
                  <h5 className="mb-5 font-bold">Modifier les informations</h5>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input type="text" name="prenom" value={user.prenom} onChange={handleChange} className="border p-2 rounded"/>
                    <input type="text" name="nom" value={user.nom} onChange={handleChange} className="border p-2 rounded"/>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="border p-2 rounded"/>
                    <input type="text" name="numero" value={user.numero} onChange={handleChange} className="border p-2 rounded"/>
                    <button type="submit" className="p-2 rounded font-bold" style={{background: "var(--gradient-beige-gold)", boxShadow:""}}> Sauvegarder  </button>
                  </form>
                </div>
              )}
            </div>
        </div>


{/* ..........................................Sécurité......................................... */}
        <div className="securite w-full md:w-auto mt-4">
            <h4 className="text-lg font-semibold">Sécurité</h4>
            <p className="text-gray-500">Gérez vos paramètres de sécurité</p>

            <div className="border-b pb-2 mt-2">
              <div className="flex items-center gap-3">
                <div className="icone1 mb-3"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="w-full ">Authentification à deux facteurs <br />
                  <span className="text-gray-400 ">Sécurisez votre compte avec 2FA</span>
                </div>
                <div className="wrapper ml-auto">
                  <div className={`toggle ${twoFA ? "active" : ""}`} onClick={() => setTwoFA(!twoFA)}>
                    <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-2">
            <div className="flex items-center gap-3">
              <div className="icone3 mb-3"><i className="fa-solid fa-lock"></i></div>
              <div className="w-full"> Mot de passe <br />
                <span className="text-gray-400">Dernière modification il y a 3 mois</span>
              </div>
              <div className="wrapper ml-auto">
                <button className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">Modifier</button>
              </div>
            </div>
          </div>
        </div>


{/* ..........................................Notifications..................................... */}
        <div className="notifications w-full md:w-auto mt-4">
          <h4 className="text-lg font-semibold">Notifications</h4>
          <p className="text-gray-500 ">Choisissez comment vous souhaitez être notifié</p>


          {/* ................Email.............. */}
          <div className="mt-2">
            <div className="flex items-center gap-3">
              <div><i className="fa-solid fa-envelope text-xl opacity-50"></i></div>
              <div className="w-full">Notifications par email <br />
                <span className="text-gray-400 ">Recevoir des emails</span>
              </div>
              <div className="wrapper ml-auto">
                <div className={`toggle ${emailNotif ? "active" : ""}`} onClick={() => setEmailNotif(!emailNotif)}>
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        
        </div>


{/* ..........................................Apparence......................................... */}
        <div className="Apparence w-full md:w-auto mt-4">
          <h4 className="text-lg font-semibold">Apparence</h4>
          <p className="text-gray-500 ">Personnalisez l'apparence de l'application</p>

          <div className="mt-2">
            <div className="flex items-center gap-3">
              <div><i className="fa-sharp fa-solid fa-moon"></i></div>
              <div className="w-full "> Mode clair <br />
                <span className="text-gray-400">Interface lumineuse et claire</span>
              </div>
              <div className="wrapper ml-auto">
                <div className={`toggle ${lightMode ? "active" : ""}`} onClick={() => setLightMode(!lightMode)}>
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
