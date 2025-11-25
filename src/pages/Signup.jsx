

// src/components/SignupTailwind.js
import React, { useState } from "react";
import {
BanknotesIcon,
CheckCircleIcon,
EyeIcon,
EyeSlashIcon,
EnvelopeIcon,
LockClosedIcon
} from "@heroicons/react/24/outline";

export default function SignupTailwind() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");

const handleSubmit = (e) => {
e.preventDefault();
setError("");

if (!email) return setError("Veuillez saisir votre email.");
if (password.length < 4)
return setError("Le mot de passe doit comporter au moins 4 caractères.");

// Simulation backend + redirection
window.location.href = "/dashboard";
};

return (
<div className="min-h-screen flex">
{/* LEFT : panneau design */}
<aside
className="hidden md:flex md:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500"
>
<div className="max-w-lg text-white">

{/* Logo */}
<div className="flex items-center gap-4 mb-4">
<div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
<BanknotesIcon className="w-9 h-9 text-white" />
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

{/* RIGHT : formulaire signup */}
<main className="flex-1 flex items-center justify-center p-8">
<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

<h2 className="text-2xl font-semibold text-gray-800">Créer un compte</h2>
<p className="text-sm text-gray-500 mt-1 mb-6">
Remplissez les informations ci-dessous pour créer votre compte
</p>

<form onSubmit={handleSubmit} className="space-y-5">

{/* Email */}
<div>
<label className="block text-sm font-medium text-gray-700">Email</label>
<div className="mt-2 relative">
<input
type="email"
className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
placeholder="votre@email.com"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<EnvelopeIcon className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
</div>
</div>

{/* Mot de passe */}
<div>
<label className="block text-sm font-medium text-gray-700">Mot de passe</label>
<div className="mt-2 relative">
<input
type={showPassword ? "text" : "password"}
className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
placeholder="••••••••"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />

<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute inset-y-0 right-3 flex items-center text-gray-500"
>
{showPassword ? (
<EyeSlashIcon className="w-5 h-5" />
) : (
<EyeIcon className="w-5 h-5" />
)}
</button>
</div>
</div>

{/* Error */}
{error && (
<div className="text-red-600 bg-red-50 p-2 rounded text-sm">
{error}
</div>
)}

{/* Submit button */}
<button
type="submit"
className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-md hover:opacity-95"
>
S'inscrire
</button>
</form>

<p className="text-center text-sm text-gray-500 mt-6">
Vous avez déjà un compte ?{" "}
<a href="/login" className="text-blue-600 font-medium">Se connecter</a>
</p>
</div>
</main>
</div>
);
}

