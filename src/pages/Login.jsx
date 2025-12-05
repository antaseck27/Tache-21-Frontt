


import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, BanknotesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulation login
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Veuillez saisir votre email.");
    if (!password || password.length < 4) return setError("Mot de passe invalide.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Stockage du token factice
      localStorage.setItem("token", "fake_token_123");
      navigate("/dashboard");
    }, 800);
  };

  const handleGoogleLogin = () => {
    alert("Connexion avec Google (simulation)");
    // Stockage token pour routes protégées
    localStorage.setItem("token", "fake_token_123");
    navigate("/dashboard");
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
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-[#6b5a49]">Connexion</h2>
          <p className="text-sm text-[#8f7e6b]">Entrez vos identifiants pour accéder à votre compte</p>

          {error && (
            <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
            />

            {/* Mot de passe */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Lien Reset */}
            <div className="flex justify-end text-sm">
              <a href="/forgot" className="text-[#bfa98a] font-medium hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton login */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#6b5a49] text-white font-medium text-sm hover:bg-[#5c4d3e]"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 mt-2 rounded-lg border border-[#d8c4a8] flex items-center justify-center gap-2 font-semibold text-[#6b5a49] hover:bg-[#f3e8d7]"
            >
              <FcGoogle className="w-5 h-5" />
              Se connecter avec Google
            </button>
          </form>

          <p className="text-center text-sm text-[#8f7e6b] mt-2">
            Pas de compte ?{" "}
            <a href="/signup" className="text-[#bfa98a] font-medium hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
