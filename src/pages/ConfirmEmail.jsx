import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function ConfirmEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const res = await fetch(`${API}/auth/confirm-email/${token}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          return;
        }

        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    confirmAccount();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === "loading" && <p>Confirmation en cours...</p>}
      {status === "success" && (
        <div>
          <h2 className="text-green-600 text-xl font-bold">
            Compte activé avec succès 
          </h2>
          <a href="/login" className="text-blue-600 underline">
            Se connecter
          </a>
        </div>
      )}
      {status === "error" && (
        <p className="text-red-600">
          Lien invalide ou expiré 
        </p>
      )}
    </div>
  );
}
