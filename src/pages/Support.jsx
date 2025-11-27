import React, { useState } from "react";

export default function Support() {
  const faqs = [
    {
      question: "Comment effectuer un virement ?",
      answer:
        "Pour effectuer un virement, rendez-vous dans la section 'Transfert', choisissez le type de virement (interne ou externe), remplissez les informations nécessaires (destinataire, montant, description) et validez. Les virements internes sont instantanés, les virements SEPA peuvent prendre 1 à 3 jours ouvrés.",
    },
    {
      question: "Comment securiser un compte?",
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
      question: "Comment consulter mon historique de transction ?",
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

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl">Support & Aide</h1>
        <p>Nous sommes là pour vous aider 24/7</p>
      </div>

      {/* Contact cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="rounded-xl p-6 shadow-sm bg-white text-center flex flex-col items-center">
          <div className="text-4xl text-blue-500 mb-3">
            <i className="bi bi-telephone"></i>
          </div>
          <p className="text-lg font-semibold">Par téléphone</p>
          <p className="text-sm text-gray-500 mb-2">Disponible 24h/24, 7j/7</p>
          <p className="text-blue-600 font-medium">0800 XXX XXX</p>
        </div>
        <div className="rounded-xl p-6 shadow-sm bg-white text-center flex flex-col items-center">
          <div className="text-4xl text-purple-500 mb-3">
            <i className="bi bi-chat-dots"></i>
          </div>
          <p className="text-lg font-semibold">Chat en direct</p>
          <p className="text-sm text-gray-500 mb-2">Réponse en moins de 2 min</p>
          <a href="#" className="text-purple-600 font-medium underline">
            Démarrer le chat
          </a>
        </div>
        <div className="rounded-xl p-6 shadow-sm bg-white text-center flex flex-col items-center">
          <div className="text-4xl text-green-500 mb-3">
            <i className="bi bi-envelope"></i>
          </div>
          <p className="text-lg font-semibold">Par email</p>
          <p className="text-sm text-gray-500 mb-2">Réponse sous 24h</p>
          <p className="text-green-600 font-medium">support@bankapp.com</p>
        </div>
      </div>

      {/* FAQ and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Questions fréquentes</h2>
          <p className="text-sm text-gray-500 mb-4">
            Trouvez rapidement des réponses à vos questions
          </p>

          <div className="divide-y">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="py-3 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <span>{faq.question}</span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
                <div
                  className={`mt-2 text-sm text-gray-600 ${
                    openIndex === index ? "" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* État des services */}
          <div className="rounded-xl bg-white shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">État des services</h2>
            <ul className="space-y-2">
              {["Virements", "Paiements", "Cartes", "Application"].map(
                (service) => (
                  <li key={service} className="flex justify-between">
                    {service} <span className="text-green-600">Opérationnel</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact form */}
          <div className="rounded-xl bg-white shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Nous contacter</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 mt-1 shadow-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Sujet</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 mt-1 shadow-sm"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Message</label>
                <textarea className="w-full border rounded-lg px-3 py-2 mt-1 shadow-sm"rows="4"></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"><i className="bi bi-send"></i> Envoyer le message</button>
            </div>
          </div>
        </div>
      </div>

      {/* Ressources utiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-xl bg-white shadow-sm p-6 mt-6">
        <div className="col-span-1 lg:col-span-3">
          <h1 className="text-xl font-semibold mb-4">Ressources utiles</h1>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-gray-100 shadow-sm p-4">
          <i class="fa-regular fa-circle-question text-xl text-blue-500 p-2"></i>
          <div>
            <h2 className="font-semibold">Guide d'utilisation</h2>
            <p className="text-sm text-gray-600">
              Découvrez et utilisez toutes les fonctionnalités
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-gray-100 shadow-sm p-4">
          <i class="fa-regular fa-circle-play text-xl text-purple-500 p-2"></i>
          <div>
            <h2 className="font-semibold">Tutoriels vidéo</h2>
            <p className="text-sm text-gray-600">Apprenez avec nos tutoriels pas à pas</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-gray-100 shadow-sm p-4">
          <i class="fa-solid fa-newspaper text-xl text-green-500 p-2"></i>
          <div>
            <h2 className="font-semibold">Blog et actualités</h2>
            <p className="text-sm text-gray-600">Restez informé des dernières nouveautés</p>
          </div>
        </div>
      </div>
    </div>
  );
}
