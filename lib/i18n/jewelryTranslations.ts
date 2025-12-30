export type Language = 'he' | 'en' | 'ar';

export interface JewelryTranslations {
  // Navigation
  nav: {
    home: string;
    catalog: string;
    customDesign: string;
    about: string;
    contact: string;
  };
  // Homepage
  home: {
    hero: {
      title: string;
      subtitle: string;
      ctaWhatsApp: string;
      ctaCatalog: string;
    };
    whyChoose: {
      title: string;
    };
    featured: {
      title: string;
      viewAll: string;
    };
    customDesign: {
      title: string;
      description: string;
      cta: string;
    };
  };
  // Catalog
  catalog: {
    title: string;
    description: string;
    all: string;
    noProducts: string;
  };
  // Product
  product: {
    backToCatalog: string;
    metal: string;
    stone: string;
    carat: string;
    shortDesc: string;
    longDesc: string;
    whatsAppMessage: string;
  };
  // Custom Design
  customDesign: {
    title: string;
    description: string;
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
    submit: string;
    submitting: string;
    success: string;
  };
  // About
  about: {
    title: string;
    description: string;
    whyChoose: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
  // Contact
  contact: {
    title: string;
    description: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    successMessage: string;
    or: string;
    whatsApp: string;
  };
  // Common
  common: {
    whatsApp: string;
    required: string;
    loading: string;
  };
  // Footer
  footer: {
    quickLinks: string;
    moreInfo: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
}

export const jewelryTranslations: Record<Language, JewelryTranslations> = {
  he: {
    nav: {
      home: 'בית',
      catalog: 'קטלוג',
      customDesign: 'עיצוב אישי',
      about: 'אודות',
      contact: 'צור קשר',
    },
    home: {
      hero: {
        title: 'תכשיטים שמרגישים כמו "אחד מתוך מיליון"',
        subtitle: 'יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה',
        ctaWhatsApp: 'לייעוץ בוואטסאפ',
        ctaCatalog: 'לצפייה בקטלוג',
      },
      whyChoose: {
        title: 'כשזה יהלומים – אין מקום לפשרות',
      },
      featured: {
        title: 'קולקציות נבחרות',
        viewAll: 'לצפייה בכל הקטלוג',
      },
      customDesign: {
        title: 'רוצה משהו שאין לאף אחד?',
        description: 'ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.',
        cta: 'מתחילים אבחון עיצוב אישי',
      },
    },
    catalog: {
      title: 'הקטלוג שלנו',
      description: 'בחרו קטגוריה, התרשמו מהמחירים — ובקליק עוברים לוואטסאפ עם כל הפרטים.',
      all: 'הכל',
      noProducts: 'לא נמצאו מוצרים בקטגוריה זו.',
    },
    product: {
      backToCatalog: '← חזרה לקטלוג',
      metal: 'מתכת:',
      stone: 'אבן:',
      carat: 'קראט:',
      shortDesc: 'תיאור קצר',
      longDesc: 'תיאור מפורט',
      whatsAppMessage: 'ההודעה תיפתח עם שם המוצר והמחיר כדי לחסוך זמן.',
    },
    customDesign: {
      title: 'רוצה משהו שאין לאף אחד?',
      description: 'ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.',
      jewelryType: 'סוג תכשיט',
      style: 'סגנון',
      metal: 'מתכת',
      diamondType: 'סוג יהלום',
      diamondShape: 'צורת יהלום',
      budget: 'תקציב',
      deadline: 'מועד רצוי',
      name: 'שם מלא',
      phone: 'טלפון',
      email: 'אימייל',
      submit: 'שלח',
      submitting: 'שולח...',
      success: 'תודה! קיבלנו את הפניה שלך.',
    },
    about: {
      title: 'מותג שנבנה על איכות, שקיפות וקראפט',
      description: 'אנחנו עובדים עם סטנדרטים גבוהים של חומרי גלם, גימור ותעודות. המטרה: שתקבלו תכשיט שתרגישו איתו בטוחים וגאים — שנים קדימה.',
      whyChoose: 'למה לבחור בנו?',
      feature1: 'תעודה גמולוגית בין-לאומית לכל תכשיט',
      feature2: 'שקיפות מלאה על סוג היהלום והמתכת',
      feature3: 'ליווי אישי עד התאמה מושלמת',
      feature4: 'אפשרות לעיצוב אישי לפי חלום ותקציב',
    },
    contact: {
      title: 'צור קשר',
      description: 'רוצים המלצה מהירה? כתבו לנו בוואטסאפ או השאירו פרטים ונחזור אליכם.',
      name: 'שם מלא *',
      phone: 'טלפון *',
      email: 'אימייל',
      message: 'הודעה *',
      submit: 'שלח',
      submitting: 'שולח...',
      success: 'תודה רבה!',
      successMessage: 'קיבלנו את הפניה שלך. נחזור אליך בהקדם.',
      or: 'או',
      whatsApp: 'צור קשר בוואטסאפ',
    },
    common: {
      whatsApp: 'לרכישה/ייעוץ בוואטסאפ',
      required: '*',
      loading: 'טוען...',
    },
    footer: {
      quickLinks: 'קישורים מהירים',
      moreInfo: 'מידע נוסף',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
      copyright: 'כל הזכויות שמורות.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      catalog: 'Catalog',
      customDesign: 'Custom Design',
      about: 'About',
      contact: 'Contact',
    },
    home: {
      hero: {
        title: 'Jewelry that feels like "one in a million"',
        subtitle: 'Natural and lab-grown diamonds • 14K/18K Gold • High-end craftsmanship',
        ctaWhatsApp: 'Consult on WhatsApp',
        ctaCatalog: 'View Catalog',
      },
      whyChoose: {
        title: 'When it comes to diamonds – no compromises',
      },
      featured: {
        title: 'Featured Collections',
        viewAll: 'View Full Catalog',
      },
      customDesign: {
        title: 'Want something no one else has?',
        description: 'Fill out a 2-minute questionnaire, and we\'ll get back to you with a precise quote.',
        cta: 'Start Custom Design Assessment',
      },
    },
    catalog: {
      title: 'Our Catalog',
      description: 'Choose a category, check out the prices — and with one click go to WhatsApp with all the details.',
      all: 'All',
      noProducts: 'No products found in this category.',
    },
    product: {
      backToCatalog: '← Back to Catalog',
      metal: 'Metal:',
      stone: 'Stone:',
      carat: 'Carat:',
      shortDesc: 'Short Description',
      longDesc: 'Detailed Description',
      whatsAppMessage: 'The message will open with the product name and price to save time.',
    },
    customDesign: {
      title: 'Want something no one else has?',
      description: 'Fill out a 2-minute questionnaire, and we\'ll get back to you with a precise quote.',
      jewelryType: 'Jewelry Type',
      style: 'Style',
      metal: 'Metal',
      diamondType: 'Diamond Type',
      diamondShape: 'Diamond Shape',
      budget: 'Budget',
      deadline: 'Preferred Date',
      name: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Thank you! We received your inquiry.',
    },
    about: {
      title: 'A brand built on quality, transparency, and craft',
      description: 'We work with high standards of raw materials, finishing, and certificates. The goal: that you receive jewelry you feel secure and proud of — for years to come.',
      whyChoose: 'Why choose us?',
      feature1: 'International gemological certificate for every piece',
      feature2: 'Full transparency on diamond type and metal',
      feature3: 'Personal guidance until perfect fit',
      feature4: 'Option for custom design according to dream and budget',
    },
    contact: {
      title: 'Contact Us',
      description: 'Want a quick recommendation? Write to us on WhatsApp or leave your details and we\'ll get back to you.',
      name: 'Full Name *',
      phone: 'Phone *',
      email: 'Email',
      message: 'Message *',
      submit: 'Send',
      submitting: 'Sending...',
      success: 'Thank you!',
      successMessage: 'We received your inquiry. We\'ll get back to you soon.',
      or: 'Or',
      whatsApp: 'Contact on WhatsApp',
    },
    common: {
      whatsApp: 'Purchase/Consult on WhatsApp',
      required: '*',
      loading: 'Loading...',
    },
    footer: {
      quickLinks: 'Quick Links',
      moreInfo: 'More Information',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: 'All rights reserved.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      catalog: 'الكتالوج',
      customDesign: 'تصميم مخصص',
      about: 'من نحن',
      contact: 'اتصل بنا',
    },
    home: {
      hero: {
        title: 'مجوهرات تشعر بأنها "واحدة من مليون"',
        subtitle: 'ألماس طبيعي ومصنع • ذهب 14K/18K • حرفية عالية الجودة',
        ctaWhatsApp: 'استشارة على واتساب',
        ctaCatalog: 'عرض الكتالوج',
      },
      whyChoose: {
        title: 'عندما يتعلق الأمر بالألماس – لا مساومة',
      },
      featured: {
        title: 'مجموعات مختارة',
        viewAll: 'عرض الكتالوج الكامل',
      },
      customDesign: {
        title: 'تريد شيئاً لا يملكه أحد آخر؟',
        description: 'املأ استبياناً لمدة دقيقتين، وسنعود إليك بعرض دقيق.',
        cta: 'ابدأ تقييم التصميم المخصص',
      },
    },
    catalog: {
      title: 'كتالوجنا',
      description: 'اختر فئة، تحقق من الأسعار — وبضغطة واحدة انتقل إلى واتساب مع جميع التفاصيل.',
      all: 'الكل',
      noProducts: 'لم يتم العثور على منتجات في هذه الفئة.',
    },
    product: {
      backToCatalog: '← العودة إلى الكتالوج',
      metal: 'المعدن:',
      stone: 'الحجر:',
      carat: 'القيراط:',
      shortDesc: 'وصف قصير',
      longDesc: 'وصف مفصل',
      whatsAppMessage: 'ستفتح الرسالة مع اسم المنتج والسعر لتوفير الوقت.',
    },
    customDesign: {
      title: 'تريد شيئاً لا يملكه أحد آخر؟',
      description: 'املأ استبياناً لمدة دقيقتين، وسنعود إليك بعرض دقيق.',
      jewelryType: 'نوع المجوهرات',
      style: 'النمط',
      metal: 'المعدن',
      diamondType: 'نوع الألماس',
      diamondShape: 'شكل الألماس',
      budget: 'الميزانية',
      deadline: 'التاريخ المفضل',
      name: 'الاسم الكامل',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      submit: 'إرسال',
      submitting: 'جاري الإرسال...',
      success: 'شكراً! لقد تلقينا استفسارك.',
    },
    about: {
      title: 'علامة تجارية مبنية على الجودة والشفافية والحرفية',
      description: 'نعمل بمعايير عالية من المواد الخام والإنهاء والشهادات. الهدف: أن تحصل على مجوهرات تشعر بالأمان والفخر بها — لسنوات قادمة.',
      whyChoose: 'لماذا تختارنا؟',
      feature1: 'شهادة جيولوجية دولية لكل قطعة',
      feature2: 'شفافية كاملة حول نوع الألماس والمعدن',
      feature3: 'إرشاد شخصي حتى الملاءمة المثالية',
      feature4: 'خيار للتصميم المخصص وفقاً للحلم والميزانية',
    },
    contact: {
      title: 'اتصل بنا',
      description: 'تريد توصية سريعة؟ اكتب لنا على واتساب أو اترك تفاصيلك وسنعود إليك.',
      name: 'الاسم الكامل *',
      phone: 'الهاتف *',
      email: 'البريد الإلكتروني',
      message: 'الرسالة *',
      submit: 'إرسال',
      submitting: 'جاري الإرسال...',
      success: 'شكراً!',
      successMessage: 'لقد تلقينا استفسارك. سنعود إليك قريباً.',
      or: 'أو',
      whatsApp: 'اتصل على واتساب',
    },
    common: {
      whatsApp: 'شراء/استشارة على واتساب',
      required: '*',
      loading: 'جاري التحميل...',
    },
    footer: {
      quickLinks: 'روابط سريعة',
      moreInfo: 'معلومات إضافية',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      copyright: 'جميع الحقوق محفوظة.',
    },
  },
};

