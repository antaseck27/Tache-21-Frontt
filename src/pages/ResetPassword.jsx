import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // Récupère le token depuis l'URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || password.length < 4) return setError("Mot de passe trop court.");
    if (password !== confirmPassword) return setError("Les mots de passe ne correspondent pas.");

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Erreur lors de la réinitialisation.");
        return;
      }

      setMessage(data.message || "Mot de passe réinitialisé avec succès !");

      // Redirection vers login après 2 secondes
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Erreur réseau. Réessayez.");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf8f2] p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-semibold text-[#6b5a49] mb-2">Réinitialiser le mot de passe</h2>
        <p className="text-sm text-[#8f7e6b] mb-6">
          Entrez votre nouveau mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:outline-none focus:ring-2 focus:ring-[#bfa98a]"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:outline-none focus:ring-2 focus:ring-[#bfa98a]"
          />

          {error && <div className="text-red-600 bg-red-50 p-2 rounded text-sm">{error}</div>}
          {message && <div className="text-green-600 bg-green-50 p-2 rounded text-sm">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white font-semibold shadow-md hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Réinitialisation..." : "Réinitialiser"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
