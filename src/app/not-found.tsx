import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      padding: 'var(--space-24) var(--space-4)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--brand-primary)',
        marginBottom: '1.5rem',
      }}>
        <Terminal size={28} />
      </div>

      <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: '0.75rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '2rem' }}>
        The engineering project guide or technology hub you were looking for does not exist or has been relocated.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          href="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--brand-primary)',
            color: '#ffffff',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          Back to Projects Catalog
        </Link>
      </div>
    </div>
  );
}
