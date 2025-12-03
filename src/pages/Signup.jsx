


import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import {
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function SignupCompact() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: null,
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.prenom || !formData.nom)
      return setError("Veuillez saisir votre prénom et nom.");
    if (!formData.email) return setError("Veuillez saisir votre email.");
    if (!formData.password || formData.password.length < 4)
      return setError("Mot de passe trop court.");

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <aside className="hidden md:flex fixed left-0 top-0 w-1/2 h-full items-center justify-center p-8 bg-gradient-to-br from-[#f3e8d7] via-[#e8dcc7] to-[#d8c4a8]">
        <div className="max-w-lg text-[#6b5a49]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
              <BanknotesIcon className="w-9 h-9 text-[#6b5a49]" />
            </div>
            <h1 className="text-4xl font-semibold">BankApp</h1>
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

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Prénom & Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(e) => updateField("prenom", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
              />
              <input
                type="text"
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) => updateField("nom", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
              />
            </div>

            {/* Email + Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={(e) => updateField("telephone", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
              />
            </div>

            {/* Date de naissance */}
            <Calendar
              value={formData.dateNaissance}
              onChange={(e) => updateField("dateNaissance", e.value)}
              showIcon
              dateFormat="dd/mm/yy"
              className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] text-sm"
              
            />

            {/* Mot de passe */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8f7e6b]"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#6b5a49] text-white font-medium text-sm hover:bg-[#5c4d3e]"
            >
              Créer mon compte
            </button>
          </form>

          {/* Lien Se connecter */}
          <p className="text-center text-sm text-[#8f7e6b] mt-2">
            Déjà un compte ?{" "}
            <a href="/login" className="text-[#bfa98a] font-medium hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
