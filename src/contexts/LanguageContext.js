import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations, festivalDescriptions } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const getFestivalDescription = (festivalName, originalDescription) => {
    if (language === 'hi' && festivalDescriptions.hi[festivalName]) {
      return festivalDescriptions.hi[festivalName];
    }
    return originalDescription;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    getFestivalDescription
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
