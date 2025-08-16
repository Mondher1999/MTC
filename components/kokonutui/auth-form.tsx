"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Modal from "@/components/Modal/modalAdd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { auth } from "@/lib/firebase"
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { useAuth } from "../../contexts/AuthContext"

export function AuthForm() {
  // --- State for the main login form ---
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // --- State for the password reset modal ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetSuccess, setResetSuccess] = useState<string | null>(null)

  const { user, loading } = useAuth()
  const router = useRouter()

  // --- Handlers for the main login form ---
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent page reload on form submission
    setErreur(null) // Clear previous errors

    // Basic validation
    if (!email.trim() || !motDePasse.trim()) {
      setErreur("Veuillez remplir tous les champs.")
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, motDePasse)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign-In Error:", error)
      // More robust Firebase error handling
      if (error instanceof Error && "code" in error) {
        const firebaseErrorCode = (error as { code: string }).code
        switch (firebaseErrorCode) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            setErreur("Email ou mot de passe incorrect. Veuillez réessayer.")
            break
          case "auth/invalid-email":
            setErreur("Le format de l'adresse email est invalide.")
            break
          default:
            setErreur("Une erreur est survenue lors de la connexion. Veuillez réessayer.")
        }
      } else {
        setErreur("Une erreur inconnue est survenue.")
      }
    }
  }

  // --- Handlers for the password reset modal ---
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    // Reset modal state on close for a better user experience
    setResetEmail("")
    setResetError(null)
    setResetSuccess(null)
  }

  const handleSendPasswordResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent page reload
    setResetError(null)
    setResetSuccess(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resetEmail)) {
      setResetError("Veuillez entrer une adresse email valide.")
      return
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail)
      setResetSuccess("Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.")
    } catch (error) {
      console.error("Password Reset Error:", error)
      if (error instanceof Error && "code" in error) {
        const firebaseErrorCode = (error as { code: string }).code
        if (firebaseErrorCode === "auth/user-not-found") {
          setResetError("Aucun utilisateur trouvé avec cette adresse email.")
        } else {
          setResetError("Une erreur est survenue. Veuillez réessayer.")
        }
      } else {
        setResetError("Une erreur inconnue est survenue.")
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSignIn} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-100">
            Adresse e-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full rounded-lg border border-transparent bg-white/5 pl-11 pr-4 text-gray-200 placeholder:text-gray-500 transition-colors duration-300 focus:border-red-500/50 focus:bg-white/10 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-100">
              Mot de passe
            </label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              className="h-12 w-full rounded-lg border border-transparent bg-white/5 pl-11 pr-12 text-gray-200 placeholder:text-gray-500 transition-colors duration-300 focus:border-red-500/50 focus:bg-white/10 focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
            <span className="ml-2 text-gray-200">Se souvenir de moi</span>
          </label>
          <button
            type="button"
            onClick={openModal}
            className="text-sm font-semibold text-red-400 transition-colors hover:text-red-300 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Error Message Display */}
        {erreur && <p className="text-center font-medium text-red-400">{erreur}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="relative h-12 w-full overflow-hidden rounded-lg bg-red-600 font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:cursor-not-allowed disabled:bg-red-800"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {/* Password Reset Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSendPasswordResetEmail}>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 border-b pb-3 text-2xl font-bold text-gray-800">Réinitialiser le mot de passe</h2>
            <div className="relative mt-6">
              <label
                htmlFor="reset-email" // Use a unique ID
                className="mb-2 block font-semibold text-gray-700"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  id="reset-email" // Unique ID
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border p-3 pl-12 text-gray-900 shadow-inner transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez votre email de récupération"
                />
              </div>
            </div>

            {/* Modal Messages */}
            {resetError && <p className="mt-4 text-center font-semibold text-red-600">{resetError}</p>}
            {resetSuccess && <p className="mt-4 text-center font-semibold text-green-600">{resetSuccess}</p>}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-3 rounded-full px-6 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
              >
                Envoyer
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
