"use client"

import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10) // active le style dès qu'on descend un peu
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md shadow-lg border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Formation MTC</h1>
              <p className="text-xs text-red-600">Collaboration Chine-Tunisie</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-8">
  {[
    { href: "home", label: "Accueil" },
    { href: "programme", label: "Programme" },
    { href: "faq", label: "FAQ" },
    { href: "contact", label: "Contact" },
  ].map((item) => (
    <a
      key={item.href}
      href={`#${item.href}`}
      onClick={(e) => {
        e.preventDefault()
        const section = document.getElementById(item.href)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
          // Supprime le hash de l'URL
          window.history.pushState(null, "", window.location.pathname)
        }
      }}
      className="text-muted-foreground hover:text-red-600 font-medium transition-colors"
    >
      {item.label}
    </a>
  ))}
</nav>


            {/* Boutons */}
           
    <div className="flex items-center space-x-4">
      {user ? (
        // Si l'utilisateur est connecté
        <Link
          href="/dashboard"
          className="bg-gradient-to-br from-red-500 to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transform transition-all duration-300 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-xl hover:shadow-red-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
          Tableau de bord
        </Link>
      ) : (
        <>
          <Link
            href="/auth"
            className="bg-gradient-to-br from-red-500 to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transform transition-all duration-300 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-xl hover:shadow-red-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Connexion
          </Link>

          <a
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", window.location.pathname);
              }
            }}
            href="#contact"
            className="bg-gradient-to-br from-black to-black text-white px-5 py-2.5 rounded-lg font-semibold transform transition-all duration-300 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-xl hover:shadow-red-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Inscription
          </a>
        </>
      )}
    </div>
          </div>
        </div>
      </div>
    </header>
  )
}
