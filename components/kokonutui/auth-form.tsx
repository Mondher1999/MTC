"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Github, Chrome } from "lucide-react"

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="space-y-8">
      {/* Champ Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-100">
          Adresse e-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            required
            className="w-full h-12 pl-11 pr-4 bg-white/5 text-gray-200 placeholder:text-gray-500 border border-transparent focus:border-red-500/50 rounded-lg transition-colors duration-300 focus:bg-white/10 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Champ Mot de passe */}
      <div className="space-y-2">
  {/* Label + lien alignés */}
  <div className="flex items-center justify-between mt-2 mb-1">
    <label htmlFor="password" className="text-sm font-medium text-gray-100">
      Mot de passe
    </label>
    <a
      href="#"
      className="text-xs text-gray-200 hover:text-red-400 transition-colors"
    >
      Mot de passe oublié ?
    </a>
  </div>

  {/* Champ mot de passe */}
  <div className="relative">
    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      required
      className="w-full h-12 pl-11 pr-12 bg-white/5 text-gray-200 placeholder:text-gray-500 border border-transparent focus:border-red-500/50 rounded-lg transition-colors duration-300 focus:bg-white/10 focus:outline-none focus:ring-0"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
</div>

      
      {/* Bouton de Connexion Principal */}
      <button
        type="submit"
        className="w-full h-12 rounded-lg font-bold text-white bg-red-600 relative overflow-hidden transition-all duration-300 ease-in-out hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-0.5"
      >
        Se connecter
      </button>

      {/* Séparateur */}
    

     
    </form>
  )
}