import React from 'react';
import { Metadata } from 'next';
import { getAllBlogArticles } from '@/lib/content/blogs';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Engineering Placement & Final Year Project Guides | Blog',
  description: 'In-depth articles analyzing how to pick final-year CSE projects, crack placement technical project interviews, and design concurrent microservices.',
  alternates: {
    canonical: 'https://devprojects.io/blog',
  },
};

export default async function BlogIndexPage() {
  const articles = await getAllBlogArticles();

  return (
    <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Blog' }]} />

        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
            Editorial Publications
          </span>
          <h1 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>Engineering & Placement Articles</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Pragmatic architectural insights, project selection frameworks, and viva prep questions written by experienced systems architects.
          </p>
        </div>

        <div className="grid-2">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
