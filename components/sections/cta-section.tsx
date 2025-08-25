"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, Stethoscope, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Candidate, CandidateFormData, FormErrors } from "@/types/Candidate"
import { createCandidate } from "@/services/Service"

// Objet de traductions
const translations = {
  en: {
    title: "Ready to Start Your TCM Journey?",
    subtitle: "Join our next cohort and transform your medical practice through Traditional Chinese Medicine.",
    limitedSpots: "Limited spots",
    hybridProgram: "for our hybrid program.",
    features: [
      "✔ Training with international experts",
      "✔ Practical hybrid format + theory",
      "✔ International certification"
    ],
    formTitle: "Express Your Interest",
    placeholders: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      specialty: "Current Medical Specialty",
      interest: "Tell us about your interest in TCM..."
    },
    submitButton: "Submit Registration",
    submitting: "Submitting...",
    errors: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      invalidPhone: "Please enter a valid phone number",
      minLength: "This field must be at least {min} characters",
      maxLength: "This field cannot exceed {max} characters"
    },
    success: {
      title: "Application Submitted Successfully!",
      message: "Thank you for your interest in our TCM program. We've received your application and will review it shortly.",
      nextSteps: "You'll receive a confirmation email and hear from us within 3-5 business days."
    },
    submitAnother: "Submit Another Application"
  },
  fr: {
    title: "Prêt à Commencer Votre Parcours MTC ?",
    subtitle: "Rejoignez notre prochaine promotion et transformez votre pratique médicale grâce à la Médecine Traditionnelle Chinoise.",
    limitedSpots: "Places limitées",
    hybridProgram: "pour notre programme hybride.",
    features: [
      "✔ Formation avec experts internationaux",
      "✔ Format hybride pratique + théorie",
      "✔ Certification internationale"
    ],
    formTitle: "Manifestez Votre Intérêt",
    placeholders: {
      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Adresse e-mail",
      phone: "Numéro de téléphone",
      specialty: "Spécialité médicale actuelle",
      interest: "Parlez-nous de votre intérêt pour la MTC..."
    },
    submitButton: "Soumettre l'Inscription",
    submitting: "Envoi en cours...",
    errors: {
      required: "Ce champ est obligatoire",
      invalidEmail: "Veuillez saisir une adresse e-mail valide",
      invalidPhone: "Veuillez saisir un numéro de téléphone valide",
      minLength: "Ce champ doit contenir au moins {min} caractères",
      maxLength: "Ce champ ne peut pas dépasser {max} caractères"
    },
    success: {
      title: "Candidature Soumise avec Succès !",
      message: "Merci pour votre intérêt dans notre programme MTC. Nous avons reçu votre candidature et l'examinerons prochainement.",
      nextSteps: "Vous recevrez un email de confirmation et aurez de nos nouvelles sous 3-5 jours ouvrables."
    },
    submitAnother: "Soumettre une Autre Candidature"
  },
  zh: {
    title: "准备开始您的中医之旅了吗？",
    subtitle: "加入我们的下一期培训班，通过中医药改变您的医疗实践。",
    limitedSpots: "名额有限",
    hybridProgram: "我们的混合式课程。",
    features: [
      "✔ 国际专家培训",
      "✔ 实践混合模式 + 理论",
      "✔ 国际认证"
    ],
    formTitle: "表达您的兴趣",
    placeholders: {
      firstName: "名字",
      lastName: "姓氏",
      email: "电子邮箱",
      phone: "电话号码",
      specialty: "目前的医学专业",
      interest: "告诉我们您对中医的兴趣..."
    },
    submitButton: "提交注册",
    submitting: "提交中...",
    errors: {
      required: "此字段为必填项",
      invalidEmail: "请输入有效的电子邮箱地址",
      invalidPhone: "请输入有效的电话号码",
      minLength: "此字段至少需要{min}个字符",
      maxLength: "此字段不能超过{max}个字符"
    },
    success: {
      title: "申请提交成功！",
      message: "感谢您对我们中医项目的关注。我们已收到您的申请，将很快进行审核。",
      nextSteps: "您将收到确认邮件，我们会在3-5个工作日内联系您。"
    },
    submitAnother: "提交另一份申请"
  }
}

export function CTASection() {
  const [currentLang, setCurrentLang] = useState<'en' | 'fr' | 'zh'>('fr')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    interest: ''
  })

  // Fonction de traduction
  const t = (key: string, options?: { defaultValue?: string; min?: number; max?: number }) => {
    const keys = key.split('.')
    let value: any = translations[currentLang] || translations.fr
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    let result = value || options?.defaultValue || key
    if (options?.min !== undefined) result = result.replace('{min}', options.min.toString())
    if (options?.max !== undefined) result = result.replace('{max}', options.max.toString())
    
    return result
  }

  // Écouter les changements de langue
  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      if (event.detail?.language) {
        setCurrentLang(event.detail.language)
      }
    }
    window.addEventListener('languageChanged', handleLanguageChange)

    const savedLang = localStorage.getItem('preferredLanguage') as 'en' | 'fr' | 'zh'
    if (savedLang && ['en', 'fr', 'zh'].includes(savedLang)) setCurrentLang(savedLang)

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  // Validation
  const validateField = (name: keyof CandidateFormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return t('errors.required')
        if (value.length < 2) return t('errors.minLength', { min: 2 })
        if (value.length > 50) return t('errors.maxLength', { max: 50 })
        break
      case 'email':
        if (!value.trim()) return t('errors.required')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('errors.invalidEmail')
        break
      case 'phone':
        if (!value.trim()) return t('errors.required')
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) return t('errors.invalidPhone')
        break
      case 'specialty':
        if (!value.trim()) return t('errors.required')
        if (value.length > 100) return t('errors.maxLength', { max: 100 })
        break
      case 'interest':
        if (value.length > 1000) return t('errors.maxLength', { max: 1000 })
        break
    }
    return undefined
  }

  const handleInputChange = (name: keyof CandidateFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let hasErrors = false
    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof CandidateFormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        (newErrors as any)[fieldName] = error
        hasErrors = true
      }
    })
    setErrors(newErrors)
    return !hasErrors
  }

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const candidateData: Candidate = {
        ...formData,
        preferredLanguage: currentLang
      }

      await createCandidate(candidateData)

      setIsSuccess(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', specialty: '', interest: '' })
    } catch (error: any) {
      setErrors({ general: error.message || 'Une erreur est survenue' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewSubmission = () => {
    setIsSuccess(false)
    setErrors({})
  }

  // --- UI identical (success screen + form) ---
  if (isSuccess) {
    return (
      <section id="contact" className="relative py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center text-white">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-200" />
            <h2 className="text-4xl font-bold mb-4">{t('success.title')}</h2>
            <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">{t('success.message')}</p>
            <p className="text-lg text-green-200 mb-8">{t('success.nextSteps')}</p>
            <Button onClick={handleNewSubmission} className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-3">
              {t('submitAnother')}
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }
  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-red-600 pt-20 pb-20 via-red-700 to-red-800 overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-300/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-red-100 mb-8 leading-relaxed">
              {t('subtitle')} <br />
              <span className="font-semibold text-white">{t('limitedSpots')}</span> {t('hybridProgram')}
            </p>
            <ul className="space-y-3 text-red-100">
              {translations[currentLang].features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </motion.div>

          {/* Formulaire à droite */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('formTitle')}</h3>
            
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder={t('placeholders.firstName')}
                    className={`pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all ${errors.firstName ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder={t('placeholders.lastName')}
                    className={`pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all ${errors.lastName ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('placeholders.email')}
                  type="email"
                  className={`pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={t('placeholders.phone')}
                  className={`pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all ${errors.phone ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div className="relative">
                <Stethoscope className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  placeholder={t('placeholders.specialty')}
                  className={`pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all ${errors.specialty ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              </div>

          

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  t('submitButton')
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}