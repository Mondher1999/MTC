"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, Stethoscope } from "lucide-react"

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-red-600 pt-20 pb-20 via-red-700 to-red-800 overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 bg-grid-white/10  [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-300/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto pt-20 pb-20  px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
              Prêt à Commencer <br /> Votre Parcours MTC ?
            </h2>
            <p className="text-lg text-red-100 mb-8 leading-relaxed">
              Rejoignez notre prochaine promotion et transformez votre pratique médicale grâce à la Médecine
              Traditionnelle Chinoise. <br />
              <span className="font-semibold text-white">Places limitées</span> pour notre programme hybride.
            </p>
            <ul className="space-y-3 text-red-100">
              <li>✔ Formation avec experts internationaux</li>
              <li>✔ Format hybride pratique + théorie</li>
              <li>✔ Certification internationale</li>
            </ul>
          </motion.div>

          {/* Formulaire à droite */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Manifestez Votre Intérêt</h3>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Prénom"
                    className="pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Nom de famille"
                    className="pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Adresse e-mail"
                  type="email"
                  className="pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Numéro de téléphone"
                  className="pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all"
                />
              </div>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Spécialité médicale actuelle"
                  className="pl-10 border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all"
                />
              </div>
              <Textarea
                placeholder="Parlez-nous de votre intérêt pour la MTC..."
                className="border-gray-200 bg-white/50 focus:border-red-500 focus:ring-red-500 transition-all"
                rows={4}
              />
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Soumettre l'Inscription
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
