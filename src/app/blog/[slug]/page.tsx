import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Calendar, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { getAllBlogArticles, getBlogArticleBySlug } from '@/lib/content/blogs';
import { getProjectBySlug } from '@/lib/content/projects';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProjectCard } from '@/components/project/ProjectCard';
import { Accordion } from '@/components/common/Accordion';
import { generateBreadcrumbJsonLd, generateArticleJsonLd, generateFaqJsonLd } from '@/lib/seo/jsonld';

export async function generateStaticParams() {
  const articles = await getAllBlogArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription,
    alternates: {
      canonical: `https://devprojects.io/blog/${article.slug}`,
    },
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) notFound();

  // Load featured project cards linked in this blog article
  const featuredProjects = await Promise.all(
    article.featuredProjectSlugs.map((pSlug) => getProjectBySlug(pSlug))
  );
  const validProjects = featuredProjects.filter(Boolean) as any[];

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Blog', url: 'https://devprojects.io/blog' },
    { name: article.title, url: `https://devprojects.io/blog/${article.slug}` },
  ]);
  const articleJsonLd = generateArticleJsonLd(article);
  const faqJsonLd = article.faqs ? generateFaqJsonLd(article.faqs) : null;

  const faqAccordionItems = article.faqs?.map((f, idx) => ({
    id: `blog-faq-${idx}`,
    title: f.question,
    content: f.answer,
  })) || [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <Breadcrumbs items={[
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]} />

          <article className="reading-container">
            {/* Article Header */}
            <header style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  color: 'var(--badge-tech-text)',
                  border: '1px solid var(--badge-tech-border)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                }}>
                  {article.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  <Clock size={13} />
                  <span>{article.readTimeMinutes} min read</span>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.25, marginBottom: '1.25rem' }}>
                {article.title}
              </h1>

              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {article.excerpt}
              </p>

              {/* Author Strip & Date */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
              }}>
                <div>
                  By <strong style={{ color: 'var(--text-primary)' }}>{article.author.name}</strong> ({article.author.role})
                </div>
                {article.reviewer && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} color="var(--brand-secondary)" />
                    <span>Reviewed by {article.reviewer.name}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={13} />
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h2 key={idx} style={{
                      fontSize: 'var(--text-2xl)',
                      color: 'var(--text-primary)',
                      marginTop: '1.5rem',
                      marginBottom: '0.5rem',
                    }}>
                      {paragraph.replace('### ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} style={{
                      borderLeft: '4px solid var(--brand-primary)',
                      padding: '1rem 1.25rem',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                      color: 'var(--text-primary)',
                      fontStyle: 'italic',
                    }}>
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                if (paragraph === '---') {
                  return <hr key={idx} style={{ borderColor: 'var(--border-subtle)', margin: '1rem 0' }} />;
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            {/* Featured Project Deep-Links (Relationship Chain) */}
            {validProjects.length > 0 && (
              <div style={{
                marginTop: '3.5rem',
                padding: '2rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <BookOpen size={20} color="var(--brand-primary)" />
                  <h3 style={{ fontSize: 'var(--text-xl)' }}>Featured Implementation Project</h3>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Want to build this yourself? Explore our verified project guide with full architectures, database designs, and code samples.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                  {validProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {faqAccordionItems.length > 0 && (
              <div style={{ marginTop: '3.5rem' }}>
                <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: '1.25rem' }}>Frequently Asked Questions</h3>
                <Accordion items={faqAccordionItems} />
              </div>
            )}

            {/* Author Profile Bio Box */}
            <div style={{
              marginTop: '3.5rem',
              padding: '1.5rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              gap: '1rem',
            }}>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  Written by {article.author.name}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
                  {article.author.role}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {article.author.bio}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
