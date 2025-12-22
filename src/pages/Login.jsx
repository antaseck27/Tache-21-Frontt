// import React, { useState } from "react";
// import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API = import.meta.env.VITE_API_URL;

//   // Appel API login
//   const loginUser = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(`${API}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (!res.ok) {
//         setError(data.message || "Erreur lors de la connexion.");
//         return null;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       return data;

//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       setError("Erreur réseau. Réessayez.");
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email.trim()) return setError("Veuillez saisir votre email.");
//     if (!password || password.length < 4) return setError("Mot de passe invalide.");

//     const result = await loginUser();
//     if (!result) return;

//      setTimeout(() => {
//       navigate("/dashboard");
//     }, 1000);
    
//   };

//   //  Nouveau : Login Google
//   const handleGoogleLogin = async () => {
//     try {
//       // Récupérer l'URL d'authentification Google depuis le backend
//       const res = await fetch(`${API}/api/auth/google/config`);
//       const data = await res.json();

//       if (data.googleEnabled && data.url) {
//         // Redirection vers Google
//         window.location.href = data.url;
//       } else {
//         setError("Connexion Google non configurée.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Impossible de se connecter via Google.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* LEFT PANEL */}
//       <aside className="hidden md:flex fixed left-0 top-0 w-1/2 h-full items-center justify-center p-8 bg-gradient-to-br from-[#f3e8d7] via-[#e8dcc7] to-[#d8c4a8]">
//         <div className="max-w-lg text-[#6b5a49]">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
//               <div className="sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
//                 <img src={logo} alt="logo" className="object-contain" />
//               </div>
//             </div>
//             <h2 className="text-4xl font-semibold">BankRewmi</h2>
//           </div>
//           <p className="text-base text-[#6b5a49]/90 mb-4">
//             Gérez vos finances simplement avec notre plateforme moderne.
//           </p>
//           <ul className="space-y-3">
//             {["Sécurité maximale", "Transactions instantanées", "Support 24/7"].map((text, i) => (
//               <li key={i} className="flex items-start gap-3 text-sm">
//                 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//                   <CheckCircleIcon className="w-5 h-5 text-[#6b5a49]" />
//                 </div>
//                 <span className="font-medium">{text}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </aside>

//       {/* RIGHT PANEL */}
//       <main className="ml-0 md:ml-[50%] flex-1 flex items-center justify-center p-6 bg-[#fdf8f2]">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-3">
//           <h2 className="text-2xl font-semibold text-[#6b5a49]">Connexion</h2>
//           <p className="text-sm text-[#8f7e6b]">Entrez vos identifiants pour accéder à votre compte</p>

//           {error && (
//             <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-2">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Mot de passe"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8f7e6b]"
//               >
//                 {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//               </button>
//             </div>

//             <div className="flex justify-end text-sm">
//               <a href="/forgot" className="text-[#bfa98a] font-medium hover:underline">
//                 Mot de passe oublié ?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 rounded-lg bg-[#6b5a49] text-white font-medium text-sm hover:bg-[#5c4d3e]"
//             >
//               {loading ? "Connexion..." : "Se connecter"}
//             </button>

//             {/*  Bouton Google */}
//             <button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="w-full py-2 mt-2 rounded-lg border border-[#d8c4a8] flex items-center justify-center gap-2 font-semibold text-[#6b5a49] hover:bg-[#f3e8d7]"
//             >
//               <FcGoogle className="w-5 h-5" />
//               Se connecter avec Google
//             </button>
//           </form>

//           <p className="text-center text-sm text-[#8f7e6b] mt-2">
//             Pas de compte ?{" "}
//             <a href="/signup" className="text-[#bfa98a] font-medium hover:underline">
//               S’inscrire
//             </a>
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); // Pour 2FA
  const [step, setStep] = useState("login"); // "login" ou "2fa"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  // ---------------- LOGIN ----------------
  const loginUser = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Erreur lors de la connexion.");
        return null;
      }

      // 2FA requis
      if (data.twoFactorRequired) {
        setStep("2fa");
        setUserId(data.userId);
        return null;
      }

      // Pas de 2FA
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      return data;

    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Erreur réseau. Réessayez.");
      return null;
    }
  };

  // ---------------- VERIFICATION 2FA ----------------
  const verify2FA = async () => {
    if (!code.trim()) return setError("Veuillez saisir le code.");

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/verify-email-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Code invalide.");
        return null;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      return data;

    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Erreur réseau. Réessayez.");
      return null;
    }
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "login") {
      await loginUser();
    } else if (step === "2fa") {
      await verify2FA();
    }
  };

  // ---------------- LOGIN GOOGLE ----------------
  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(`${API}/api/auth/google/config`);
      const data = await res.json();

      if (data.googleEnabled && data.url) {
        window.location.href = data.url;
      } else {
        setError("Connexion Google non configurée.");
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de se connecter via Google.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <aside className="hidden md:flex fixed left-0 top-0 w-1/2 h-full items-center justify-center p-8 bg-gradient-to-br from-[#f3e8d7] via-[#e8dcc7] to-[#d8c4a8]">
        <div className="max-w-lg text-[#6b5a49]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
              <div className="sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                <img src={logo} alt="logo" className="object-contain" />
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
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-[#6b5a49]">Connexion</h2>
          <p className="text-sm text-[#8f7e6b]">Entrez vos identifiants pour accéder à votre compte</p>

          {error && (
            <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {step === "login" && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
                />
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
              </>
            )}

            {step === "2fa" && (
              <>
                <p className="text-sm mb-1">Un code a été envoyé à votre email</p>
                <input
                  type="text"
                  placeholder="Code validation"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#d8c4a8] bg-[#fdf8f2] focus:ring-2 focus:ring-[#bfa98a] text-sm"
                />
              </>
            )}

            <div className="flex justify-end text-sm">
              <a href="/forgot" className="text-[#bfa98a] font-medium hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#6b5a49] text-white font-medium text-sm hover:bg-[#5c4d3e]"
              disabled={loading}
            >
              {loading ? (step === "login" ? "Connexion..." : "Validation...") : (step === "login" ? "Se connecter" : "Valider le code")}
            </button>

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
              S’inscrire
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
