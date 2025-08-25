"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Modal from "@/components/Modal/modalAdd"
import { useLoading } from "@/contexts/LoadingContext"
import { useAuth } from "@/contexts/AuthContext"
import api from "@/utils/axiosInstance"

export function AuthForm() {
  // --- State management ---
  const [currentLang, setCurrentLang] = useState('en')
  
  // Translation object
  const translations = {
    en: {
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      resetPassword: 'Reset Password',
      enterRecoveryEmail: 'Enter your email for recovery',
      fillAllFields: 'Please fill in all fields',
      invalidCredentials: 'Invalid email or password',
      accountNotFullyValidated: 'Your account is not fully validated. Please complete your profile.',
      networkError: 'Network error. Please check your connection.',
      timeoutError: 'Request timeout. Please try again.',
      enterValidEmail: 'Please enter a valid email address',
      resetPasswordSuccess: 'Password reset email sent successfully!',
      emailNotFound: 'Email address not found in our system.',
      tooManyRequests: 'Too many requests. Please wait before trying again.',
      resetPasswordError: 'Error sending reset email. Please try again.',
      hidePassword: 'Hide password',
      showPassword: 'Show password',
      loading: 'Signing in...',
      cancel: 'Cancel',
      send: 'Send'
    },
    fr: {
      email: 'Email',
      password: 'Mot de passe',
      emailPlaceholder: 'Entrez votre email',
      passwordPlaceholder: 'Entrez votre mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      signIn: 'Se connecter',
      resetPassword: 'Réinitialiser le mot de passe',
      enterRecoveryEmail: 'Entrez votre email pour la récupération',
      fillAllFields: 'Veuillez remplir tous les champs',
      invalidCredentials: 'Email ou mot de passe invalide',
      accountNotFullyValidated: 'Votre compte n\'est pas entièrement validé. Veuillez compléter votre profil.',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion.',
      timeoutError: 'Délai d\'attente dépassé. Veuillez réessayer.',
      enterValidEmail: 'Veuillez entrer une adresse email valide',
      resetPasswordSuccess: 'Email de réinitialisation envoyé avec succès !',
      emailNotFound: 'Adresse email introuvable dans notre système.',
      tooManyRequests: 'Trop de demandes. Veuillez attendre avant de réessayer.',
      resetPasswordError: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.',
      hidePassword: 'Masquer le mot de passe',
      showPassword: 'Afficher le mot de passe',
      loading: 'Connexion...',
      cancel: 'Annuler',
      send: 'Envoyer'
    },
    zh: {
      email: '邮箱',
      password: '密码',
      emailPlaceholder: '输入您的邮箱',
      passwordPlaceholder: '输入您的密码',
      rememberMe: '记住我',
      forgotPassword: '忘记密码？',
      signIn: '登录',
      resetPassword: '重置密码',
      enterRecoveryEmail: '输入您的邮箱以恢复',
      fillAllFields: '请填写所有字段',
      invalidCredentials: '邮箱或密码无效',
      accountNotFullyValidated: '您的账户尚未完全验证。请完善您的个人资料。',
      networkError: '网络错误。请检查您的连接。',
      timeoutError: '请求超时。请重试。',
      enterValidEmail: '请输入有效的邮箱地址',
      resetPasswordSuccess: '密码重置邮件发送成功！',
      emailNotFound: '在我们的系统中未找到该邮箱地址。',
      tooManyRequests: '请求过多。请稍后再试。',
      resetPasswordError: '发送重置邮件时出错。请重试。',
      hidePassword: '隐藏密码',
      showPassword: '显示密码',
      loading: '登录中...',
      cancel: '取消',
      send: '发送'
    }
  }

  // Translation function
  const t = (key: string, options?: { defaultValue?: string }) => {
    const langTranslations = translations[currentLang as keyof typeof translations] || translations.en
    const value = langTranslations[key as keyof typeof langTranslations]
    return value || options?.defaultValue || key
  }

  // --- State for the main login form ---
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // --- State for the password reset modal ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetSuccess, setResetSuccess] = useState<string | null>(null)
  const [isResetSubmitting, setIsResetSubmitting] = useState(false)

  const { login } = useAuth()
  const router = useRouter()
  const { startLoading } = useLoading()

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      if (event.detail?.language) {
        setCurrentLang(event.detail.language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      setCurrentLang(savedLang)
    }

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  // Clear errors when language changes
  useEffect(() => {
    setErreur(null)
    setResetError(null)
    setResetSuccess(null)
  }, [currentLang])

  // --- Handlers for the main login form ---
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErreur(null)
    setIsSubmitting(true)
  
    if (!email.trim() || !motDePasse.trim()) {
      setErreur(t("fillAllFields"))
      setIsSubmitting(false)
      return
    }
  
    try {
      const user = await login(email, motDePasse)
      startLoading()
      
      console.log('Form validated:', user.formValidated)
      console.log('Access validated:', user.accessValidated)
      
      if (user.role?.toLowerCase() === "etudiant") {
        if (user.formValidated && user.accessValidated) {
          router.push("/dashboard")
        } else {
          setErreur(t("accountNotFullyValidated"))
        }
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Sign-In Error:", error)
      
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          setErreur(t("networkError"))
        } else if (error.message.includes('timeout')) {
          setErreur(t("timeoutError"))
        } else {
          setErreur(t("invalidCredentials"))
        }
      } else {
        setErreur(t("invalidCredentials"))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Handlers for the password reset modal ---
  const openModal = () => {
    setIsModalOpen(true)
    setResetEmail("")
    setResetError(null)
    setResetSuccess(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setResetEmail("")
    setResetError(null)
    setResetSuccess(null)
    setIsResetSubmitting(false)
  }

  const handleSendPasswordResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResetError(null)
    setResetSuccess(null)
    setIsResetSubmitting(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resetEmail)) {
      setResetError(t("enterValidEmail"))
      setIsResetSubmitting(false)
      return
    }

    try {
      await api.post("/auth/forgot-password", { email: resetEmail })
      setResetSuccess(t("resetPasswordSuccess"))
      
      setTimeout(() => {
        closeModal()
      }, 3000)
      
    } catch (error) {
      console.error("Password Reset Error:", error)
      
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          setResetError(t("emailNotFound"))
        } else if (error.message.includes('429')) {
          setResetError(t("tooManyRequests"))
        } else {
          setResetError(t("resetPasswordError"))
        }
      } else {
        setResetError(t("resetPasswordError"))
      }
    } finally {
      setIsResetSubmitting(false)
    }
  }

  const getPasswordVisibilityLabel = () => {
    return showPassword ? t("hidePassword") : t("showPassword")
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSignIn} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="text-sm font-medium text-gray-100 block"
          >
            {t("email")}
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-red-400" />
            <input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              autoComplete="email"
              className={`
                h-12 w-full rounded-lg border border-transparent bg-white/5 pl-11 pr-4 
                text-gray-200 placeholder:text-gray-500 transition-all duration-300 
                focus:border-red-500/50 focus:bg-white/10 focus:outline-none focus:ring-0
                disabled:opacity-50 disabled:cursor-not-allowed
                ${currentLang === 'ar' ? 'text-right' : 'text-left'}
              `}
              dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="text-sm font-medium text-gray-100 block"
          >
            {t("password")}
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-red-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              disabled={isSubmitting}
              required
              autoComplete="current-password"
              className={`
                h-12 w-full rounded-lg border border-transparent bg-white/5 pl-11 pr-12 
                text-gray-200 placeholder:text-gray-500 transition-all duration-300 
                focus:border-red-500/50 focus:bg-white/10 focus:outline-none focus:ring-0
                disabled:opacity-50 disabled:cursor-not-allowed
                ${currentLang === 'ar' ? 'text-right' : 'text-left'}
              `}
              dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-gray-300 focus:text-red-400 focus:outline-none disabled:opacity-50"
              aria-label={getPasswordVisibilityLabel()}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center text-sm cursor-pointer">
            <input 
              type="checkbox" 
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 focus:ring-offset-0 disabled:opacity-50" 
            />
            <span className="ml-2 text-gray-200 select-none">
              {t("rememberMe")}
            </span>
          </label>
          <button
            type="button"
            onClick={openModal}
            disabled={isSubmitting}
            className="text-sm font-semibold text-red-400 transition-colors hover:text-red-300 hover:underline focus:text-red-300 focus:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("forgotPassword")}
          </button>
        </div>
 */}
        {/* Error Message Display */}
        {erreur && (
          <div 
            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-in fade-in duration-300"
            role="alert"
            aria-live="polite"
          >
            <p className="text-center font-medium text-red-400 text-sm">
              {erreur}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !email.trim() || !motDePasse.trim()}
          className={`
            relative h-12 w-full overflow-hidden rounded-lg bg-red-600 font-bold text-white 
            transition-all duration-300 ease-in-out 
            hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent
            disabled:cursor-not-allowed disabled:bg-red-800 disabled:transform-none disabled:shadow-none
            ${isSubmitting ? 'animate-pulse' : ''}
          `}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{t("loading")}</span>
            </div>
          ) : (
            t("signIn")
          )}
        </button>
      </form>

      {/* Password Reset Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSendPasswordResetEmail}>
          <div className="rounded-lg bg-gray-900/95 backdrop-blur-sm border border-white/10 p-6 shadow-2xl max-w-md mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-gray-100 border-b border-white/10 pb-3 text-center">
              {t("resetPassword")}
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label 
                  htmlFor="reset-email" 
                  className="text-sm font-medium text-gray-100 block"
                >
                  {t("email")}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-red-400" />
                  <input
                    type="email"
                    id="reset-email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    disabled={isResetSubmitting}
                    required
                    autoComplete="email"
                    className={`
                      h-12 w-full rounded-lg border border-transparent bg-white/5 pl-11 pr-4 
                      text-gray-200 placeholder:text-gray-500 transition-all duration-300 
                      focus:border-red-500/50 focus:bg-white/10 focus:outline-none focus:ring-0
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${currentLang === 'ar' ? 'text-right' : 'text-left'}
                    `}
                    placeholder={t("enterRecoveryEmail")}
                    dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Modal Messages */}
              {resetError && (
                <div 
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-in fade-in duration-300"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-center font-medium text-red-400 text-sm">
                    {resetError}
                  </p>
                </div>
              )}
              
              {resetSuccess && (
                <div 
                  className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 animate-in fade-in duration-300"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-center font-medium text-green-400 text-sm">
                    {resetSuccess}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isResetSubmitting}
                  className="flex-1 h-12 rounded-lg border border-white/10 bg-white/5 font-medium text-gray-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isResetSubmitting || !resetEmail.trim()}
                  className={`
                    flex-1 h-12 rounded-lg bg-red-600 font-bold text-white 
                    transition-all duration-300 ease-in-out 
                    hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent
                    disabled:cursor-not-allowed disabled:bg-red-800 disabled:transform-none disabled:shadow-none
                    ${isResetSubmitting ? 'animate-pulse' : ''}
                  `}
                >
                  {isResetSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">{t("loading")}</span>
                    </div>
                  ) : (
                    t("send")
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}