'use client';

import React from 'react';
import Link from 'next/link';
import { WhatsAppButton } from '../catalog/WhatsAppButton';
import { useJewelryLanguage } from '@/lib/i18n/JewelryLanguageContext';

export const JewelryFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useJewelryLanguage();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="font-heading text-h3 text-text-primary mb-4">Hallel Diamonds</h3>
            <p className="text-small text-text-secondary mb-4">
              {t.home.hero.title}
            </p>
            <WhatsAppButton className="text-sm px-4 py-2">
              {t.contact.whatsApp}
            </WhatsAppButton>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-h3 text-text-primary mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-small text-text-secondary hover:text-gold transition-colors">
                  {t.nav.catalog}
                </Link>
              </li>
              <li>
                <Link href="/custom-design" className="text-small text-text-secondary hover:text-gold transition-colors">
                  {t.nav.customDesign}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-small text-text-secondary hover:text-gold transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-small text-text-secondary hover:text-gold transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-h3 text-text-primary mb-4">{t.footer.moreInfo}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-small text-text-secondary hover:text-gold transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-small text-text-secondary hover:text-gold transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-small text-text-secondary">
            © {currentYear} Hallel Diamonds. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

