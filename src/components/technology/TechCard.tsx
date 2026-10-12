import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Server, Terminal, Layout, Database, Shield } from 'lucide-react';
import { Technology } from '@/lib/content/schemas/technology';

export function TechCard({ technology, projectCount }: { technology: Technology; projectCount?: number }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cpu': return <Cpu size={22} />;
      case 'server': return <Server size={22} />;
      case 'terminal': return <Terminal size={22} />;
      case 'layout': return <Layout size={22} />;
      case 'database': return <Database size={22} />;
      case 'shield': return <Shield size={22} />;
      default: return <Server size={22} />;
    }
  };

  return (
    <article className="card-base" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)',
          }}>
            {getIcon(technology.icon)}
          </div>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-elevated)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
          }}>
            {technology.categoryLabel}
          </span>
        </div>

        <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.5rem' }}>
          <Link href={`/technologies/${technology.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
            {technology.name}
          </Link>
        </h3>

        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
        }}>
          {technology.description}
        </p>

        {technology.subTechnologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
            {technology.subTechnologies.slice(0, 4).map((sub, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11px',
                  backgroundColor: 'var(--bg-elevated)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                }}
              >
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          {projectCount !== undefined ? `${projectCount} Guides Available` : 'Active Track'}
        </span>
        <Link
          href={`/technologies/${technology.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--brand-primary)',
          }}
        >
          Explore Hub
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
