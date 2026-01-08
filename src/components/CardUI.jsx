import React from "react";

export default function CardUI({ compte }) {
  const fakeExpiry = "09/30";
  const fakeCVV = "381";

  const accountNumber = compte?.accountNumber
    ? compte.accountNumber.replace(/(.{4})/g, "$1 ")
    : "0000 0000 0000 0000";

  return (
    <div className="relative w-[340px] h-[210px] rounded-2xl 
      bg-gradient-to-br from-[#6b5a49] via-[#8f7e6b] to-[#cbb99a]
      shadow-2xl text-white p-6 overflow-hidden">

      {/* Décor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-80">
            BANK REWMI
          </p>
          <p className="text-sm font-semibold">
            carte bancaire
          </p>
        </div>

        <div className="w-10 h-7 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-sm" />
      </div>

      {/* Numéro */}
      <div className="mt-8 text-lg tracking-widest font-semibold">
        {accountNumber}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between">
        <div>
          <p className="text-[10px] opacity-70">EXP</p>
          <p className="text-sm font-semibold">{fakeExpiry}</p>
        </div>

        <div className="text-right">
          <p className="text-[10px] opacity-70">CVV</p>
          <p className="text-sm font-semibold">{fakeCVV}</p>
        </div>
      </div>
    </div>
  );
}
