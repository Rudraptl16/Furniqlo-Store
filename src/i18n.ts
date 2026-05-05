import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Premium Furniture for Modern Living",
      "shop_now": "Shop Now",
      "our_collection": "Our Featured Collection",
      "cart": "Cart",
      "total": "Total",
      "checkout": "Checkout",
      "all_products": "All Products",
      "wooden": "Wooden",
      "modern": "Modern",
      "view_more": "View More Products"
    }
  },
  hi: {
    translation: {
      "welcome": "आधुनिक जीवन के लिए प्रीमियम फर्नीचर",
      "shop_now": "अभी खरीदें",
      "our_collection": "हमारा विशेष संग्रह",
      "cart": "कार्ट",
      "total": "कुल",
      "checkout": "चेकआउट",
      "all_products": "सभी उत्पाद",
      "wooden": "लकड़ी का",
      "modern": "आधुनिक",
      "view_more": "और उत्पाद देखें"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
