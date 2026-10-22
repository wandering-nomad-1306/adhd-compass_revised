import { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface MedicalAspectData {
  aspect: string;
  condition?: string;
  citations?: string[];
  audience?: string;
  datePublished?: string;
  dateModified?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  medicalData?: MedicalAspectData;
  faqItems?: FAQItem[];
}

const BASE_URL = 'https://adhdcompass.in';
const DEFAULT_OG_IMAGE = `${BASE_URL}/hero-reference.png`;

/**
 * SEO & Structured Data Manager for ADHD Compass
 * Handles dynamic document titles, meta tags, canonical links,
 * and Schema.org JSON-LD (MedicalWebPage, BreadcrumbList, FAQPage).
 */
export default function SEO({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  breadcrumbs,
  medicalData,
  faqItems,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title.includes('ADHD Compass') ? title : `${title} | ADHD Compass`;
    document.title = formattedTitle;

    // Helper to get or create meta/link elements
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 3. Canonical Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'ADHD Compass');
    setMetaTag('property', 'og:locale', 'en_US');
    setMetaTag('property', 'og:image', ogImage);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Helper for JSON-LD scripts
    const setJsonLdScript = (id: string, schemaObj: object | null) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!schemaObj) {
        if (script) script.remove();
        return;
      }
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaObj, null, 2);
    };

    // 6. Schema.org BreadcrumbList
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbListSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${BASE_URL}${crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`}`,
        })),
      };
      setJsonLdScript('schema-breadcrumbs', breadcrumbListSchema);
    } else {
      setJsonLdScript('schema-breadcrumbs', null);
    }

    // 7. Schema.org MedicalWebPage (Clinical Content)
    if (medicalData) {
      const medicalWebPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        '@id': `${canonicalUrl}#medicalwebpage`,
        url: canonicalUrl,
        name: formattedTitle,
        description,
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          name: 'ADHD Compass',
          url: BASE_URL,
        },
        about: {
          '@type': 'MedicalCondition',
          name: medicalData.condition || 'Attention Deficit Hyperactivity Disorder',
          alternateName: ['ADHD', 'ADD', 'Attention Deficit Disorder'],
          code: {
            '@type': 'MedicalCode',
            code: 'F90',
            codingSystem: 'ICD-10-CM',
          },
        },
        aspect: medicalData.aspect,
        medicalAudience: {
          '@type': 'MedicalAudience',
          medicalAudienceType: medicalData.audience || 'Patients, Caregivers, Healthcare Professionals, Students',
        },
        citation: medicalData.citations || [
          'NICE Guideline NG87: Attention deficit hyperactivity disorder: diagnosis and management (2018/2024)',
          'Cortese et al., Comparative efficacy and tolerability of medications for ADHD in children, adolescents, and adults: a systematic review and network meta-analysis, Lancet Psychiatry (2018)',
          'Faraone et al., The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder, Neuroscience & Biobehavioral Reviews (2021)',
        ],
        datePublished: medicalData.datePublished || '2026-01-01',
        dateModified: medicalData.dateModified || '2026-10-17',
        publisher: {
          '@type': 'EducationalOrganization',
          '@id': `${BASE_URL}/#organization`,
          name: 'ADHD Compass',
          url: BASE_URL,
        },
      };
      setJsonLdScript('schema-medical-webpage', medicalWebPageSchema);
    } else {
      setJsonLdScript('schema-medical-webpage', null);
    }

    // 8. Schema.org FAQPage (for Q&A/Myth Debunking chapters)
    if (faqItems && faqItems.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
      setJsonLdScript('schema-faq', faqSchema);
    } else {
      setJsonLdScript('schema-faq', null);
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [title, description, canonicalPath, type, ogImage, breadcrumbs, medicalData, faqItems]);

  return null;
}
