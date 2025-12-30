'use client';

import React from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'שרה כהן',
    text: 'תהליך רכישה מדהים! קיבלתי ליווי אישי מקצועי והתכשיט עולה על כל הציפיות. ממליצה בחום!',
    image: '/demo/showroom.jpg',
  },
  {
    name: 'דוד לוי',
    text: 'עיצוב אישי מושלם! עבדנו יחד על טבעת אירוסין והתוצאה פשוט מדהימה. שירות מעולה ואיכות גבוהה.',
    image: '/demo/showroom.jpg',
  },
  {
    name: 'מיכל אברהם',
    text: 'תכשיטי יוקרה אמיתיים. האיכות והגימור מעולים, והשירות מקצועי ומהיר. בהחלט אחזור!',
    image: '/demo/showroom.jpg',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-section-mobile md:py-section-desktop bg-surface">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <h2 className="text-h2 font-heading text-text-primary text-center mb-12">
          מה אומרים הלקוחות שלנו
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {testimonial.image && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-h3 text-text-primary">{testimonial.name}</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-gold fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-body text-text-secondary">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

