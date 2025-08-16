"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
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
]

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section
    id="faq"
    className="relative overflow-hidden py-24 sm:py-28 bg-gradient-to-b from-white via-red-50 to-white"
  >
    {/* Effet décoratif en arrière-plan */}
    <div className="absolute inset-0 pt-20 pb-20  bg-grid-gray-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
  
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow">
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold text-red-600 mb-2 tracking-wider uppercase">
            Questions
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Fréquentes
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vous avez des questions sur notre programme de formation en Médecine Traditionnelle Chinoise ?
            Retrouvez ici les réponses les plus courantes.
          </p>
        </div>
  
        <div className="divide-y divide-gray-200">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
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


