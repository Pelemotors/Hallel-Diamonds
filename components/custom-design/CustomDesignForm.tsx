'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { WhatsAppButton } from '../catalog/WhatsAppButton';

interface FormData {
  jewelryType: string;
  style: string;
  metal: string;
  diamondType: string;
  diamondShape: string;
  budget: string;
  deadline: string;
  name: string;
  phone: string;
  email: string;
}

const JEWELRY_TYPES = [
  { value: 'ring', label: 'טבעת' },
  { value: 'necklace', label: 'שרשרת' },
  { value: 'earrings', label: 'עגילים' },
  { value: 'bracelet', label: 'צמיד' },
];

const STYLES = [
  { value: 'classic', label: 'קלאסי' },
  { value: 'modern', label: 'מודרני' },
  { value: 'vintage', label: 'וינטג\'׳' },
  { value: 'minimalist', label: 'מינימליסטי' },
];

const METALS = [
  { value: 'gold-yellow-14k', label: 'זהב צהוב 14K' },
  { value: 'gold-yellow-18k', label: 'זהב צהוב 18K' },
  { value: 'gold-white-14k', label: 'זהב לבן 14K' },
  { value: 'gold-white-18k', label: 'זהב לבן 18K' },
  { value: 'gold-rose-14k', label: 'זהב אדום 14K' },
  { value: 'gold-rose-18k', label: 'זהב אדום 18K' },
];

const DIAMOND_TYPES = [
  { value: 'natural', label: 'יהלום טבעי' },
  { value: 'lab', label: 'יהלום מעבדה' },
];

const DIAMOND_SHAPES = [
  { value: 'round', label: 'עגול' },
  { value: 'princess', label: 'נסיכה' },
  { value: 'emerald', label: 'אמרלד' },
  { value: 'oval', label: 'אובלי' },
  { value: 'pear', label: 'טיפה' },
  { value: 'marquise', label: 'מרקיז' },
];

const BUDGETS = [
  { value: '5000-10000', label: '₪5,000 - ₪10,000' },
  { value: '10000-20000', label: '₪10,000 - ₪20,000' },
  { value: '20000-50000', label: '₪20,000 - ₪50,000' },
  { value: '50000+', label: '₪50,000+' },
];

export const CustomDesignForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    jewelryType: '',
    style: '',
    metal: '',
    diamondType: '',
    diamondShape: '',
    budget: '',
    deadline: '',
    name: '',
    phone: '',
    email: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveLead = async () => {
    if (leadSaved || !formData.name || !formData.phone) {
      return true;
    }

    setIsSavingLead(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          source: 'custom-design',
          page_path: '/custom-design',
          message: 'פנייה מטופס עיצוב אישי',
        }),
      });

      if (response.ok) {
        setLeadSaved(true);
        return true;
      } else {
        console.error('Error saving lead');
        return false;
      }
    } catch (error) {
      console.error('Error saving lead:', error);
      return false;
    } finally {
      setIsSavingLead(false);
    }
  };

  const nextStep = async () => {
    // אם עוברים משלב 1 לשלב 2, שמור ליד
    if (step === 1) {
      const saved = await saveLead();
      if (!saved) {
        alert('שגיאה בשמירת הפרטים. נסו שוב.');
        return;
      }
    }

    if (step < 7) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/custom-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: formData,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
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
      <div className="bg-surface rounded-lg p-8 text-center">
        <h2 className="text-h2 font-heading text-text-primary mb-4">
          תודה רבה!
        </h2>
        <p className="text-body text-text-secondary mb-6">
          קיבלנו את הפרטים שלך. נחזור אליך תוך 24 שעות עם הצעה מדויקת.
        </p>
        <WhatsAppButton
          className="mx-auto"
        >
          או צור קשר בוואטסאפ
        </WhatsAppButton>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6 md:p-8">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-small text-text-secondary">שלב {step} מתוך 7</span>
          <span className="text-small text-text-secondary">{Math.round((step / 7) * 100)}%</span>
        </div>
        <div className="w-full bg-border h-2 rounded-full overflow-hidden">
          <div
            className="bg-gold h-full transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={async (e) => { 
        e.preventDefault(); 
        await nextStep(); 
      }}>
        {/* Step 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">פרטי קשר</h3>
            <p className="text-body text-text-secondary">
              נתחיל בפרטים שלך כדי שנוכל לחזור אליך עם הצעה מדויקת.
            </p>
            <Input
              label="שם מלא *"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
            <Input
              label="טלפון *"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              required
            />
            <Input
              label="אימייל (אופציונלי)"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </div>
        )}

        {/* Step 2: Jewelry Type */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">איזה סוג תכשיט תרצי?</h3>
            <div className="grid grid-cols-2 gap-4">
              {JEWELRY_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    updateField('jewelryType', type.value);
                    setTimeout(() => {
                      nextStep();
                    }, 300);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.jewelryType === type.value
                      ? 'border-gold bg-gold/10'
                      : 'border-border hover:border-gold'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">איזה סגנון את מעדיפה?</h3>
            <div className="grid grid-cols-2 gap-4">
              {STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => {
                    updateField('style', style.value);
                    setTimeout(() => {
                      nextStep();
                    }, 300);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.style === style.value
                      ? 'border-gold bg-gold/10'
                      : 'border-border hover:border-gold'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Metal */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">איזו מתכת?</h3>
            <div className="grid grid-cols-2 gap-4">
              {METALS.map((metal) => (
                <button
                  key={metal.value}
                  type="button"
                  onClick={() => {
                    updateField('metal', metal.value);
                    setTimeout(() => {
                      nextStep();
                    }, 300);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-sm ${
                    formData.metal === metal.value
                      ? 'border-gold bg-gold/10'
                      : 'border-border hover:border-gold'
                  }`}
                >
                  {metal.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Diamond */}
        {step === 5 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">סוג יהלום</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {DIAMOND_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateField('diamondType', type.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.diamondType === type.value
                      ? 'border-gold bg-gold/10'
                      : 'border-border hover:border-gold'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            {formData.diamondType && (
              <>
                <h4 className="text-h3 font-heading text-text-primary mb-4">צורת יהלום</h4>
                <div className="grid grid-cols-3 gap-4">
                  {DIAMOND_SHAPES.map((shape) => (
                    <button
                      key={shape.value}
                      type="button"
                      onClick={() => {
                        updateField('diamondShape', shape.value);
                        setTimeout(() => {
                          nextStep();
                        }, 300);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-sm ${
                        formData.diamondShape === shape.value
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 6: Budget & Deadline */}
        {step === 6 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">תקציב ודדליין</h3>
            <div>
              <label className="block text-body text-text-primary mb-3">תקציב משוער</label>
              <div className="grid grid-cols-2 gap-4">
                {BUDGETS.map((budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    onClick={() => updateField('budget', budget.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-sm ${
                      formData.budget === budget.value
                        ? 'border-gold bg-gold/10'
                        : 'border-border hover:border-gold'
                    }`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-body text-text-primary mb-3">דדליין</label>
              <Input
                type="text"
                value={formData.deadline}
                onChange={(e) => updateField('deadline', e.target.value)}
                placeholder="למשל: חודשיים, עד חנוכה..."
              />
            </div>
          </div>
        )}

        {/* Step 7: Review & Submit */}
        {step === 7 && (
          <div className="space-y-6">
            <h3 className="text-h3 font-heading text-text-primary">סיכום ושליחה</h3>
            <p className="text-body text-text-secondary">
              בדקי את הפרטים שלך ולחצי על &quot;שלח&quot; כדי לשלוח את הבקשה.
            </p>
            <div className="bg-background rounded-lg p-4 space-y-2 text-sm">
              <p><strong>שם:</strong> {formData.name}</p>
              <p><strong>טלפון:</strong> {formData.phone}</p>
              {formData.email && <p><strong>אימייל:</strong> {formData.email}</p>}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={prevStep}>
              ← חזרה
            </Button>
          )}
          <div className="flex-1" />
          {step < 7 ? (
            <Button 
              type="submit" 
              variant="primary" 
              disabled={!canProceed() || isSavingLead}
            >
              {isSavingLead ? 'שומר...' : 'הבא →'}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'שולח...' : 'שלח'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return !!formData.name && !!formData.phone;
      case 2:
        return !!formData.jewelryType;
      case 3:
        return !!formData.style;
      case 4:
        return !!formData.metal;
      case 5:
        return !!formData.diamondType && !!formData.diamondShape;
      case 6:
        return !!formData.budget;
      default:
        return true;
    }
  }
};

