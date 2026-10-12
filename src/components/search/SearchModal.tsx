'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Layers, Code, BookOpen, ArrowRight } from 'lucide-react';
import { defaultSearchService } from '@/lib/search';
import { SearchResultItem } from '@/lib/search/types';
import { Badge } from '../common/Badge';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      performSearch('');
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal
          const btn = document.getElementById('global-search-trigger');
          btn?.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const performSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const res = await defaultSearchService.search({ term, limit: 8 });
      setResults(res);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    performSearch(val);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Platform"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '4rem 1rem 1rem 1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)',
        }}>
          <Search size={18} color="var(--brand-primary)" />
          <input
            ref={inputRef}
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search projects, technologies, skills, or blogs..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              fontFamily: 'inherit',
            }}
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                performSearch('');
              }}
              style={{ color: 'var(--text-muted)' }}
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <span style={{
            fontSize: 'var(--text-xs)',
            background: 'var(--bg-elevated)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div style={{ overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {isLoading && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              Searching technical catalog...
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>No results found</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: '0.25rem' }}>
                Try searching for &quot;Spring Boot&quot;, &quot;NLP&quot;, &quot;Banking&quot;, or &quot;FastAPI&quot;
              </p>
            </div>
          )}

          {!isLoading && results.map((item) => (
            <Link
              key={`${item.entityType}-${item.id}`}
              href={item.url}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', maxWidth: '85%' }}>
                <div style={{
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--brand-primary)',
                  marginTop: '0.15rem'
                }}>
                  {item.entityType === 'project' && <Code size={16} />}
                  {item.entityType === 'technology' && <Layers size={16} />}
                  {item.entityType === 'blog' && <BookOpen size={16} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                      {item.title}
                    </span>
                    {item.difficulty && (
                      <Badge variant={item.difficulty.toLowerCase() as any}>
                        {item.difficulty}
                      </Badge>
                    )}
                  </div>
                  <p style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '440px',
                    marginTop: '0.2rem',
                  }}>
                    {item.snippet}
                  </p>
                </div>
              </div>
              <ArrowRight size={14} color="var(--text-muted)" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
