'use client';

import React from 'react';

const steps = [
  {
    number: '01',
    title: 'ייעוץ ראשוני',
    description: 'פגישת ייעוץ אישית להבנת הצרכים והתקציב שלך',
  },
  {
    number: '02',
    title: 'עיצוב והתאמה',
    description: 'יצירת עיצוב מותאם אישית בהתאם לבחירות שלך',
  },
  {
    number: '03',
    title: 'אישור והזמנה',
    description: 'אישור העיצוב הסופי והתחלת תהליך הייצור',
  },
  {
    number: '04',
    title: 'גימור ומסירה',
    description: 'בדיקת איכות סופית ומסירה אישית עם תעודה',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-section-mobile md:py-section-desktop bg-background">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <h2 className="text-h2 font-heading text-text-primary text-center mb-12">
          תהליך העבודה שלנו
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="text-6xl font-heading text-gold/20 mb-2">{step.number}</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-2xl font-heading text-text-primary">{step.number}</span>
                  </div>
                </div>
              </div>
              <h3 className="font-heading text-h3 text-text-primary mb-3">{step.title}</h3>
              <p className="text-body text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

