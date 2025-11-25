

// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
BanknotesIcon,
CheckCircleIcon,
EyeIcon,
EyeSlashIcon,
} from "@heroicons/react/24/outline";

/**
* 
* - loading state (désactive le bouton pendant "connexion")
* - redirection vers /dashboard via useNavigate (pas de backend requis)
* - Commentaires indiquant où intégrer le backend (fetch/axios)

* Image (texture/gauche) : /mnt/data/IMG_4CBB6992-D35B-42BB-B611-26B53B2D38E2.jpeg
*/

export default function Login() {
// chemin local image ( utiliser une texture à gauche)
const IMAGE_PATH = "/mnt/data/IMG_4CBB6992-D35B-42BB-B611-26B53B2D38E2.jpeg";

const navigate = useNavigate();

// états
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [remember, setRemember] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

// simple regex email (utile côté client)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// handler formulaire
const handleSubmit = async (e) => {
e.preventDefault();
setError("");

// validations basiques
if (!email.trim()) {
setError("Veuillez saisir votre email.");
return;
}
if (!emailRegex.test(email)) {
setError("Email invalide.");
return;
}
if (!password || password.length < 4) {
setError("Mot de passe invalide (>=4 caractères).");
return;
}

// ====== Intégration backend (expliqué) ======
// Ici  appeler API d'authentification (fetch/axios).
// 
//
// setLoading(true);
// try {
// const res = await fetch("https://ton-backend/api/login", {
// method: "POST",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({ email, password }),
// });
// const data = await res.json();
// if (!res.ok) throw new Error(data.message || "Erreur d'authentification");
// // Exemple : stocker un token si l'API renvoie un token
// // localStorage.setItem("token", data.token);
// // Rediriger vers le dashboard
// navigate("/dashboard");
// } catch (err) {
// setError(err.message || "Erreur réseau");
// } finally {
// setLoading(false);
// }
//
//  on simule un court délai puis on redirige.
// =============================================

setLoading(true);
// simulation d'une requête réseau (pour l'UX)
setTimeout(() => {
setLoading(false);
// stocker un drapeau "connecté" temporaire :
if (remember) {
    localStorage.setItem("token", "1");
// localStorage.setItem("fake_auth", "1"); // exemple pédagogique
} else {
    localStorage.setItem("token", "1");
// sessionStorage.setItem("fake_auth", "1");
}
// navigation côté client (pas de reload)
navigate("/dashboard");
}, 800);
};

return (
<div className="min-h-screen flex">
<aside
className="hidden md:flex md:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500"
//  image uploadée comme texture + overlay, remplace le style commenté ci-dessous :
// style={{
// backgroundImage: `linear-gradient(135deg, rgba(43,122,217,0.72), rgba(122,43,217,0.55)), url('${IMAGE_PATH}')`,
// backgroundSize: "cover",
// backgroundPosition: "center",
// }}
>
<div className="max-w-lg text-white">
<div className="flex items-center gap-4 mb-4">
<div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
<BanknotesIcon className="w-8 h-8 text-white" />
</div>
<h1 className="text-4xl font-semibold">BankApp</h1>
</div>

<p className="text-lg text-white/90 mb-8">
Gérez vos finances en toute simplicité avec notre plateforme bancaire moderne et sécurisée.
</p>

<ul className="space-y-5">
<li className="flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
<CheckCircleIcon className="w-6 h-6 text-white" />
</div>
<div>
<div className="font-semibold">Sécurité maximale</div>
<div className="text-sm text-white/90">Vos données sont protégées</div>
</div>
</li>

<li className="flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
<CheckCircleIcon className="w-6 h-6 text-white" />
</div>
<div>
<div className="font-semibold">Transactions instantanées</div>
<div className="text-sm text-white/90">Transferts en temps réel</div>
</div>
</li>

<li className="flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
<CheckCircleIcon className="w-6 h-6 text-white" />
</div>
<div>
<div className="font-semibold">Support 24/7</div>
<div className="text-sm text-white/90">Assistance disponible à tout moment</div>
</div>
</li>
</ul>
</div>
</aside>

{/* RIGHT: formulaire */}
<main className="flex-1 flex items-center justify-center p-8">
<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
<h2 className="text-2xl font-semibold text-gray-800">Connexion</h2>
<p className="text-sm text-gray-500 mt-1 mb-6">Entrez vos identifiants pour accéder à votre compte</p>

<form onSubmit={handleSubmit} className="space-y-4">
{/* Email */}
<div>
<label className="block text-sm font-medium text-gray-700">Email</label>
<input
type="email"
className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
placeholder="votre@email.com"
value={email}
onChange={(e) => setEmail(e.target.value)}
aria-label="email"
/>
</div>

{/* Password */}
<div>
<label className="block text-sm font-medium text-gray-700">Mot de passe</label>
<div className="mt-2 relative">
<input
type={showPassword ? "text" : "password"}
className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
placeholder="••••••••"
value={password}
onChange={(e) => setPassword(e.target.value)}
aria-label="mot-de-passe"
/>

{/* toggle show/hide */}
<button
type="button"
onClick={() => setShowPassword((s) => !s)}
className="absolute inset-y-0 right-3 flex items-center text-gray-500"
aria-label="Afficher ou masquer le mot de passe"
>
{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
</button>
</div>
</div>

{/* remember + forgot */}
<div className="flex items-center justify-between text-sm">
<label className="inline-flex items-center gap-2 text-gray-700">
<input
type="checkbox"
checked={remember}
onChange={(e) => setRemember(e.target.checked)}
className="h-4 w-4 text-blue-600 border-gray-300 rounded"
/>
Se souvenir de moi
</label>

<a href="/forgot" className="text-blue-600 font-medium">
Mot de passe oublié ?
</a>
</div>

{/* erreur */}
{error && <div className="text-red-600 bg-red-50 p-2 rounded text-sm">{error}</div>}

{/* bouton */}
<button
type="submit"
disabled={loading}
className="w-full mt-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-md hover:opacity-95 disabled:opacity-60"
>
{loading ? "Connexion..." : "Se connecter"}
</button>
</form>

<p className="text-center text-sm text-gray-500 mt-6">
Vous n'avez pas de compte ?{" "}
<a href="/signup" className="text-blue-600 font-medium">
S'inscrire
</a>
</p>
</div>
</main>
</div>
);
}
