'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, JewelryTranslations, jewelryTranslations } from './jewelryTranslations';

interface JewelryLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: JewelryTranslations;
  isRTL: boolean;
}

const JewelryLanguageContext = createContext<JewelryLanguageContextType | undefined>(undefined);

export function JewelryLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('he');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('jewelry-language') as Language | null;
    if (savedLanguage && (savedLanguage === 'he' || savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage and update document attributes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jewelry-language', lang);
    
    // Update HTML attributes
    if (typeof document !== 'undefined') {
      const isRTL = lang === 'he' || lang === 'ar';
      document.documentElement.lang = lang === 'he' ? 'he' : lang === 'ar' ? 'ar' : 'en';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
  };

  // Update document attributes when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isRTL = language === 'he' || language === 'ar';
      document.documentElement.lang = language === 'he' ? 'he' : language === 'ar' ? 'ar' : 'en';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
  }, [language]);

  const value: JewelryLanguageContextType = {
    language,
    setLanguage,
    t: jewelryTranslations[language],
    isRTL: language === 'he' || language === 'ar',
  };

  return (
    <JewelryLanguageContext.Provider value={value}>
      {children}
    </JewelryLanguageContext.Provider>
  );
}

export function useJewelryLanguage() {
  const context = useContext(JewelryLanguageContext);
  if (context === undefined) {
    throw new Error('useJewelryLanguage must be used within a JewelryLanguageProvider');
  }
  return context;
}

