import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'אודות | Hallel Diamonds',
  description: 'מותג שנבנה על איכות, שקיפות וקראפט',
};

export default function AboutPage() {
  return (
    <div className="bg-background py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-h1 font-heading text-text-primary mb-6">
              מותג שנבנה על איכות, שקיפות וקראפט
            </h1>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              אנחנו עובדים עם סטנדרטים גבוהים של חומרי גלם, גימור ותעודות. המטרה: שתקבלו תכשיט שתרגישו איתו בטוחים וגאים — שנים קדימה.
            </p>
          </div>

          {/* Main Image */}
          <div className="relative aspect-video mb-16 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/demo/showroom.jpg"
              alt="חנות תכשיטים מודרנית"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          {/* Story Section */}
          <section className="mb-16">
            <h2 className="text-h2 font-heading text-text-primary mb-6 text-center">
              הסיפור שלנו
            </h2>
            <div className="space-y-6 text-body text-text-secondary">
              <p>
                Hallel Diamonds נוסד מתוך אמונה עמוקה שכל תכשיט צריך להיות יותר מסתם פריט יוקרה — הוא צריך להיות חלק מהסיפור האישי שלך. אנחנו מתמחים ביצירת תכשיטים ייחודיים שמשלבים בין מסורת עתיקה לטכנולוגיה מודרנית.
              </p>
              <p>
                כל תכשיט שאנחנו יוצרים עובר תהליך קפדני של בחירת חומרי גלם, עיצוב מדויק וייצור מקצועי. אנחנו עובדים רק עם ספקים מובילים בעולם של יהלומים טבעיים ויהלומי מעבדה, וכל תכשיט מגיע עם תעודה גמולוגית בין-לאומית.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-h2 font-heading text-text-primary mb-8 text-center">
              למה לבחור בנו?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📜</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-h3 text-text-primary mb-2">
                      תעודה גמולוגית בין-לאומית
                    </h3>
                    <p className="text-body text-text-secondary">
                      כל תכשיט מגיע עם תעודה גמולוגית בין-לאומית המאשרת את איכות היהלומים, האבנים והמתכת. אתם מקבלים שקט נפשי מלא.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-h3 text-text-primary mb-2">
                      שקיפות מלאה
                    </h3>
                    <p className="text-body text-text-secondary">
                      אנחנו מספקים שקיפות מלאה על סוג היהלום (טבעי או מעבדה), מקור המתכת, וכל פרט טכני. אין הפתעות.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-h3 text-text-primary mb-2">
                      ליווי אישי
                    </h3>
                    <p className="text-body text-text-secondary">
                      יועצים מומחים מלווים אתכם בכל שלב — מבחירת התכשיט ועד התאמה מושלמת. אנחנו כאן כדי להבטיח שתקבלו בדיוק מה שחלמתם עליו.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-h3 text-text-primary mb-2">
                      עיצוב אישי
                    </h3>
                    <p className="text-body text-text-secondary">
                      רוצים משהו ייחודי? אנחנו מציעים שירות עיצוב אישי מלא, לפי החלום והתקציב שלכם. כל תכשיט הוא יצירת אמנות ייחודית.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quality & Craftsmanship */}
          <section className="mb-16">
            <h2 className="text-h2 font-heading text-text-primary mb-8 text-center">
              איכות וקראפט
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="font-heading text-h3 text-text-primary mb-2">
                  יהלומים איכותיים
                </h3>
                <p className="text-body text-text-secondary">
                  אנחנו עובדים רק עם יהלומים בעלי דירוג גבוה (VS+), עם חיתוך מושלם וברק יוצא דופן.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚒️</div>
                <h3 className="font-heading text-h3 text-text-primary mb-2">
                  עבודת צורפות מקצועית
                </h3>
                <p className="text-body text-text-secondary">
                  כל תכשיט מיוצר על ידי צורפים מנוסים עם שנים של ניסיון, תוך שימוש בטכניקות מסורתיות ומודרניות.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-heading text-h3 text-text-primary mb-2">
                  אחריות מלאה
                </h3>
                <p className="text-body text-text-secondary">
                  כל תכשיט מגיע עם אחריות מלאה על איכות החומרים והעבודה. אנחנו כאן בשבילכם לטווח הארוך.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section>
            <h2 className="text-h2 font-heading text-text-primary mb-8 text-center">
              תהליך העבודה שלנו
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/demo/showroom.jpg"
                  alt="ייעוץ ראשוני"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/demo/rings.jpg"
                  alt="עיצוב והתאמה"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/demo/necklace.avif"
                  alt="ייצור מקצועי"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/demo/showroom.jpg"
                  alt="גימור ומסירה"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
