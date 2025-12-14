import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function ProfilePage() {
  const [user, setUser] = useState({
    prenom: "",
    name: "",
    email: "",
    telephone: "",
    avatar: null,
  });
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFA, setTwoFA] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [lightMode, setLightMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return false;
      if (saved === "light") return true;
    } catch {}
    return true;
  });

  const token = localStorage.getItem("token");

  // Récupérer le profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/settings/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setPreviewAvatar(res.data.avatar ? `http://localhost:5000${res.data.avatar}` : "");
      } catch (err) {
        console.error("Erreur chargement profil", err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleAvatarChange = (file) => {
    if (!file) return;
    setSelectedAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profil texte
      const resProfile = await axios.put(
        `${API_URL}/settings/update-profile`,
        {
          prenom: user.prenom,
          name: user.name,
          email: user.email,
          telephone: user.telephone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let updatedUser = resProfile.data.user;

      // Upload avatar si sélectionné
      if (selectedAvatar) {
        const formData = new FormData();
        formData.append("avatar", selectedAvatar);
        const resAvatar = await axios.put(`${API_URL}/settings/update-avatar`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        updatedUser = resAvatar.data.user;
      }

      setUser(updatedUser);
      setPreviewAvatar(updatedUser.avatar ? `http://localhost:5000${updatedUser.avatar}` : "");
      setSelectedAvatar(null);
      setIsEditing(false);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `${API_URL}/settings/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOldPassword("");
      setNewPassword("");
      setShowPassword(false);
      alert("Mot de passe modifié avec succès !");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erreur lors du changement du mot de passe");
    }
  };

  // Mode clair/sombre
  useEffect(() => {
    if (!lightMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try { localStorage.setItem("theme", lightMode ? "light" : "dark"); } catch {}
  }, [lightMode]);

  const Toggle = ({ active, onClick }) => (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center w-12 h-6 p-1 rounded-full transition-colors duration-200 focus:outline-none
      ${active ? "bg-green-500 justify-end" : "bg-gray-300 dark:bg-gray-600 justify-start"}`}
    >
      <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </button>
  );

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profil card */}
        <div className="flex gap-4">
          <div className="w-1/3 p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <img
                  src={previewAvatar
        ? previewAvatar
        : `http://localhost:5000${user.avatar}`}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <input type="file" hidden accept="image/*" onChange={(e) => handleAvatarChange(e.target.files[0])} />
              </label>
              <h4 className="mt-4 text-lg font-semibold">{user.prenom} {user.name}</h4>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="mt-6 px-4 py-2 rounded-md bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white">
                  Modifier Profil
                </button>
              )}
            </div>
          </div>

          <div className="w-2/3 p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
            {!isEditing ? (
              <div>
                <p>Prénom : {user.prenom}</p>
                <p>Nom : {user.name}</p>
                <p>Email : {user.email}</p>
                <p>Téléphone : {user.telephone}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="prenom" value={user.prenom} onChange={handleChange} placeholder="Prénom" />
                <input name="name" value={user.name} onChange={handleChange} placeholder="Nom" />
                <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                <input name="telephone" value={user.telephone} onChange={handleChange} placeholder="Téléphone" />
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Sauvegarder</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sécurité card */}
        <div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors space-y-4">
          <h4 className="text-lg font-semibold dark:text-[#f1e8dc]">Sécurité</h4>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-xl"></i>
              <span className="font-medium dark:text-[#f1e8dc]">Authentification à deux facteurs</span>
            </div>
            <Toggle active={twoFA} onClick={() => setTwoFA(!twoFA)} />
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-lock text-xl"></i>
              <span className="font-medium dark:text-[#f1e8dc]">Mot de passe</span>
            </div>
            <button onClick={() => setShowPassword(!showPassword)} className="px-4 py-2 bg-blue-600 text-white rounded">Modifier</button>
          </div>

          {showPassword && (
            <div className="mt-3 flex flex-col gap-2">
              <input type="password" placeholder="Ancien mot de passe" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button onClick={handleChangePassword} className="px-4 py-2 bg-green-600 text-white rounded">Valider</button>
            </div>
          )}
        </div>

        {/* Notifications card */}
        <div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors">
          <h4 className="text-lg font-semibold dark:text-[#f1e8dc]">Notifications</h4>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-xl"></i>
              <span className="dark:text-[#f1e8dc]">Notifications par email</span>
            </div>
            <Toggle active={emailNotif} onClick={() => setEmailNotif(!emailNotif)} />
          </div>
        </div>

        {/* Apparence card */}
        <div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md transition-colors flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa-sharp fa-solid fa-moon text-xl"></i>
            <span className="dark:text-[#f1e8dc]">Mode clair</span>
          </div>
          <Toggle active={lightMode} onClick={() => setLightMode(!lightMode)} />
        </div>

      </div>
    </div>
  );
}














// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ProfilePage() {
//   // ================= API CONFIG =================
//   const API_URL = "http://localhost:5000/api"; // adapte si besoin
//   const token = localStorage.getItem("token");

//   const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // ================= STATES =================
//   const [twoFA, setTwoFA] = useState(false);
//   const [emailNotif, setEmailNotif] = useState(true);

//   const [lightMode, setLightMode] = useState(() => {
//     try {
//       const saved = localStorage.getItem("theme");
//       if (saved === "dark") return false;
//       if (saved === "light") return true;
//     } catch (e) {}
//     if (window.matchMedia("(prefers-color-scheme: dark)").matches) return false;
//     return true;
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const [user, setUser] = useState({
//     prenom: "",
//     name: "",
//     email: "",
//     telephone: "",
//   });

//   // ================= LOAD PROFILE =================
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/settings/me"); 
//         // ou /users/me selon ton backend

//         setUser({
//           prenom: res.data.prenom,
//           name: res.data.name,
//           email: res.data.email,
//           telephone: res.data.telephone,
//         });

//         setTwoFA(res.data.twoFA ?? false);
//         setEmailNotif(res.data.emailNotif ?? true);
//       } catch (error) {
//         console.error("Erreur chargement profil", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // ================= UPDATE PROFILE =================
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put("/settings/update-profile", {
//         prenom: user.prenom,
//         name: user.name,
//         email: user.email,
//         telephone: user.telephone,
//       });

//       setIsEditing(false);
//     } catch (error) {
//       console.error("Erreur mise à jour profil", error);
//     }
//   };

//   // ================= UPDATE SECURITY & NOTIFS =================
//   useEffect(() => {
//     api
//       .put("/settings/update-profile", {
//         twoFA,
//         emailNotif,
//       })
//       .catch(() => {});
//   }, [twoFA, emailNotif]);

//   // ================= THEME =================
//   useEffect(() => {
//     if (!lightMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [lightMode]);

//   // ================= TOGGLE COMPONENT =================
//   const Toggle = ({ active, onClick }) => (
//     <button
//       onClick={onClick}
//       aria-pressed={active}
//       className={`inline-flex items-center w-12 h-6 p-1 rounded-full transition-colors duration-200
//       ${active ? "bg-green-500 justify-end" : "bg-gray-300 dark:bg-gray-600 justify-start"}`}
//     >
//       <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
//     </button>
//   );

//   // ================= JSX (INCHANGÉ) =================
//   return (
//     <div className="min-h-screen px-4 md:px-8 py-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold mb-1">Informations personnelles</h2>
//         <p className="text-sm mb-6">Mettez à jour vos informations.</p>

//         <div className="space-y-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* PROFIL */}
//             <div className="w-full md:w-1/3 p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
//               <h5 className="mb-4 font-bold">Profil</h5>
//               <div className="flex flex-col items-center">
//                 <div className="w-20 h-20 rounded-full bg-[#cbb99a] flex items-center justify-center text-white text-xl font-bold">
//                   MHD
//                 </div>
//                 <h4 className="mt-4 text-lg font-semibold">
//                   {user.prenom} {user.nom}
//                 </h4>

//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="mt-6 px-4 py-2 rounded-md font-bold bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white"
//                 >
//                   Modifier Profil
//                 </button>
//               </div>
//             </div>

//             {/* INFOS */}
//             <div className="w-full md:w-2/3 p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
//               {!isEditing ? (
//                 <div className="space-y-3">
//                   <div className="flex justify-between"><span>Prénom</span><span>{user.prenom}</span></div>
//                   <div className="flex justify-between"><span>Nom</span><span>{user.nom}</span></div>
//                   <div className="flex justify-between"><span>Email</span><span>{user.email}</span></div>
//                   <div className="flex justify-between"><span>Numéro</span><span>{user.telephone}</span></div>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                   <input name="prenom" value={user.prenom} onChange={handleChange} />
//                   <input name="nom" value={user.name} onChange={handleChange} />
//                   <input name="email" value={user.email} onChange={handleChange} />
//                   <input name="telephone" value={user.telephone} onChange={handleChange} />

//                   <div className="flex gap-2">
//                     <button type="submit">Sauvegarder</button>
//                     <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>

//           {/* SECURITÉ */}
//           <div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
//             <div className="flex justify-between items-center">
//               <span>Authentification à deux facteurs</span>
//               <Toggle active={twoFA} onClick={() => setTwoFA(!twoFA)} />
//             </div>
//           </div>

//           {/* NOTIFICATIONS */}
//           <div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
//             <div className="flex justify-between items-center">
//               <span>Notifications par email</span>
//               <Toggle active={emailNotif} onClick={() => setEmailNotif(!emailNotif)} />
//             </div>
//           </div>

//           {/* APPARENCE */}
//           <div className="p-5 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
//             <div className="flex justify-between items-center">
//               <span>Mode clair</span>
//               <Toggle active={lightMode} onClick={() => setLightMode(!lightMode)} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
