import { GraduationCap, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 text-gray-900 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Formation MTC</h3>
                <p className="text-sm text-red-600">Collaboration Chine-Tunisie</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Unir la sagesse ancestrale à la médecine moderne grâce à l'éducation professionnelle en MTC.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-500 hover:text-red-600 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Liens Rapides</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#home" className="hover:text-red-600 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-red-600 transition-colors">
                  Détails du Programme
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-red-600 transition-colors">
                  Inscription
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Partenaires</h4>
            <ul className="space-y-2 text-gray-600">
              <li>ATAMTC</li>
              <li>AATC</li>
              <li>Université MTC de Shanghai</li>
              <li>Ministère de la Santé Tunisien</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Informations de Contact</h4>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600" />
                <span>info@formation-mtc.tn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <span>+216 71 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Tunis, Tunisie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; 2025 Plateforme de Formation MTC. Tous droits réservés. | Politique de Confidentialité | Conditions
            d'Utilisation
          </p>
        </div>
      </div>
    </footer>
  )
}
