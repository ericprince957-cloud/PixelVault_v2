import { useEffect } from 'react';

interface DocumentHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function useDocumentHead({ title, description, ogImage, noindex }: DocumentHeadProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && description) {
      descMeta.setAttribute('content', description);
    }

    // Set Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description);
    }

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg && ogImage) {
      ogImg.setAttribute('content', ogImage);
    }

    // Set Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc && description) {
      twitterDesc.setAttribute('content', description);
    }

    // Handle noindex
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }
  }, [title, description, ogImage, noindex]);
}
