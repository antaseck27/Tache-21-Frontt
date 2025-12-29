import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) return setError("Veuillez saisir votre email.");
    if (!emailRegex.test(email)) return setError("Email invalide.");

    try {
      setLoading(true);

      const res = await fetch(`https://banking-backend-rtsx.onrender.com/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Erreur lors de l'envoi du mail.");
        return;
      }

      setMessage(data.message || "Un lien de réinitialisation a été envoyé à votre email.");

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
        <h2 className="text-2xl font-semibold text-[#6b5a49] mb-2">Mot de passe oublié</h2>
        <p className="text-sm text-[#8f7e6b] mb-6">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#6b5a49]">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:outline-none focus:ring-2 focus:ring-[#bfa98a]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <div className="text-red-600 bg-red-50 p-2 rounded text-sm">{error}</div>}
          {message && <div className="text-green-600 bg-green-50 p-2 rounded text-sm">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white font-semibold shadow-md hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8f7e6b] mt-6">
          Retour à{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#bfa98a] font-medium cursor-pointer"
          >
            la connexion
          </span>
        </p>
      </motion.div>
    </div>
  );
}
