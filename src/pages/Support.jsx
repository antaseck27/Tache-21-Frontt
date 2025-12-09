// import React, { useState } from "react";
// import Input from "../components/input";
// import ChatBot from "../components/chatbot";

// export default function Support() {
//   const [showChat, setShowChat] = useState(false);
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "Comment effectuer un virement ?",
//       answer:
//         "Pour effectuer un virement, rendez-vous dans la section 'Transfert', choisissez le type de virement (interne ou externe), remplissez les informations nécessaires (destinataire, montant, description) et validez. Les virements internes sont instantanés, les virements SEPA peuvent prendre 1 à 3 jours ouvrés.",
//     },
//     {
//       question: "Comment sécuriser un compte?",
//       answer:
//         "Nous vous recommandons d'activer l'authentification à deux facteurs (2FA) dans les paramètres de sécurité. Vous pouvez également activer l'authentification biométrique si votre appareil le permet. Assurez-vous d'utiliser un mot de passe fort et unique, et changez-le régulièrement.",
//     },
//     {
//       question: "Quels sont les frais de transaction ?",
//       answer:
//         "Les transferts entre vos comptes BankApp sont gratuits et instantanés. Les virements SEPA vers d'autres banques européennes sont également gratuits. Les virements internationaux peuvent engendrer des frais selon la destination et le montant.",
//     },
//     {
//       question: "Comment obtenir une nouvelle carte bancaire ?",
//       answer:
//         "Vous pouvez commander une nouvelle carte dans la section 'Dashboard' en cliquant sur 'Ajouter une carte'. Sélectionnez le type de carte souhaité, confirmez votre adresse de livraison et validez. Votre nouvelle carte sera livrée sous 5 à 7 jours ouvrés.",
//     },
//     {
//       question: "Comment consulter mon historique de transaction ?",
//       answer:
//         "Rendez-vous dans la section 'Transactions' où vous trouverez l'historique complet de toutes vos opérations. Vous pouvez filtrer par date, type (revenus/dépenses), catégorie et utiliser la barre de recherche pour trouver une transaction spécifique.",
//     },
//     {
//       question: "Que faire en cas de fraude ou de transaction suspecte ?",
//       answer:
//         "En cas de suspicion de fraude, contactez immédiatement notre service client au 0800 XXX XXX (disponible 24/7). Nous bloquerons votre carte et ouvrirons une enquête. Vous pouvez également signaler une transaction directement depuis votre historique.",
//     },
//     {
//       question: "Comment modifier mes informations personnelles ?",
//       answer:
//         "Accédez à la section 'Profil' et cliquez sur 'Modifier'. Vous pourrez mettre à jour vos informations (nom, email, téléphone, adresse). N'oubliez pas de cliquer sur 'Enregistrer' pour valider vos modifications.",
//     },
//     {
//       question: "Puis-je utiliser BankApp à l'étranger ?",
//       answer:
//         "En cas de suspicion de fraude, contactez immédiatement notre service client au 0800 XXX XXX (disponible 24/7). Nous bloquerons votre carte et ouvrirons une enquête. Vous pouvez également signaler une transaction directement depuis votre historique.",
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setEmail("");
//     setSubject("");
//     setMessage("");
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
//           Support & Aide
//         </h2>
//         <p className="text-gray-600 animate-wiggle text-sm md:text-base">
//           Nous sommes là pour vous aider 24/7
//         </p>
//       </div>

//       {/* Contact cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//         <div className="rounded-xl p-6 shadow-sm bg-white text-center flex flex-col items-center">
//           <div className="text-4xl text-blue-500 mb-3">
//             <i className="bi bi-telephone"></i>
//           </div>
//           <p className="text-lg font-semibold">Par téléphone</p>
//           <p className="text-sm text-gray-500 mb-2">Disponible 24h/24, 7j/7</p>
//           <p className="text-blue-600 font-medium">0800 XXX XXX</p>
//         </div>

//         <div className="rounded-xl p-6 shadow-sm bg-white text-center flex flex-col items-center">
//           <div className="text-4xl text-purple-500 mb-3">
//             <i className="bi bi-chat-dots"></i>
//           </div>
//           <p className="text-lg font-semibold">Chat en direct</p>
//           <p className="text-sm text-gray-500 mb-2">
//             Réponse en moins de 2 min
//           </p>

//           <button
//             onClick={() => setShowChat(true)}
//             className="text-purple-600 font-medium underline"
//           >
//             Démarrer le chat
//           </button>
//         </div>

//         <div className="rounded-xl p-6 shadow-sm bg-white text-center flex flex-col items-center">
//           <div className="text-4xl text-green-500 mb-3">
//             <i className="bi bi-envelope"></i>
//           </div>
//           <p className="text-lg font-semibold">Par email</p>
//           <p className="text-sm text-gray-500 mb-2">Réponse sous 24h</p>
//           <p className="text-green-600 font-medium">bankrewmi@gmail.com</p>
//         </div>
//       </div>

//       {/* FAQ + Sidebar */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* FAQ */}
//         <div className="lg:col-span-2 rounded-xl bg-white shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-1">Questions fréquentes</h2>
//           <p className="text-sm text-gray-500 mb-4">
//             Trouvez rapidement des réponses à vos questions
//           </p>

//           <div className="divide-y">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="py-3 cursor-pointer"
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm sm:text-base">{faq.question}</span>
//                   <i
//                     className={`bi bi-chevron-down transition-transform ${
//                       openIndex === index ? "rotate-180" : ""
//                     }`}
//                   ></i>
//                 </div>
//                 <div
//                   className={`mt-2 text-sm text-gray-600 ${
//                     openIndex === index ? "" : "hidden"
//                   }`}
//                 >
//                   {faq.answer}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <div className="rounded-xl bg-white shadow-sm p-6">
//             <h2 className="text-lg font-semibold mb-4">État des services</h2>
//             <ul className="space-y-2">
//               {["Virements", "Paiements", "Cartes", "Application"].map(
//                 (service) => (
//                   <li key={service} className="flex justify-between">
//                     {service}
//                     <span className="text-green-600">Opérationnel</span>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           <div className="rounded-xl bg-white shadow-sm p-6">
//             <h2 className="text-lg font-semibold mb-4">Nous contacter</h2>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <Input
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Entrez votre email"
//               />

//               <Input
//                 label="Sujet"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 placeholder="Sujet du message"
//               />

//               <div className="flex flex-col gap-2 my-2 w-full">
//                 <label className="font-medium text-sm">Message</label>
//                 <textarea
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Votre message"
//                   rows={4}
//                   className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] text-white py-3 rounded-lg flex items-center justify-center gap-2"
//               >
//                 <i className="bi bi-send"></i> Envoyer le message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Ressources utiles */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-white shadow-sm p-6 mt-6">
//         <h3 className="text-xl font-semibold mb-4 col-span-2">
//           Ressources utiles
//         </h3>

//         <div className="flex items-start gap-3 rounded-xl bg-gray-100 shadow-sm p-4">
//           <i className="fa-regular fa-circle-question text-xl text-blue-500 p-2"></i>
//           <div>
//             <h2 className="font-semibold">Guide d'utilisation</h2>
//             <p className="text-sm text-gray-600">
//               Découvrez et utilisez toutes les fonctionnalités
//             </p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3 rounded-xl bg-gray-100 shadow-sm p-4">
//           <i className="fa-regular fa-circle-play text-xl text-purple-500 p-2"></i>
//           <div>
//             <h2 className="font-semibold">Tutoriels vidéo</h2>
//             <p className="text-sm text-gray-600">
//               Apprenez avec nos tutoriels pas à pas
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Chat Modal */}
//       {showChat && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/30 backdrop-blur-sm"
//             onClick={() => setShowChat(false)}
//           ></div>

//           <div className="relative bg-white rounded-xl shadow-xl w-full sm:w-[90%] max-w-md p-6 z-10 flex flex-col">
//             <button
//               onClick={() => setShowChat(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <i className="fa-solid fa-x"></i>
//             </button>

//             <ChatBot />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// src/pages/Support.jsx
import React, { useState } from "react";
import Input from "../components/input";
import ChatBot from "../components/chatbot";

export default function Support() {
const [showChat, setShowChat] = useState(false);
const [email, setEmail] = useState("");
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const [openIndex, setOpenIndex] = useState(null);

const faqs = [
{
question: "Comment effectuer un virement ?",
answer:
"Pour effectuer un virement, rendez-vous dans la section 'Transfert', choisissez le type de virement (interne ou externe), remplissez les informations nécessaires (destinataire, montant, description) et validez. Les virements internes sont instantanés, les virements SEPA peuvent prendre 1 à 3 jours ouvrés.",
},
{
question: "Comment sécuriser un compte?",
answer:
"Nous vous recommandons d'activer l'authentification à deux facteurs (2FA) dans les paramètres de sécurité. Vous pouvez également activer l'authentification biométrique si votre appareil le permet. Assurez-vous d'utiliser un mot de passe fort et unique, et changez-le régulièrement.",
},
{
question: "Quels sont les frais de transaction ?",
answer:
"Les transferts entre vos comptes BankApp sont gratuits et instantanés. Les virements SEPA vers d'autres banques européennes sont également gratuits. Les virements internationaux peuvent engendrer des frais selon la destination et le montant.",
},
{
question: "Comment obtenir une nouvelle carte bancaire ?",
answer:
"Vous pouvez commander une nouvelle carte dans la section 'Dashboard' en cliquant sur 'Ajouter une carte'. Sélectionnez le type de carte souhaité, confirmez votre adresse de livraison et validez. Votre nouvelle carte sera livrée sous 5 à 7 jours ouvrés.",
},
{
question: "Comment consulter mon historique de transaction ?",
answer:
"Rendez-vous dans la section 'Transactions' où vous trouverez l'historique complet de toutes vos opérations. Vous pouvez filtrer par date, type (revenus/dépenses), catégorie et utiliser la barre de recherche pour trouver une transaction spécifique.",
},
{
question: "Que faire en cas de fraude ou de transaction suspecte ?",
answer:
"En cas de suspicion de fraude, contactez immédiatement notre service client au 0800 XXX XXX (disponible 24/7). Nous bloquerons votre carte et ouvrirons une enquête. Vous pouvez également signaler une transaction directement depuis votre historique.",
},
{
question: "Comment modifier mes informations personnelles ?",
answer:
"Accédez à la section 'Profil' et cliquez sur 'Modifier'. Vous pourrez mettre à jour vos informations (nom, email, téléphone, adresse). N'oubliez pas de cliquer sur 'Enregistrer' pour valider vos modifications.",
},
{
question: "Puis-je utiliser BankApp à l'étranger ?",
answer:
"En cas de suspicion de fraude, contactez immédiatement notre service client au 0800 XXX XXX (disponible 24/7). Nous bloquerons votre carte et ouvrirons une enquête. Vous pouvez également signaler une transaction directement depuis votre historique.",
},
];

const toggleFAQ = (index) => {
setOpenIndex(openIndex === index ? null : index);
};

const handleSubmit = (e) => {
e.preventDefault();
setEmail("");
setSubject("");
setMessage("");
};

return (
<div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen bg-[#f7f3ee] dark:bg-[#1a1a1a] transition-colors duration-300">
{/* Header */}
<div className="text-center mb-10">
<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#6b5a49] dark:text-[#f1e8dc]">
Support & Aide
</h2>
<p className="text-gray-600 dark:text-[#d6c5a9] animate-wiggle text-sm md:text-base">
Nous sommes là pour vous aider 24/7
</p>
</div>

{/* Contact cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
<div className="rounded-xl p-6 shadow-sm bg-white dark:bg-[#2a2a2a] text-center flex flex-col items-center transition-colors">
<div className="text-4xl text-blue-500 mb-3">
<i className="bi bi-telephone"></i>
</div>
<p className="text-lg font-semibold text-[#3a2f24] dark:text-[#f1e8dc]">Par téléphone</p>
<p className="text-sm text-gray-500 dark:text-[#bfb6a5] mb-2">Disponible 24h/24, 7j/7</p>
<p className="text-blue-600 font-medium">0800 XXX XXX</p>
</div>

<div className="rounded-xl p-6 shadow-sm bg-white dark:bg-[#2a2a2a] text-center flex flex-col items-center transition-colors">
<div className="text-4xl text-purple-500 mb-3">
<i className="bi bi-chat-dots"></i>
</div>
<p className="text-lg font-semibold text-[#3a2f24] dark:text-[#f1e8dc]">Chat en direct</p>
<p className="text-sm text-gray-500 dark:text-[#bfb6a5] mb-2">Réponse en moins de 2 min</p>

<button
onClick={() => setShowChat(true)}
className="text-purple-600 font-medium underline"
>
Démarrer le chat
</button>
</div>

<div className="rounded-xl p-6 shadow-sm bg-white dark:bg-[#2a2a2a] text-center flex flex-col items-center transition-colors">
<div className="text-4xl text-green-500 mb-3">
<i className="bi bi-envelope"></i>
</div>
<p className="text-lg font-semibold text-[#3a2f24] dark:text-[#f1e8dc]">Par email</p>
<p className="text-sm text-gray-500 dark:text-[#bfb6a5] mb-2">Réponse sous 24h</p>
<p className="text-green-600 font-medium">bankrewmi@gmail.com</p>
</div>
</div>

{/* FAQ + Sidebar */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* FAQ */}
<div className="lg:col-span-2 rounded-xl bg-white dark:bg-[#2a2a2a] shadow-sm p-6 transition-colors">
<h2 className="text-lg font-semibold mb-1 text-[#3a2f24] dark:text-[#f1e8dc]">Questions fréquentes</h2>
<p className="text-sm text-gray-500 dark:text-[#bfb6a5] mb-4">
Trouvez rapidement des réponses à vos questions
</p>

<div className="divide-y divide-gray-100 dark:divide-[#3a3a3a]">
{faqs.map((faq, index) => (
<div
key={index}
className="py-3 cursor-pointer"
onClick={() => toggleFAQ(index)}
>
<div className="flex justify-between items-center">
<span className="text-sm sm:text-base text-[#3a2f24] dark:text-[#f1e8dc]">{faq.question}</span>
<i
className={`bi bi-chevron-down transition-transform ${openIndex === index ? "rotate-180" : ""} text-gray-600 dark:text-[#d6c5a9]`}
/>
</div>
<div
className={`mt-2 text-sm text-gray-600 dark:text-[#bfb6a5] ${openIndex === index ? "block" : "hidden"}`}
>
{faq.answer}
</div>
</div>
))}
</div>
</div>

{/* Sidebar */}
<div className="space-y-6">
<div className="rounded-xl bg-white dark:bg-[#2a2a2a] shadow-sm p-6 transition-colors">
<h2 className="text-lg font-semibold mb-4 text-[#3a2f24] dark:text-[#f1e8dc]">État des services</h2>
<ul className="space-y-2">
{["Virements", "Paiements", "Cartes", "Application"].map((service) => (
<li key={service} className="flex justify-between text-[#3a2f24] dark:text-[#f1e8dc]">
{service}
<span className="text-green-600">Opérationnel</span>
</li>
))}
</ul>
</div>

<div className="rounded-xl bg-white dark:bg-[#2a2a2a] shadow-sm p-6 transition-colors">
<h2 className="text-lg font-semibold mb-4 text-[#3a2f24] dark:text-[#f1e8dc]">Nous contacter</h2>
<form className="space-y-4" onSubmit={handleSubmit}>
<Input
label="Email"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Entrez votre email"
className="bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc]"
/>

<Input
label="Sujet"
value={subject}
onChange={(e) => setSubject(e.target.value)}
placeholder="Sujet du message"
className="bg-white dark:bg-[#111] text-[#111] dark:text-[#f1e8dc]"
/>

<div className="flex flex-col gap-2 my-2 w-full">
<label className="font-medium text-sm text-[#3a2f24] dark:text-[#f1e8dc]">Message</label>
<textarea
value={message}
onChange={(e) => setMessage(e.target.value)}
placeholder="Votre message"
rows={4}
className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a896] bg-white dark:bg-[#111] text-[#6b5a49] dark:text-[#f1e8dc] border-[#d6c7b8] dark:border-[#4a4a4a]"
/>
</div>

<button
type="submit"
className="w-full bg-gradient-to-r from-[#b9a896] to-[#8f7e6b] dark:from-[#6b5a49] dark:to-[#3b352c] text-white py-3 rounded-lg flex items-center justify-center gap-2"
>
<i className="bi bi-send " /> Envoyer le message
</button>
</form>
</div>
</div>
</div>

{/* Ressources utiles */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-white dark:bg-[#2a2a2a] shadow-sm p-6 mt-6 transition-colors">
<h3 className="text-xl font-semibold mb-4 col-span-2 text-[#3a2f24] dark:text-[#f1e8dc]">
Ressources utiles
</h3>

<div className="flex items-start gap-3 rounded-xl bg-[#e8dcc7] dark:bg-[#262424] shadow-sm p-4 transition-colors">
<i className="fa-regular fa-circle-question text-xl text-blue-500 p-2"></i>
<div>
<h2 className="font-semibold text-[#3a2f24] dark:text-[#f1e8dc]">Guide d'utilisation</h2>
<p className="text-sm text-[#6b5a49] dark:text-[#bfb6a5]">
Découvrez et utilisez toutes les fonctionnalités
</p>
</div>
</div>

<div className="flex items-start gap-3 rounded-xl bg-[#e8dcc7] dark:bg-[#262424] shadow-sm p-4 transition-colors">
<i className="fa-regular fa-circle-play text-xl text-purple-500 p-2"></i>
<div>
<h2 className="font-semibold text-[#3a2f24] dark:text-[#f1e8dc]">Tutoriels vidéo</h2>
<p className="text-sm text-[#6b5a49] dark:text-[#bfb6a5]">
Apprenez avec nos tutoriels pas à pas
</p>
</div>
</div>
</div>

{/* Chat Modal */}
{showChat && (
<div className="fixed inset-0 z-50 flex items-center justify-center">
<div
className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
onClick={() => setShowChat(false)}
></div>

<div className="relative bg-white dark:bg-[#1b1b1b] rounded-xl shadow-xl w-full sm:w-[90%] max-w-md p-6 z-10 flex flex-col transition-colors">
<button
onClick={() => setShowChat(false)}
className="absolute top-3 right-3 text-gray-600 dark:text-[#d6c5a9] hover:text-black"
>
<i className="fa-solid fa-x"></i>
</button>

<ChatBot />
</div>
</div>
)}
</div>
);
}
