import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { BlogArticle } from '@/lib/content/schemas/blog';

export function BlogCard({ article }: { article: BlogArticle }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="card-base" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 'var(--text-xs)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            color: 'var(--badge-tech-text)',
            border: '1px solid var(--badge-tech-border)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
          }}>
            {article.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <Clock size={12} />
            <span>{article.readTimeMinutes} min read</span>
          </div>
        </div>

        <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
          <Link href={`/blog/${article.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
            {article.title}
          </Link>
        </h3>

        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {article.excerpt}
        </p>
      </div>

      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={13} color="var(--brand-primary)" />
          <span>{article.author.name}</span>
        </div>
        <Link
          href={`/blog/${article.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--brand-primary)',
            fontWeight: 600,
          }}
        >
          Read Guide
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
