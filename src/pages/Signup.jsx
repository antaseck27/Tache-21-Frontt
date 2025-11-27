

// src/components/SignupTailwind_V2.js
import React, { useState } from "react";
import {
  BanknotesIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

export default function SignupTailwindV2() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!prenom || !nom) return setError("Veuillez saisir votre prénom et nom.");
    if (!email) return setError("Veuillez saisir votre email.");
    if (password.length < 4) return setError("Le mot de passe doit comporter au moins 4 caractères.");

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
        <aside className="hidden md:flex fixed left-0 top-0 w-1/2 h-full items-center justify-center p-12 bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500">

      {/* <aside className="hidden md:flex  md:flex  md:w-1/2 items-center justify-center p-10 bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500"> */}
        <div className="max-w-lg text-white">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
              <BanknotesIcon className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-4xl font-semibold">BankApp</h1>
          </div>

          <p className="text-base text-white/90 mb-6">
            Gérez vos finances en toute simplicité avec notre plateforme bancaire moderne et sécurisée.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Sécurité maximale</div>
                <div className="text-sm text-white/90">Vos données sont protégées</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Transactions instantanées</div>
                <div className="text-sm text-white/90">Transferts en temps réel</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Support 24/7</div>
                <div className="text-sm text-white/90">Assistance disponible à tout moment</div>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* RIGHT FORM - ESPACEMENTS RÉDUITS */}
      {/* <main className="flex-1 flex items-center justify-center p-6"> */}
        <main className="ml-0 md:ml-[50%] flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold text-gray-800">Créer un compte</h2>
          <p className="text-sm text-gray-500 mt-1 mb-5">
            Remplissez les informations ci-dessous pour créer votre compte
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Prénom & Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    placeholder="idrissa"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <UserIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    placeholder="Ndiaye"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <UserIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1.5 relative">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <div className="mt-1.5 relative">
                <input
                  type="tel"
                  placeholder="+221 78 117 49 76"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <PhoneIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse</label>
              <div className="mt-1.5 relative">
                <input
                  type="text"
                  placeholder="Scat urbam"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <MapPinIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
              <div className="mt-1.5 relative">
                <input
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <CalendarIcon className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <div className="mt-1.5 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-12 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 bg-red-50 p-2 rounded text-sm">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-md hover:opacity-95"
            >
              S'inscrire
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Vous avez déjà un compte ? <a href="/login" className="text-blue-600 font-medium">Se connecter</a>
          </p>
        </div>
      </main>
    </div>
  );
}
