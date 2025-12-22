import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CardUI({ card, nextCard, prevCard }) {
  if (!card) return null;

  return (
    <div className="relative">
      <div
        className={`w-64 h-36 rounded-xl p-4 text-white shadow-lg
        ${card.status === "blocked"
          ? "bg-gray-800"
          : "bg-gradient-to-br from-blue-600 to-indigo-800"}`}
      >
        {/* BRAND */}
        <div className="flex justify-between text-xs">
          <span>{card.brand || "Mastercard"}</span>
          <span>Carte Débit</span>
        </div>

        {/* NUMÉRO MASQUÉ */}
        <div className="text-lg mt-4 tracking-widest">
          **** **** **** {card.dernierCard}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between mt-4 text-xs">
          <div>
            <div className="opacity-70">EXP</div>
            <div>{card.expiration}</div>
          </div>

          <div>
            <div className="opacity-70">STATUS</div>
            <div className="uppercase">{card.status}</div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <button onClick={prevCard} className="absolute -left-6 top-1/2">
        <FiChevronLeft />
      </button>
      <button onClick={nextCard} className="absolute -right-6 top-1/2">
        <FiChevronRight />
      </button>
    </div>
  );
}
