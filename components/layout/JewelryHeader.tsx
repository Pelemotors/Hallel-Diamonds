'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { WhatsAppButton } from '../catalog/WhatsAppButton';
import { useJewelryLanguage } from '@/lib/i18n/JewelryLanguageContext';

export const JewelryHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useJewelryLanguage();

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/catalog', label: t.nav.catalog },
    { href: '/custom-design', label: t.nav.customDesign },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const languages = [
    { code: 'he' as const, label: 'עברית' },
    { code: 'en' as const, label: 'English' },
    { code: 'ar' as const, label: 'العربية' },
  ];

  return (
    <header className="bg-background sticky top-0 z-50 border-b border-border">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-xl md:text-2xl font-heading font-bold text-text-primary">
              Hallel Diamonds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-primary hover:text-gold font-body text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/* Language Selector */}
            <div className="flex items-center gap-2 border-r border-border pr-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-sm px-2 py-1 rounded transition-colors ${
                    language === lang.code
                      ? 'bg-gold text-text-primary font-semibold'
                      : 'text-text-secondary hover:text-gold'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <WhatsAppButton className="text-sm px-4 py-2">
              {t.common.whatsApp}
            </WhatsAppButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="תפריט"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text-primary hover:text-gold transition-colors font-body py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Language Selector Mobile */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-sm px-3 py-2 rounded transition-colors ${
                      language === lang.code
                        ? 'bg-gold text-text-primary font-semibold'
                        : 'text-text-secondary hover:text-gold border border-border'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <WhatsAppButton className="w-full mt-2">
                {t.common.whatsApp}
              </WhatsAppButton>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

