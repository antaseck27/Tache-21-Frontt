import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const SLIDES = [
    {
      id: 1,
      title: "Votre argent. Votre sécurité. Votre avenir.",
      subtitle:
        "Une banque 100% digitale qui protège vos transactions et simplifie votre quotidien.",
      image:
        // "https://images.unsplash.com/photo-1518544887878-5d7b3e648f5f?auto=compress&q=80&w=1600",
        "https://plus.unsplash.com/premium_photo-1661696460502-16e797daaef8?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title: "Gérez vos finances où que vous soyez.",
      subtitle:
        "Consultez votre solde, effectuez des virements et maîtrisez vos dépenses en un clic.",
      image:
        // "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=compress&q=80&w=1600",
        "https://i.pinimg.com/1200x/c2/c2/df/c2c2df048b8da3ff9aff081ce01a01a9.jpg"
    },
    {
      id: 3,
      title: "Avancez avec une banque qui vous comprend.",
      subtitle:
        "Clarté, transparence et rapidité : la nouvelle manière de gérer votre argent.",
      image:
        // "https://images.unsplash.com/photo-1508387023933-5b0eece4108c?auto=compress&q=80&w=1600",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background slideshow */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 
            bg-no-repeat bg-cover bg-center 
            transition-opacity duration-[1200ms]
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
          style={{ backgroundImage: `url(${slide.image})` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-10">
        <div className="max-w-xl text-white">

          <h1 className="text-4xl font-bold leading-tight">
            {SLIDES[index].title}
          </h1>

          <p className="mt-4 text-lg text-white/90">
            {SLIDES[index].subtitle}
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-xl  bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500   hover:bg-white/10 text-white font-medium transition"
            >
              S’inscrire
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-pink-500 text-white hover:bg-white/10 font-medium transition"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
