import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumbs" style={{ marginBottom: '1.25rem' }}>
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
        listStyle: 'none',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)'
      }}>
        <li>
          <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ChevronRight size={12} color="var(--text-muted)" />
            {item.href ? (
              <Link href={item.href} style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
