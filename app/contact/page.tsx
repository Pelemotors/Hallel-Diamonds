'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/catalog/WhatsAppButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact',
          page_path: '/contact',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert('שגיאה בשליחת הטופס. נסו שוב.');
      }
    } catch (error) {
      alert('שגיאה בשליחת הטופס. נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-background py-section-mobile md:py-section-desktop">
        <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
          <div className="max-w-2xl mx-auto bg-surface rounded-lg p-8 text-center">
            <h2 className="text-h2 font-heading text-text-primary mb-4">
              תודה רבה!
            </h2>
            <p className="text-body text-text-secondary mb-6">
              קיבלנו את הפניה שלך. נחזור אליך בהקדם.
            </p>
            <WhatsAppButton className="mx-auto">
              או צור קשר בוואטסאפ
            </WhatsAppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-h1 font-heading text-text-primary mb-4 text-center">
            צור קשר
          </h1>
          <p className="text-body text-text-secondary mb-8 text-center">
            רוצים המלצה מהירה? כתבו לנו בוואטסאפ או השאירו פרטים ונחזור אליכם.
          </p>

          <div className="bg-surface rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="שם מלא *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="טלפון *"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                label="אימייל"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Textarea
                label="הודעה *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting || !formData.name || !formData.phone || !formData.message}
              >
                {isSubmitting ? 'שולח...' : 'שלח'}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-small text-text-secondary mb-4">או</p>
              <WhatsAppButton className="mx-auto">
                צור קשר בוואטסאפ
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
