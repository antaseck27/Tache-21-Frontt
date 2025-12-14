import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import dayjs from "dayjs";

const API = import.meta.env.VITE_API_URL;

export default function SignupCompact() {
  const [formData, setFormData] = useState({
    prenom: "",
    name: "",
    email: "",
    telephone: "",
    dateNaissance: null,
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fonction API pour inscrire l'utilisateur
  const registerUser = async () => {
    try {
      setLoading(true);

      // Convertir la date en ISO string pour MongoDB
      const isoDate = formData.dateNaissance
        ? formData.dateNaissance.toISOString()
        : null;

      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: formData.prenom,
          name: formData.name,
          email: formData.email,
          telephone: formData.telephone,
          dateDeNaissance: isoDate, 
          password: formData.password
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Erreur lors de l'inscription.");
        return null;
      }

      return data;
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Erreur réseau. Réessayez.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.prenom || !formData.name)
      return setError("Veuillez saisir votre prénom et nom.");
    if (!formData.email)
      return setError("Veuillez saisir votre email.");
    if (!formData.password || formData.password.length < 4)
      return setError("Mot de passe trop court.");

    const result = await registerUser();
    if (!result) return;

    // Formater la date pour le message de succès
    const formattedDate = dayjs(result.user.dateDeNaissance).format("DD/MM/YYYY");
    setSuccessMessage(
      `Compte créé avec succès pour ${result.user.prenom} ${result.user.name}, né(e) le ${formattedDate}`
    );

    // Redirection après 2 secondes
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <aside className="hidden md:flex fixed left-0 top-0 w-1/2 h-full items-center justify-center p-8 bg-gradient-to-br from-[#f3e8d7] via-[#e8dcc7] to-[#d8c4a8]">
        <div className="max-w-lg text-[#6b5a49]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
              <div className="sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                <img src={logo} alt="logo" className="shadow-s object-contain" />
              </div>
            </div>
            <h2 className="text-4xl font-semibold">BankRewmi</h2>
          </div>
          <p className="text-base text-[#6b5a49]/90 mb-4">
            Gérez vos finances simplement avec notre plateforme moderne.
          </p>
          <ul className="space-y-3">
            {["Sécurité maximale", "Transactions instantanées", "Support 24/7"].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-[#6b5a49]" />
                </div>
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="ml-0 md:ml-[50%] flex-1 flex items-center justify-center p-6 bg-[#fdf8f2]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 space-y-3">
          <h2 className="text-2xl font-semibold text-[#6b5a49]">Créer un compte</h2>
          <p className="text-sm text-[#8f7e6b]">Remplissez vos informations</p>

          {error && (
            <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">{error}</div>
          )}

          {successMessage && (
            <div className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Prénom & Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input type="text" placeholder="Prénom" value={formData.prenom} onChange={e => updateField("prenom", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm" />
              <input type="text" placeholder="Nom" value={formData.name} onChange={e => updateField("name", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm" />
            </div>

            {/* Email + Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input type="email" placeholder="Email" value={formData.email} onChange={e => updateField("email", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm" />
              <input type="tel" placeholder="Téléphone" value={formData.telephone} onChange={e => updateField("telephone", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm" />
            </div>

            {/* Date de naissance */}
            <Calendar value={formData.dateNaissance} onChange={e => updateField("dateNaissance", e.value)} showIcon dateFormat="dd/mm/yy" placeholder="Date de naissance" className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] text-sm" />

            {/* Mot de passe */}
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" value={formData.password} onChange={e => updateField("password", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8f7e6b]">
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <button type="submit" className="w-full py-2 rounded-lg bg-[#6b5a49] text-white font-medium text-sm hover:bg-[#5c4d3e]">
              {loading ? "Inscription..." : "Créer mon compte"}
            </button>
          </form>

          {/* Lien Se connecter */}
          <p className="text-center text-sm text-[#8f7e6b] mt-2">
            Déjà un compte ? <a href="/login" className="text-[#bfa98a] font-medium hover:underline">Se connecter</a>
          </p>
        </div>
      </main>
    </div>
  );
}
