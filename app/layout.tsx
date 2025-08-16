import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
