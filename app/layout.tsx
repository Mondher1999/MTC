
import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../contexts/AuthContext"
import { LoadingProvider } from "../contexts/LoadingContext"
import { PageLoader } from "@/components/ui/page-loader"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "ATAMTC - Formation en Médecine Traditionnelle Chinoise",
  description: "Plateforme de formation hybride en Médecine Traditionnelle Chinoise pour professionnels de santé",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body className="font-sans antialiased">
        <LoadingProvider>
          <AuthProvider>
            {children}
            <PageLoader />
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
