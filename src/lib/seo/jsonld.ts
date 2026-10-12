import { Project } from '../content/schemas/project';
import { BlogArticle } from '../content/schemas/blog';
import { FaqItem } from '../content/schemas/common';

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

export function generateTechArticleJsonLd(project: Project, siteUrl: string = 'https://devprojects.io') {
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
      '@type': 'Organization',
      name: 'DevProjects Engineering Platform',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export function generateArticleJsonLd(blog: BlogArticle, siteUrl: string = 'https://devprojects.io') {
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
      '@type': 'Organization',
      name: 'DevProjects Engineering Platform',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${blog.slug}`,
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
