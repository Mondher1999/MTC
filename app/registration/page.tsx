"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Camera, CheckCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { RegisterUser } from "@/services/Service"
import { useAuth } from "@/contexts/AuthContext"
import type { Userss } from "@/types/Clients"
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"
import { useLoading } from "@/contexts/LoadingContext"

interface FormData {
  dateOfBirth: string
  gender: string
  address: string
  motivation: string
  receipt: File | null
  photoId: File | null
}

export default function RegistrationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, refreshUser } = useAuth()
  const { startLoading } = useLoading()

  const [formData, setFormData] = useState<FormData>({
    dateOfBirth: "",
    gender: "",
    address: "",
    motivation: "",
    receipt: null,
    photoId: null,
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: "receipt" | "photoId", file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Validation
      if (!user?.id) {
        throw new Error("User ID is missing. Please log in again.");
      }
  
      // Validate required fields
      if (!formData.dateOfBirth || !formData.gender || !formData.address || !formData.motivation) {
        throw new Error("Please fill in all required fields");
      }
  
      if (!formData.receipt || !formData.photoId) {
        throw new Error("Please upload both receipt and photo ID");
      }

      // Create FormData for multipart/form-data (Multer)
      const formDataPayload = new FormData();
      
      // Append text fields
      formDataPayload.append('userId', user.id);
      formDataPayload.append('dateOfBirth', formData.dateOfBirth);
      formDataPayload.append('gender', formData.gender);
      formDataPayload.append('address', formData.address);
      formDataPayload.append('motivation', formData.motivation);
      
      // Append files
      formDataPayload.append('receipt', formData.receipt);
      formDataPayload.append('photoId', formData.photoId);
  
      console.log("Submitting user registration with ID:", user.id);
      
      // Call the registration service with FormData
      const created = await RegisterUser(user?.id,formDataPayload);
      
      console.log("Registration successful:", created);
  
      // Refresh user data to get updated information
      await refreshUser();
      
      // Clear form data
      setFormData({
        dateOfBirth: "",
        gender: "",
        address: "",
        motivation: "",
        receipt: null,
        photoId: null,
      });
  
      // Start any loading animations
      startLoading();
  
      // Navigate to confirmation page
      router.push("/confirmation");
      
    } catch (err: any) {
      console.error("Error during user registration:", err);
      
      // Set user-friendly error messages
      let errorMessage = "An error occurred during registration";
      
      if (err.message.includes("Network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (err.message.includes("fetch")) {
        errorMessage = "Unable to connect to server. Please try again later.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.dateOfBirth && formData.gender && formData.address && formData.motivation
      case 2:
        return formData.receipt && formData.photoId
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Inscription à la Formation</h1>
            <p className="text-muted-foreground">Médecine Traditionnelle Chinoise - MTC</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 animate-fade-in-up stagger-1">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Étape {currentStep} sur {totalSteps}
              </span>
              <span>{Math.round(progress)}% complété</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Form Card */}
          <Card className="modern-card animate-fade-in-up stagger-2">
            <CardHeader className="dialog-header-modern">
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <FileText className="h-5 w-5 text-primary" />}
                {currentStep === 2 && <Upload className="h-5 w-5 text-accent" />}
                {currentStep === 3 && <CheckCircle className="h-5 w-5 text-chart-3" />}
                {currentStep === 1 && "Informations Personnelles"}
                {currentStep === 2 && "Documents Requis"}
                {currentStep === 3 && "Vérification"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Veuillez remplir vos informations personnelles"}
                {currentStep === 2 && "Téléchargez votre reçu de paiement et photo d'identité"}
                {currentStep === 3 && "Vérifiez vos informations avant soumission"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date de Naissance *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="info-field-chart-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Genre *</Label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="w-full border rounded-md p-2 info-field-chart-5"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="info-field-chart-5"
                      placeholder="Votre adresse complète"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Motivation *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      placeholder="Expliquez brièvement vos motivations pour cette formation"
                      className="min-h-[120px] info-field"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: File Uploads */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Receipt Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Reçu de Paiement *</Label>
                    <div className="receipt-section">
                      <div className="flex items-center justify-center border-2 border-dashed border-accent/30 rounded-lg p-8 hover:border-accent/50 transition-colors">
                        <div className="text-center">
                          <FileText className="h-12 w-12 text-accent mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Glissez votre reçu ici ou cliquez pour sélectionner
                          </p>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload("receipt", e.target.files?.[0] || null)}
                            className="hidden"
                            id="receipt-upload"
                          />
                          <Label htmlFor="receipt-upload" className="cursor-pointer">
                            <Button variant="outline" className="hover-lift bg-transparent" asChild>
                              <span>Sélectionner le fichier</span>
                            </Button>
                          </Label>
                          {formData.receipt && (
                            <p className="text-sm text-chart-3 mt-2 font-medium">✓ {formData.receipt.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo ID Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Photo d'Identité *</Label>
                    <div className="payment-section">
                      <div className="flex items-center justify-center border-2 border-dashed border-chart-4/30 rounded-lg p-8 hover:border-chart-4/50 transition-colors">
                        <div className="text-center">
                          <Camera className="h-12 w-12 text-chart-4 mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">Photo claire de votre pièce d'identité</p>
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload("photoId", e.target.files?.[0] || null)}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Label htmlFor="photo-upload" className="cursor-pointer">
                            <Button variant="outline" className="hover-lift bg-transparent" asChild>
                              <span>Sélectionner la photo</span>
                            </Button>
                          </Label>
                          {formData.photoId && (
                            <p className="text-sm text-chart-3 mt-2 font-medium">✓ {formData.photoId.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="validation-actions">
                    <h3 className="text-lg font-semibold mb-4">Récapitulatif de votre inscription</h3>

                    <div className="space-y-4">
                      <div className="info-field-primary p-4">
                        <h4 className="font-medium text-primary mb-2">Informations Personnelles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p>
                            <span className="font-medium">Date de naissance:</span> {formData.dateOfBirth}
                          </p>
                          <p>
                            <span className="font-medium">Genre:</span> {formData.gender}
                          </p>
                        </div>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Adresse:</span> {formData.address}
                        </p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Motivation:</span> {formData.motivation}
                        </p>
                      </div>

                      <div className="info-field-accent p-4">
                        <h4 className="font-medium text-accent mb-2">Documents Téléchargés</h4>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-chart-3" />
                            Reçu de paiement: {formData.receipt?.name}
                          </p>
                          <p className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-chart-3" />
                            Photo d'identité: {formData.photoId?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <div>
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1 || loading}
                    className="hover-lift bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Précédent
                  </Button>
                </div>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} disabled={!isStepValid() || loading} className="btn-validate hover-lift">
                    Suivant
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || loading}
                    className="btn-validate hover-lift"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        Soumettre l'inscription
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}