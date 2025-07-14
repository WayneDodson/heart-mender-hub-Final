import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Heart Mender",
    "url": url,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Heart Mender",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.heartmenderhub.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const schema = schemaData || defaultSchema;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Heart Mender" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEO;