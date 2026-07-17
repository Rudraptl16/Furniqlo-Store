import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const useSeo = (props?: SeoProps) => {
  const { selectedProduct, currency, exchangeRate } = useCart();

  useEffect(() => {
    if (!props) return;
    if (props.title) document.title = props.title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (props.description) {
      updateMetaTag('description', props.description);
      updateMetaTag('og:description', props.description, true);
      updateMetaTag('twitter:description', props.description);
    }
    if (props.keywords) {
      updateMetaTag('keywords', props.keywords);
    }
    if (props.image) {
      updateMetaTag('og:image', props.image, true);
      updateMetaTag('twitter:image', props.image);
    }
    if (props.url) {
      updateMetaTag('og:url', props.url, true);
    }
  }, [props]);

  useEffect(() => {
    // 1. Injected Default Schemas: LocalBusiness and Website
    const defaultSchemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'FurnitureStore',
        'name': 'Furniqlo Furniture Store',
        'image': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000',
        '@id': 'https://furniqlo.store/#store',
        'url': 'https://furniqlo.store',
        'telephone': '+1-800-555-0199',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '850 Artisanal Way',
          'addressLocality': 'San Francisco',
          'addressRegion': 'CA',
          'postalCode': '94103',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 37.7749,
          'longitude': -122.4194
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          'opens': '09:00',
          'closes': '19:00'
        },
        'sameAs': [
          'https://facebook.com/furniqlo',
          'https://instagram.com/furniqlo',
          'https://twitter.com/furniqlo'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': 'https://furniqlo.store',
        'name': 'Furniqlo',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://furniqlo.store/?search={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      }
    ];

    // Remove existing default schema tags
    const existingDefaultScript = document.getElementById('furniqlo-seo-default');
    if (existingDefaultScript) {
      existingDefaultScript.remove();
    }

    // Add default schema
    const defaultScript = document.createElement('script');
    defaultScript.id = 'furniqlo-seo-default';
    defaultScript.type = 'application/ld+json';
    defaultScript.innerHTML = JSON.stringify(defaultSchemas);
    document.head.appendChild(defaultScript);

    return () => {
      if (defaultScript) defaultScript.remove();
    };
  }, []);

  useEffect(() => {
    // 2. Injected Product Schema when product is selected (Quick View)
    if (!selectedProduct) {
      const existingProductScript = document.getElementById('furniqlo-seo-product');
      if (existingProductScript) {
        existingProductScript.remove();
      }
      return;
    }

    const symbol = currency === 'USD' ? 'USD' : currency === 'EUR' ? 'EUR' : 'INR';
    const formattedPrice = (selectedProduct.price * exchangeRate).toFixed(0);

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': selectedProduct.name,
      'image': [selectedProduct.image],
      'description': selectedProduct.description || 'Premium handcrafted design by Furniqlo.',
      'sku': `FURN-${selectedProduct.id}`,
      'mpn': `MPN-${selectedProduct.id}`,
      'brand': {
        '@type': 'Brand',
        'name': selectedProduct.brand || 'Furniqlo Studio'
      },
      'offers': {
        '@type': 'Offer',
        'url': `https://furniqlo.store/#shop`,
        'priceCurrency': symbol,
        'price': formattedPrice,
        'priceValidUntil': '2027-12-31',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'Organization',
          'name': 'Furniqlo Furniture Store'
        }
      },
      'aggregateRating': selectedProduct.rating ? {
        '@type': 'AggregateRating',
        'ratingValue': selectedProduct.rating,
        'reviewCount': selectedProduct.reviews || 48
      } : undefined
    };

    // Remove existing product script
    const existingProductScript = document.getElementById('furniqlo-seo-product');
    if (existingProductScript) {
      existingProductScript.remove();
    }

    const productScript = document.createElement('script');
    productScript.id = 'furniqlo-seo-product';
    productScript.type = 'application/ld+json';
    productScript.innerHTML = JSON.stringify(productSchema);
    document.head.appendChild(productScript);

    // Update document title dynamically
    const originalTitle = document.title;
    document.title = `${selectedProduct.name} | Furniqlo Atelier`;

    return () => {
      if (productScript) productScript.remove();
      document.title = originalTitle;
    };
  }, [selectedProduct, currency, exchangeRate]);
};
