import { Metadata } from 'next';
import { CustomDesignForm } from '@/components/custom-design/CustomDesignForm';

export const metadata: Metadata = {
  title: 'עיצוב אישי | Hallel Diamonds',
  description: 'רוצה משהו שאין לאף אחד? ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.',
  keywords: 'עיצוב תכשיטים אישי, תכשיטים מותאמים אישית, עיצוב תכשיט לפי הזמנה',
  openGraph: {
    title: 'עיצוב אישי | Hallel Diamonds',
    description: 'רוצה משהו שאין לאף אחד? ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.',
    type: 'website',
    locale: 'he_IL',
  },
};

export default function CustomDesignPage() {
  return (
    <div className="bg-background py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-h1 font-heading text-text-primary mb-4">
              רוצה משהו שאין לאף אחד?
            </h1>
            <p className="text-body text-text-secondary">
              ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.
            </p>
          </div>
          <CustomDesignForm />
        </div>
      </div>
    </div>
  );
}

