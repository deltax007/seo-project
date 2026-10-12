'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  categoryBadge?: string;
  content: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [items[0]?.id || '']: true, // First item open by default
  });

  const toggle = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((item) => {
        const isOpen = !!openIds[item.id];
        return (
          <div
            key={item.id}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: `1px solid ${isOpen ? 'var(--border-medium)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                textAlign: 'left',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {item.categoryBadge && (
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: 'var(--badge-tech-text)',
                    border: '1px solid var(--badge-tech-border)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    {item.categoryBadge}
                  </span>
                )}
                <span>{item.title}</span>
              </div>
              <ChevronDown
                size={18}
                style={{
                  color: 'var(--text-muted)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0,
                }}
              />
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
                style={{
                  padding: '0 1.25rem 1.25rem 1.25rem',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.7,
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  marginTop: '0.25rem',
                  paddingTop: '0.75rem',
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
