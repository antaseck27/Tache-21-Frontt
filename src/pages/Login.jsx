import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔗 BACKEND URL
  const API = import.meta.env.VITE_API_URL;

  // 🔐 Login classique
  const loginUser = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Erreur lors de la connexion.");
        return null;
      }

      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Erreur réseau. Réessayez.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Veuillez saisir votre email.");
    if (!password || password.length < 4) return setError("Mot de passe invalide.");

    const result = await loginUser();
    if (!result) return;

    navigate("/dashboard");
  };

  // ✅ GOOGLE LOGIN (CORRIGÉ)
  const handleGoogleLogin = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <aside className="hidden md:flex fixed left-0 top-0 w-1/2 h-full items-center justify-center p-8 bg-gradient-to-br from-[#f3e8d7] via-[#e8dcc7] to-[#d8c4a8]">
        <div className="max-w-lg text-[#6b5a49]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <h2 className="text-4xl font-semibold">BankRewmi</h2>
          </div>

          <p className="mb-4">Gérez vos finances simplement.</p>

          <ul className="space-y-3">
            {["Sécurité maximale", "Transactions instantanées", "Support 24/7"].map((text, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* RIGHT */}
      <main className="ml-0 md:ml-[50%] flex-1 flex items-center justify-center p-6 bg-[#fdf8f2]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Connexion</h2>

          {error && <div className="bg-red-100 text-red-600 p-2 mb-2 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeSlashIcon className="w-5" /> : <EyeIcon className="w-5" />}
              </button>
            </div>

            <button type="submit" className="w-full bg-[#6b5a49] text-white py-2 rounded">
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border py-2 rounded flex justify-center items-center gap-2"
            >
              <FcGoogle />
              Se connecter avec Google
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
