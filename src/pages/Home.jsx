
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Lock,
  TrendingUp,
  Clock,
  Headphones,
} from "lucide-react";
import { classNames } from "primereact/utils";

export default function Home() {
  const heroImages = [
    "https://i.pinimg.com/736x/bd/c6/24/bdc6247d1c8ebafd95db73f665adabd4.jpg", 
    "https://i.pinimg.com/736x/fd/bb/2b/fdbb2b3c655ea470f37ae4f12aec7dfc.jpg", 
    "https://i.pinimg.com/1200x/61/54/4c/61544cdb7afd8c7f7962c07ad426762a.jpg", 
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-[#f3e8d7] text-[#6b5a49]">
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
        {heroImages.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            initial={{ opacity: 20, scale: 1.05 }}
            animate={{
              opacity: i === currentHero ? 1 : 0,
              scale: i === currentHero ? 1 : 1.05,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(203, 184, 158, 0.85), rgba(247, 212, 163, 0.65))",
          }}
        />

        {/* Texte */}
        <div className="relative  z-10 flex flex-col items-center justify-center h-full text-center px-6 text-shadow text-4xl">
          <motion.h1 {...fadeUp} transition={{ duration: 1 }} className="h1 text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            Simplifiez vos finances avec{" "}
            <span className="h1 text-[#f3e8d7]">BankRewmi</span>
          </motion.h1>

          <motion.p {...fadeUp} transition={{ delay: 0.3, duration: 1 }} className="text-lg md:text-xl text-white mt-5 max-w-2xl">
            Une expérience bancaire moderne, rapide et entièrement sécurisée.
          </motion.p>

          <motion.div {...fadeUp} transition={{ delay: 0.6, duration: 1 }} className="mt-8 flex gap-4">
            <Link
              to="/signup"
              // className="px-4 py-2 rounded-xl shadow-lg font-semibold but1"
                className="px-4 py-2 rounded-xl shadow-lg font-semibold text-base text-white"

              style={{
               background: "linear-gradient(90deg, #e4c69bff, #755e3cff)",
                }}
            >
              S inscrire
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl shadow-lg border  border-white font-semibold text-base transition transform hover:bg-white hover:text-[#5a4a3a] hover:scale-105"
            >
              Se connecter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ======================= SERVICES ======================= */}
      <section className="px-8 md:px-20 py-20 bg-white py-20">
        <h2 className="text-4xl font-bold text-center mb-8">Nos Services</h2>
        <div className="w-16 h-1 bg-[#bfa98a] mx-auto mt-1 mb-5 rounded-full"></div>

        <div className="grid md:grid-cols-3 gap-10 ">
          {[
            {
              icon: <CreditCard size={45} />,
              title: "Cartes et paiements",
              text: "Gérez vos cartes, vos limites et vos paiements facilement.",
              
            },
            {
              icon: <Smartphone size={45} />,
              title: "Application mobile",
              text: "Suivez votre solde et transactions en temps réel.",
            },
            {
              icon: <Lock size={45} />,
              title: "Sécurité renforcée",
              text: "Authentification MFA, cryptage avancé et protection totale.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="p-8 rounded-xl shadow-lg bg-white text-center"
            >
              <div className="text-[#bfa98a] mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-[#6b5a49]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= FONCTIONNALITÉS ======================= */}
      <section className="px-8 md:px-20 py-24 bg-white">
        <h2 className="text-4xl font-bold text-center mb-8">Fonctionnalités</h2>
                <div className="w-16 h-1  bg-beige-900 mx-auto mt-1 mb-5 rounded-full"></div>

        <div className="grid md:grid-cols-2 gap-16">
          {[
            {
              icon: <TrendingUp size={45} />,
              title: "Analyse financière intelligente",
              text: "Recevez des rapports automatiques sur vos dépenses.",
            },
            {
              icon: <Clock size={45} />,
              title: "Transferts rapides",
              text: "Envoyez et recevez instantanément de l’argent.",
            },
            {
              icon: <Headphones size={45} />,
              title: "Support 24/7",
              text: "Une assistance humaine disponible à tout moment.",
            },
            {
              icon: <CreditCard size={45} />,
              title: "Gestion des cartes",
              text: "Activez, bloquez ou configurez vos cartes.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="flex items-start gap-5 p-6 rounded-xl bg-[#e8dcc7]"
            >
              <div className="text-[#bfa98a]">{f.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-[#7a6b5c]">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= AVIS CLIENTS ======================= */}
      <section className="px-8 md:px-20 py-24 bg-[#e8dcc7]">
        <h2 className="text-4xl font-bold text-center mb-12">Ils nous font confiance</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Fatou Ndiaye",
              text: "Service exceptionnel ! Interface fluide et simple.",
              img: "https://i.pinimg.com/736x/bd/c6/24/bdc6247d1c8ebafd95db73f665adabd4.jpg",
            },
            {
              name: "Mamadou Sarr",
              text: "Transferts rapides, sécurité au top. 100% validé.",
              img: "https://i.pinimg.com/736x/fc/e6/93/fce693e4be192e6943e4a0fc3957a005.jpg",
            },
            {
              name: "Awa Diop",
              text: "Enfin une banque moderne qui comprend nos besoins.",
              img: "https://i.pinimg.com/736x/55/34/a2/5534a2020fc8b85b95bbe0e687a9b587.jpg",
            },
          ].map((a, i) => (
            <motion.div
              key={i}
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="p-8 rounded-xl shadow-lg bg-white border border-[#ebdfcc] text-center"
            >
              <img
                src={a.img}
                alt={a.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#bfa98a]"
              />
              <p className="italic text-[#6b5a49]">“{a.text}”</p>
              <h4 className="mt-4 font-semibold text-[#5a4a3a]">{a.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-4xl font-bold text-var(--gradient-beige-brown)">Prêt à rejoindre BankRewmi ?</h2>
        <p className="text-[#6b5a49] mt-3 text-lg">Ouvrez votre compte en 2 minutes.</p>
        <Link
          to="/signup"
          className="mt-6 inline-block px-8 py-3 bg-[#e8dcc7]  font-semibold rounded-xl shadow-lg"
        >
          Commencer maintenant
        </Link>
      </section>

      {/* ======================= FOOTER ======================= */}

<footer className="py-10 bg-[#e8dcc7] text-[#5a4a3a] shadow-[0_4px_20px_rgba(191,169,138,0.5)] rounded-t-xl border-t border-[#d2bca0]">
  <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 gap-4">
    {/* Texte copyright */}
    <p className="text-sm md:text-base font-medium">
      © 2025 BankRewmi — Tous droits réservés
    </p>

    {/* Réseaux sociaux */}
    <div className="flex gap-4">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform transform hover:scale-110 hover:text-[#bfa98a]"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform transform hover:scale-110 hover:text-[#bfa98a]"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform transform hover:scale-110 hover:text-[#bfa98a]"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</footer>


    </div>
  );
}

