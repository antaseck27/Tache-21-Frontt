import React, { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis votre assistant BankRewmi. Comment puis-je vous aider ?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]); 

  setTimeout(() => {
    const botResponse = getBotResponse(input);
    setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
  }, 500);

  setInput("");
};


  const getBotResponse = (text) => {
    const message = text.toLowerCase();

    if (message.includes("virement")) {
      return "Pour effectuer un virement, allez dans la section Transfert et suivez les instructions.";
    }
    if (message.includes("Transaction")) {
      return "Rendez-vous dans la section 'Transactions' où vous trouverez l'historique complet de toutes vos opération";
    }
    if (message.includes("carte")) {
      return "Pour commander une nouvelle carte, rendez-vous dans votre Dashboard puis cliquez sur 'Ajouter une carte'.";
    }
    if (message.includes("frais")) {
      return "Les virements internes sont gratuits, les virements internationaux peuvent avoir des frais selon la destination.";
    }
    if (message.includes("sécurité") || message.includes("compte")) {
      return "Nous recommandons d'activer la double authentification (2FA) pour sécuriser votre compte.";
    }
    if (message.includes("Transfert") || message.includes("Transferts")) {
      return "Transferts entre vos comptes BankRewmi sont gratuits et instantanés. Les virements SEPA vers d'autres banques européennes sont également gratuits";
    }
    if (message.includes("bonjour") || message.includes("salut")) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    }

    return "Je suis désolé, je n'ai pas compris. Pouvez-vous reformuler votre question ?";
  };

  // Gérer l'appui sur "Entrée"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[400px] max-h-[400px] w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg max-w-[80%] ${ msg.from === "bot" ? "bg-gray-100 text-gray-800 self-start" : "bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-[#f4efe6] text-white self-end"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Tapez votre message..." className="flex-1 p-2 border rounded-lg focus:outline-none"/>
        <button onClick={sendMessage} className="bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-[#f4efe6] text-white px-4 rounded-lg hover:bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-[#f4efe6]">
          Envoyer
        </button>
      </div>
    </div>
  );
}
