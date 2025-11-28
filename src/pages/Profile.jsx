import { useState, useEffect } from "react";

export default function ProfilePage() {
  // Etats des toggles
  const [twoFA, setTwoFA] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(false);
  const [lightMode, setLightMode] = useState(true);

  // Mode sombre / clair
  useEffect(() => {
    if (!lightMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [lightMode]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Informations personnelles</h1>
      <p className="text-gray-600 mb-6">Mettez à jour vos informations.</p>
    <div className=" section1-grid">

{/* ..........................................Profil......................................... */}
      <div className="info">
        <div className="text-center mt-5 border-b pb-5">
          <p className="photo">JD</p>
          <h6 className="mt-4 text-lg">Mouhamed Ndiaye</h6>
          <p className="mt-3 text-gray-600"><span>Client Prenium</span></p>
          <p className="mt-4">
            <span className="text-primary px-4 py-2 rounded" style={{backgroundColor:"rgba(200, 224, 245, 1)"}}>Membre depuis 2020</span>
          </p>
        </div>
        <div className="flex flex-col gap-3 ml-3 mt-5">
          <div className="flex items-center gap-3 ">
            <i className="fa-solid fa-envelope opacity-75 text-lg"></i>
            <div><span className="text-gray-500 dark:text-gray-450">Email</span><br />jean.dupont@email.com</div>
          </div>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-phone opacity-75 text-lg"></i>
            <div><span className="text-gray-500 dark:text-gray-450">Téléphone</span><br />+221 78 182 52 22</div>
          </div>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-location-dot opacity-75 text-lg"></i>
            <div><span className="text-gray-500 dark:text-gray-450">Adresse</span><br />23 Rue de la Paix, 75001 Paris</div>
          </div>
          <div className="flex items-center gap-3 ">
            <i className="fa-solid fa-calendar opacity-75 text-lg"></i>
            <div><span className="text-gray-500 dark:text-gray-450">Date de naissance</span><br />15/03/1990</div>
          </div>
        </div>
      </div>

{/* ..........................................Informations personnelles......................................... */}
      <div className="infoPerso">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold ">Informations personnelles</h4>
            <p className="text-gray-500 ">Mettez à jour vos informations</p>
          </div>
          <div>
            <button className=" text-black px-4 py-2 rounded hover:bg-blue-700">Modifier</button>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-2">
            <label className="block">Prénom</label>
            <input type="text" placeholder="Mouhamed" className=""/>
          </div>
          <div className="p-2">
            <label className="block ">Nom</label>
            <input type="text" placeholder="Ndiaye" className=""/>
          </div>
          <div className="p-2">
            <label className="block ">Email</label>
            <input type="text" placeholder="Mouhamedndiaye@gmail.com" className=""/>
          </div>
          <div className="p-2">
            <label className="block ">Téléphone</label>
            <input type="text" placeholder="+221 78 182 52 22" className=""/>
          </div>
          <div className="p-2 md:col-span-2">
            <label className="block ">Adresse</label>
            <input type="text" placeholder="23 Rue de la Paix, 75001 Paris" className=""/>
          </div>
        </div>
      </div>


{/* ..........................................Sécurité......................................... */}
      <div className="securite">
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

      <div className="border-b pb-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="icone2 mb-3"><i className="fa-solid fa-user "></i></div>
          <div className="w-full"> Authentification biométrique <br />
            <span className="text-gray-400 ">Utilisez votre empreinte digitale</span>
          </div>
          <div className="wrapper ml-auto">
            <div className={`toggle ${biometric ? "active" : ""}`} onClick={() => setBiometric(!biometric)}>
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

{/* ..........................................Notifications......................................... */}
    <div className="notifications">
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


      {/* ..............Push................. */}
      <div className="mt-2">
        <div className="flex items-center gap-3">
          <div><i className="fa-solid fa-bell text-xl opacity-50"></i></div>
          <div className="w-full "> Notifications push <br />
            <span className="text-gray-400">Alertes sur votre appareil</span>
          </div>
          <div className="wrapper ml-auto">
            <div className={`toggle ${pushNotif ? "active" : ""}`} onClick={() => setPushNotif(!pushNotif)}>
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>


      {/* ...............SMS................ */}
      <div className="mt-2">
        <div className="flex items-center gap-3">
          <div><i className="fa-solid fa-phone  text-xl opacity-50"></i></div>
          <div className="w-full">Notifications SMS <br />
            <span className="text-gray-400">Recevoir des SMS</span>
          </div>
          <div className="wrapper ml-auto">
            <div className={`toggle ${smsNotif ? "active" : ""}`} onClick={() => setSmsNotif(!smsNotif)}>
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


{/* ..........................................Apparence......................................... */}
    <div className="Apparence">
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
