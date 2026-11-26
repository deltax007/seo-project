import { Project } from '../content/schemas/project';
import { BlogArticle } from '../content/schemas/blog';
import { FaqItem } from '../content/schemas/common';

export const SITE_URL = 'https://www.cse-placement-project-guide.me';
export const SITE_NAME = 'CSE Project Hub';

function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.replace(/\/+$/, '');
}

/**
 * Generates standalone Organization JSON-LD structured data.
 */
export function generateOrganizationJsonLd(siteUrl: string = SITE_URL) {
  const normalizedUrl = normalizeSiteUrl(siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${normalizedUrl}/#organization`,
    name: SITE_NAME,
    url: normalizedUrl,
  };
}

/**
 * Generates standalone WebSite JSON-LD structured data linked to Organization.
 */
export function generateWebSiteJsonLd(siteUrl: string = SITE_URL) {
  const normalizedUrl = normalizeSiteUrl(siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${normalizedUrl}/#website`,
    name: SITE_NAME,
    url: normalizedUrl,
    publisher: {
      '@id': `${normalizedUrl}/#organization`,
    },
  };
}

/**
 * Combines Organization and WebSite schemas into a single @graph for root layout rendering.
 */
export function generateSiteGraphJsonLd(siteUrl: string = SITE_URL) {
  const { '@context': _orgContext, ...organization } = generateOrganizationJsonLd(siteUrl);
  const { '@context': _webContext, ...website } = generateWebSiteJsonLd(siteUrl);

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateTechArticleJsonLd(project: Project, siteUrl: string = SITE_URL) {
  const normalizedUrl = normalizeSiteUrl(siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.shortDescription,
    proficiencyLevel: project.difficulty,
    dependencies: project.programmingLanguages.concat(project.technologySlugs).join(', '),
    datePublished: project.publishedAt,
    dateModified: project.updatedAt,
    author: {
      '@type': 'Person',
      name: project.author.name,
      jobTitle: project.author.role,
    },
    publisher: {
      '@id': `${normalizedUrl}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${normalizedUrl}/projects/${project.slug}`,
    },
  };
}

export function generateArticleJsonLd(blog: BlogArticle, siteUrl: string = SITE_URL) {
  const normalizedUrl = normalizeSiteUrl(siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: blog.author.name,
      jobTitle: blog.author.role,
    },
    publisher: {
      '@id': `${normalizedUrl}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${normalizedUrl}/blog/${blog.slug}`,
    },
  };
}

export function generateFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateAboutPageJsonLd(siteUrl: string = SITE_URL) {
  const normalizedUrl = normalizeSiteUrl(siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME}, an engineering project platform helping Computer Science and IT students build architecture-first final-year and placement projects.`,
    url: `${normalizedUrl}/about`,
    isPartOf: {
      '@id': `${normalizedUrl}/#website`,
    },
    mainEntity: {
      '@id': `${normalizedUrl}/#organization`,
    },
  };
}
