'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { SearchModal } from '../search/SearchModal';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Technologies', href: '/technologies' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container" style={{
          height: '4.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Brand Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: 'var(--text-lg)',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Terminal size={18} strokeWidth={2.5} />
            </div>
            <span>
              Dev<span style={{ color: 'var(--brand-primary)' }}>Projects</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.15s ease',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search Trigger Button */}
            <button
              id="global-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 1rem',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
              }}
            >
              <Search size={14} color="var(--brand-primary)" />
              <span className="search-btn-text">Search projects...</span>
              <kbd style={{
                background: 'var(--bg-elevated)',
                padding: '0.15rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                Ctrl K
              </kbd>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/projects"
              className="explore-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 'var(--text-xs)',
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-primary)')}
            >
              Explore Projects
              <ArrowUpRight size={14} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="mobile-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                padding: '0.4rem',
              }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: pathname.startsWith(link.href) ? 'var(--brand-primary)' : 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                marginTop: '0.5rem',
              }}
            >
              Explore Projects
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
