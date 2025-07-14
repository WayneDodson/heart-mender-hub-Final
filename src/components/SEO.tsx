import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  type?: string;
  image?: string;
  schemaData?: any;
}

const SEO: React.FC<SEOProps> = ({
  title = "Heart Mender - Healing After Divorce | Support & Resources",
  description = "Find support, resources, and community for healing after divorce. Join Heart Mender for stories, expert advice, self-care tips, and emotional support on your journey to recovery.",
  keywords = "divorce support, healing after divorce, divorce recovery, emotional support, divorce community, self-care after divorce, moving on after divorce, divorce resources",
  url = "https://www.heartmenderhub.com",
  type = "website",
  image = "https://www.heartmenderhub.com/og-image.jpg",
  schemaData
}) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Heart Mender', true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update or create schema
    if (schemaData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaData);
    }
  }, [title, description, keywords, url, type, image, schemaData]);

  return null;
};

export default SEO;