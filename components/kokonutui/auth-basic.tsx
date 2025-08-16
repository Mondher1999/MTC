"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { AuthForm } from "./auth-form"

export default function AuthBasic() {
  return (
    <main
      className="
        flex flex-col min-h-screen items-center justify-center p-4 
        overflow-hidden bg-zinc-950 relative
      "
    >
      {/* Dégradé animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black animate-gradient" />

      {/* Orb rouge flottant */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] 
        bg-red-500/20 rounded-full blur-3xl animate-orb1
      " />

      {/* Orb bleuté flottant */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] 
        bg-blue-500/15 rounded-full blur-3xl animate-orb2
      " />

      <div className="w-full max-w-md z-10 flex flex-col items-center animate-fadeIn">
        {/* Logo */}
        <div className="w-24 h-24 relative mb-10 drop-shadow-lg animate-float">
          <Image
            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/to-the-moon-u5UJD9sRK8WkmaTY8HdEsNKjAQ9bjN.svg"
            alt="Illustration vers la lune"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-gray-200">
          Se Connecter à MTC

          </h1>
          <p className="text-base text-gray-200 mt-2">
          Accéder à votre Dashboard
          </p>
        </div>

        {/* Carte principale */}
        <Card className="relative w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animated-border">

          <CardContent className="p-8">
            <AuthForm />
          </CardContent>
        </Card>
      </div>

      {/* Styles d’animations */}
      <style jsx global>{`
      
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
          
          .animated-border::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px; /* épaisseur de la bordure */
          border-radius: inherit;
          background: linear-gradient(90deg, 
            rgba(239, 68, 68, 1) 0%, 
            rgba(255, 255, 255, 0) 50%, 
            rgba(239, 68, 68, 1) 100%
          );
          background-size: 200% 100%;
          animation: borderMove 4s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes borderMove {
          0% { background-position: 200% 0; } /* départ à droite */
          100% { background-position: 0% 0; }  /* fin à gauche */
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }
        .animate-orb1 {
          animation: orbFloat1 12s ease-in-out infinite;
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.05); }
        }
        .animate-orb2 {
          animation: orbFloat2 16s ease-in-out infinite;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
