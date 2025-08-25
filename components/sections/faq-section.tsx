"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = {
  fr: [
    {
      question: "Qui peut s'inscrire à cette formation ?",
      answer:
        "Cette formation est destinée aux professionnels de santé tunisiens : médecins, infirmiers, kinésithérapeutes, pharmaciens et autres praticiens de santé souhaitant intégrer la MTC dans leur pratique.",
    },
    {
      question: "Quelle est la durée de la formation ?",
      answer:
        "Le programme s'étend sur 12 mois avec des sessions virtuelles hebdomadaires de 2 heures et des ateliers pratiques mensuels d'une journée complète.",
    },
    {
      question: "Comment se déroule le format hybride ?",
      answer:
        "La formation combine des cours théoriques en ligne dispensés par des experts de l'Université de Shanghai et des sessions pratiques en présentiel pour l'apprentissage des techniques d'acupuncture et de diagnostic.",
    },
    {
      question: "Quel est le coût de la formation ?",
      answer:
        "Le tarif complet est de 2500 TND, payable en 3 fois. Ce prix inclut tous les supports de cours, l'accès à la plateforme en ligne, les ateliers pratiques et le certificat international.",
    },
    {
      question: "Y a-t-il une certification à la fin ?",
      answer:
        "Oui, les participants recevront un certificat international de formation en Médecine Traditionnelle Chinoise délivré conjointement par l'Université de Shanghai et l'ATAMTC.",
    },
    {
      question: "Le stage en Chine est-il obligatoire ?",
      answer:
        "Non, le stage de 2 semaines en Chine est optionnel. Il offre une expérience d'immersion complète dans les hôpitaux et cliniques de MTC de Shanghai pour approfondir la pratique clinique.",
    },
  ],
  en: [
    {
      question: "Who can enroll in this training?",
      answer:
        "This training is designed for Tunisian healthcare professionals: doctors, nurses, physiotherapists, pharmacists, and other health practitioners who wish to integrate TCM into their practice.",
    },
    {
      question: "What is the duration of the training?",
      answer:
        "The program spans 12 months with weekly 2-hour virtual sessions and monthly full-day practical workshops.",
    },
    {
      question: "How does the hybrid format work?",
      answer:
        "The training combines online theoretical courses taught by Shanghai University experts with in-person practical sessions for learning acupuncture techniques and diagnosis.",
    },
    {
      question: "What is the cost of the training?",
      answer:
        "The full fee is 2500 TND, payable in 3 installments. This price includes all course materials, access to the online platform, practical workshops, and international certification.",
    },
    {
      question: "Is there certification at the end?",
      answer:
        "Yes, participants will receive an international Traditional Chinese Medicine training certificate jointly issued by Shanghai University and ATAMTC.",
    },
    {
      question: "Is the China internship mandatory?",
      answer:
        "No, the 2-week internship in China is optional. It offers a complete immersion experience in Shanghai's TCM hospitals and clinics to deepen clinical practice.",
    },
  ],
  zh: [
    {
      question: "谁可以参加这个培训？",
      answer:
        "这个培训专为突尼斯医疗专业人士设计：医生、护士、物理治疗师、药剂师和其他希望将中医纳入其实践的健康从业者。",
    },
    {
      question: "培训持续多长时间？",
      answer:
        "课程为期12个月，每周2小时虚拟课程和每月全天实践工作坊。",
    },
    {
      question: "混合式学习模式是如何运作的？",
      answer:
        "培训结合了由上海大学专家教授的在线理论课程和面对面的针灸技术和诊断学习实践课程。",
    },
    {
      question: "培训费用是多少？",
      answer:
        "全部费用为2500突尼斯第纳尔，可分3次付款。此价格包括所有课程材料、在线平台访问、实践工作坊和国际认证。",
    },
    {
      question: "结束时有认证吗？",
      answer:
        "是的，参与者将获得由上海大学和ATAMTC联合颁发的国际中医培训证书。",
    },
    {
      question: "中国实习是强制性的吗？",
      answer:
        "不，在中国为期2周的实习是可选的。它提供在上海中医医院和诊所的完全沉浸式体验，以加深临床实践。",
    },
  ],
}

// Objet de traductions pour les textes de l'interface
const translations = {
  en: {
    questionsLabel: "Questions",
    title: "Frequently Asked",
    subtitle: "Have questions about our Traditional Chinese Medicine training program? Find the most common answers here.",
  },
  fr: {
    questionsLabel: "Questions",
    title: "Fréquentes",
    subtitle: "Vous avez des questions sur notre programme de formation en Médecine Traditionnelle Chinoise ? Retrouvez ici les réponses les plus courantes.",
  },
  zh: {
    questionsLabel: "问题",
    title: "常见问题",
    subtitle: "对我们的中医培训项目有疑问？在这里找到最常见的答案。",
  }
}

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [currentLang, setCurrentLang] = useState('fr') // Défaut en français

  // Fonction de traduction
  const t = (key: string, options?: { defaultValue?: string }) => {
    const keys = key.split('.')
    let value: any = translations[currentLang as keyof typeof translations] || translations.fr
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || options?.defaultValue || key
  }

  // Écouter les changements de langue
  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      if (event.detail?.language) {
        setCurrentLang(event.detail.language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    
    // Charger la préférence de langue sauvegardée
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      setCurrentLang(savedLang)
    }

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Obtenir les données FAQ dans la langue actuelle
  const currentFAQData = faqData[currentLang as keyof typeof faqData] || faqData.fr

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 sm:py-28 bg-gradient-to-b from-white via-red-50 to-white"
    >
      {/* Effet décoratif en arrière-plan */}
      <div className="absolute inset-0 pt-20 pb-20 bg-grid-gray-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow">
          <div className="text-center mb-14">
            <h2 className="text-sm font-bold text-red-600 mb-2 tracking-wider uppercase">
              {t('questionsLabel')}
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {currentFAQData.map((faq, index) => (
              <FAQItem
                key={`${currentLang}-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left px-4 md:px-6 focus:outline-none hover:bg-red-50/50 rounded-lg transition-colors"
      >
        <span className="text-xl font-semibold text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-red-500" />
          ) : (
            <ChevronDown className="w-6 h-6 text-red-500" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pb-6 px-4 md:px-6 mt-1 bg-gray-50 rounded-xl border border-gray-100 shadow-sm text-gray-700 text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}