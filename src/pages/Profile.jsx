// src/pages/Profile.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = "http://localhost:5000/api";

/* ===================== UI HELPERS ===================== */
const InfoInput = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 border-b border-[#d6c7b8] dark:border-[#3a3a3a] py-3">
    <i className={`${icon} text-[#8f7e6b] text-lg w-5`} />
    <div className="flex justify-between w-full">
      <span className="text-sm">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  </div>
);

const Toggle = ({ active, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center w-12 h-6 p-1 rounded-full transition-colors duration-200 ${
      active ? "bg-green-500 justify-end" : "bg-gray-300 dark:bg-gray-600 justify-start"
    }`}
  >
    <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
  </button>
);

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();

  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || "");
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
      return saved === "light";
    } catch { return true; }
  });

  /* ===================== AVATAR ===================== */
  const handleAvatarChange = (file) => {
    if (!file) return;
    setSelectedAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  /* ===================== UPDATE PROFILE ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profil général
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

      // Update avatar si choisi
      if (selectedAvatar) {
        const formData = new FormData();
        formData.append("avatar", selectedAvatar);

        const resAvatar = await axios.put(
          `${API_URL}/settings/update-avatar`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          }
        );

        updatedUser.avatar = resAvatar.data.avatar;
      }

      setUser(updatedUser); // impact global Header + Dashboard
      setPreviewAvatar(updatedUser.avatar || "");
      setSelectedAvatar(null);
      setIsEditing(false);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  /* ===================== PASSWORD ===================== */
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

  /* ===================== THEME ===================== */
  useEffect(() => {
    if (!lightMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    try { localStorage.setItem("theme", lightMode ? "light" : "dark"); } catch {}
  }, [lightMode]);

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 bg-[#f7f3ee] dark:bg-[#1a1a1a] text-[#6b5a49] dark:text-[#f1e8dc] transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* PROFIL */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 p-6 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md flex flex-col items-center">
            <label className="relative cursor-pointer">
              <img
                src={previewAvatar || user.avatar || "/avatar.png"}
                alt="Avatar utilisateur"
                className="w-24 h-24 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-[#6b5a49] text-white p-2 rounded-full">
                <i className="fa-solid fa-camera"></i>
              </span>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleAvatarChange(e.target.files[0])}
              />
            </label>

            <h4 className="mt-4 text-lg font-semibold">
              {user.prenom} {user.name}
            </h4>
            <span className="text-sm text-[#8f7e6b]">Client Premium</span>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-4 py-2 rounded-md bg-[#6b5a49] text-white"
            >
              Modifier Profil
            </button>
          </div>

          {/* INFO GENERALES */}
          <div className="md:w-2/3 p-6 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md">
            <h4 className="text-lg font-semibold mb-4">Information générale</h4>

            {!isEditing ? (
              <>
                <InfoInput icon="fa-solid fa-user" label="Prénom" value={user.prenom} />
                <InfoInput icon="fa-solid fa-id-card" label="Nom" value={user.name} />
                <InfoInput icon="fa-solid fa-envelope" label="Email" value={user.email} />
                <InfoInput icon="fa-solid fa-phone" label="Numéro" value={user.telephone} />
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input className="w-full p-2 rounded" value={user.prenom} onChange={(e)=>setUser({...user, prenom:e.target.value})} placeholder="Prénom" />
                <input className="w-full p-2 rounded" value={user.name} onChange={(e)=>setUser({...user, name:e.target.value})} placeholder="Nom" />
                <input className="w-full p-2 rounded" value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})} placeholder="Email" />
                <input className="w-full p-2 rounded" value={user.telephone} onChange={(e)=>setUser({...user, telephone:e.target.value})} placeholder="Téléphone" />
                <div className="flex gap-2 pt-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded">Sauvegarder</button>
                  <button type="button" onClick={()=>setIsEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* SÉCURITÉ */}
        <div className="p-6 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <i className="fa-solid fa-shield-halved"></i> Sécurité
          </h4>

          <div className="flex justify-between items-center">
            <span>Authentification à deux facteurs</span>
            <Toggle active={twoFA} onClick={() => setTwoFA(!twoFA)} />
          </div>

          <div className="flex justify-between items-center">
            <span>Changer le mot de passe</span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm px-3 py-1 bg-[#6b5a49] text-white rounded"
            >
              Modifier
            </button>
          </div>

          {showPassword && (
            <div className="space-y-2">
              <input type="password" className="w-full p-2 rounded" placeholder="Ancien mot de passe" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
              <input type="password" className="w-full p-2 rounded" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
              <button onClick={handleChangePassword} className="px-4 py-2 bg-green-600 text-white rounded">Valider</button>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-6 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bell"></i>
            <span>Notifications par email</span>
          </div>
          <Toggle active={emailNotif} onClick={() => setEmailNotif(!emailNotif)} />
        </div>

        {/* APPARENCE */}
        <div className="p-6 rounded-xl bg-[#e8dcc7] dark:bg-[#2a2a2a] shadow-md flex justify-between items-center">
          <span>Mode clair</span>
          <Toggle active={lightMode} onClick={() => setLightMode(!lightMode)} />
        </div>
      </div>
    </div>
  );
}
