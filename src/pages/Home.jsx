
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Lock,
  TrendingUp,
  Clock,
  Headphones,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3e8d7] text-[#6b5a49]">

      {/* ======================= HERO VIDEO ======================= */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-virtual-money-3643/1080p.mp4"
            type="video/mp4"
          />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(214,199,180,0.75), rgba(191,169,138,0.75))",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
          >
            Simplifiez vos finances avec{" "}
            <span className="text-[#f3e8d7]">BankRewmi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-white mt-5 max-w-2xl"
          >
            Une expérience bancaire moderne, rapide et entièrement sécurisée.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex gap-4"
          >
            <Link
              to="/signup"
              className="px-6 py-3 rounded-xl shadow-lg text-white font-semibold"
              style={{ background: "var(--gradient-beige-gold)" }}
            >
              Commencer maintenant
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl shadow-lg border text-white border-white font-semibold"
            >
              Se connecter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ======================= SERVICES ======================= */}
      <section className="px-8 md:px-20 py-20">
        <h2 className="text-4xl font-bold text-center">Nos Services</h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-xl shadow-lg bg-[#eadfcf]"
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
        <h2 className="text-4xl font-bold text-center">Fonctionnalités</h2>

        <div className="grid md:grid-cols-2 gap-16 mt-16">
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
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-5 p-6 rounded-xl bg-[#f3e8d7]"
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
      <section className="px-8 md:px-20 py-24">
        <h2 className="text-4xl font-bold text-center">Ils nous font confiance </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">
          {[
            {
              name: "Fatou Ndiaye",
              text: "Service exceptionnel ! Interface fluide et simple.",
            },
            {
              name: "Mamadou Sarr",
              text: "Transferts rapides, sécurité au top. 100% validé.",
            },
            {
              name: "Awa Diop",
              text: "Enfin une banque moderne qui comprend nos besoins.",
            },
          ].map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl shadow-lg bg-white border border-[#ebdfcc]"
            >
              <p className="italic text-[#6b5a49]">“{a.text}”</p>
              <h4 className="mt-4 font-semibold text-[#5a4a3a]">{a.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section
        className="py-20 text-center"
        style={{ background: "white" }}
      >
        <h2 className="text-4xl font-bold text-var(--gradient-beige-brown)">Prêt à rejoindre BankRewmi ?</h2>
        <p className="text-white mt-3 text-lg">Ouvrez votre compte en 2 minutes.</p>

        <Link
          to="/signup"
          className="mt-6 inline-block px-8 py-3 bg-white text-[#5a4a3a] font-semibold rounded-xl shadow-lg-beig border"
        >
          Commencer maintenant
        </Link>
      </section>

      {/* ======================= FOOTER ======================= */}
      <footer className="py-6 text-center text-[#7a6b5c] border bg-[white]">
        
        © 2025 BankRewmi — Tous droits réservés

        
      </footer>
    </div>
  );
}
