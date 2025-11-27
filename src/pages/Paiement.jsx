import React, { useState } from "react";
import {
  BanknotesIcon,
  CreditCardIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

export default function Paiement() {
  const [type, setType] = useState("facture");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Paiement</h1>

      {/* Choix du type de paiement */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setType("facture")}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
            type === "facture"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <CreditCardIcon className="w-6 h-6" />
          Facture
        </button>

        <button
          onClick={() => setType("marchand")}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
            type === "marchand"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <BuildingStorefrontIcon className="w-6 h-6" />
          Marchand
        </button>

        <button
          onClick={() => setType("mobile")}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
            type === "mobile"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <PhoneIcon className="w-6 h-6" />
          Mobile Money
        </button>

        <button
          onClick={() => setType("autre")}
          className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
            type === "autre"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <BanknotesIcon className="w-6 h-6" />
          Autre
        </button>
      </div>

      {/* Formulaire dynamique */}
      <div className="bg-white shadow p-6 rounded-xl max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Paiement : <span className="capitalize">{type}</span>
        </h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Montant</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Ex: 15000"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              {type === "mobile"
                ? "Numéro Mobile Money"
                : type === "marchand"
                ? "ID Marchand"
                : type === "facture"
                ? "Numéro de facture"
                : "Référence"}
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Saisir ici…"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Confirmer le Paiement
          </button>
        </form>
      </div>
    </div>
  );
}
