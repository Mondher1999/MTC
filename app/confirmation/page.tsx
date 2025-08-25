"use client"

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, CheckCircle, Clock, Download, Home, Mail, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const handleDownloadConfirmation = () => {
    // Generate and download confirmation PDF
    console.log("Downloading confirmation...")
  }

  return (
   <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50/30 to-amber-50/20 py-8 px-4 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-red-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 left-[-10%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-rose-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-4">
            Inscription Confirmée !
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Félicitations ! Votre demande d'inscription a été soumise avec succès. Bienvenue dans votre parcours de
            formation en médecine traditionnelle chinoise.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Welcome Message - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="h-full border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-fade-in-up">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">Message de Bienvenue</CardTitle>
                    <CardDescription className="text-red-100">
                      Dr. Ezzeddine JEBALI - Président de l'ATAMTC
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
                    <p className="text-lg font-semibold text-red-800 mb-0">Chers collègues médecins tunisiens,</p>
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-4">
                    C'est avec un immense plaisir et un grand honneur que je vous adresse ce message de bienvenue en
                    tant que président de l'Association Tunisienne d'Acupuncture et de Médecine Traditionnelle Chinoise
                    (ATAMTC).
                  </p>

                  <p className="text-slate-700 leading-relaxed mb-6">
                    Aujourd'hui marque une étape décisive dans notre engagement pour l'excellence médicale en Tunisie
                    avec le lancement de cette plateforme de formation en ligne en médecine traditionnelle chinoise.
                  </p>

                  <div className="bg-gradient-to-br from-red-50 to-amber-50 p-6 rounded-xl mb-6 border border-red-200">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Cette plateforme vous permettra :
                    </h3>
                    <div className="grid gap-3">
                      {[
                        "D'acquérir des connaissances approfondies dispensées par les experts de Shanghai",
                        "D'intégrer ces approches dans votre pratique médicale quotidienne",
                        "De rejoindre une communauté dynamique de professionnels",
                        "De contribuer à l'émergence d'une médecine intégrative en Tunisie",
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl text-center">
                    <p className="font-semibold text-lg mb-2">
                      Ensemble, œuvrons pour une médecine d'excellence en Tunisie !
                    </p>
                    <div className="border-t border-white/20 pt-4 mt-4">
                      <p className="text-red-100 text-sm">Avec mes salutations les plus respectueuses,</p>
                      <p className="font-bold text-lg">Docteur Ezzeddine JEBALI</p>
                      <p className="text-red-100 text-sm">Président de l'ATAMTC</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Process Timeline */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-fade-in-up stagger-1">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Prochaines Étapes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-amber-50 to-red-50 p-4 rounded-lg mb-6 border-l-4 border-amber-500">
                  <p className="text-amber-800 font-semibold text-sm">
                    📋 Après votre inscription, nous sommes en train d'étudier votre formation et vous donnerons l'accès
                    dans les 24 heures.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      title: "Confirmation par email",
                      time: "Dans les 24h",
                      color: "text-red-600",
                      bg: "bg-red-50",
                    },
                    {
                      icon: Shield,
                      title: "Validation du dossier",
                      time: "2-3 jours ouvrés",
                      color: "text-amber-600",
                      bg: "bg-amber-50",
                    },
                    {
                      icon: Home,
                      title: "Accès à la plateforme",
                      time: "Après validation",
                      color: "text-red-700",
                      bg: "bg-red-50",
                    },
                  ].map((step, index) => (
                    <div key={index} className={`${step.bg} p-4 rounded-lg border-l-4 border-current ${step.color}`}>
                      <div className="flex items-center gap-3">
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                        <div>
                          <p className="font-semibold text-slate-800">{step.title}</p>
                          <p className="text-sm text-slate-600">{step.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-fade-in-up stagger-2">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 bg-transparent"
                  asChild
                >
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center animate-fade-in-up stagger-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
            <p className="text-slate-600 mb-2">
              <strong>Besoin d'aide ?</strong> Notre équipe est là pour vous accompagner.
            </p>
            <p className="text-sm text-slate-500">
              Contactez-nous à <span className="font-semibold text-red-600">support@atamtc.tn</span> pour toute
              question.
            </p>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
