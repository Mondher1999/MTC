import { useTranslation } from 'react-i18next'
import { detectLanguageByLocation } from '@/lib/i18n'

export const useI18n = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language)
  }

  const autoDetectLanguage = async () => {
    const detectedLanguage = await detectLanguageByLocation()
    await i18n.changeLanguage(detectedLanguage)
  }

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage,
    autoDetectLanguage,
    isRTL: i18n.language === 'ar', // Add this if you plan to support Arabic
  }
}