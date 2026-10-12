import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { Project } from '@/lib/content/schemas/project';
import { Badge } from '../common/Badge';

export function ProjectCard({ project }: { project: Project }) {
  const difficultyVariant = project.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';

  return (
    <article
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
      }}
    >
      <div>
        {/* Top Meta Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Badge variant={difficultyVariant}>
              {project.difficulty}
            </Badge>
            <Badge variant="type">
              {project.projectTypes[0]}
            </Badge>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            {project.programmingLanguages.join(', ')}
          </span>
        </div>

        {/* Project Title */}
        <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
          <Link
            href={`/projects/${project.slug}`}
            style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
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
          {project.shortDescription}
        </p>

        {/* Key Skills Tags */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Core Competencies
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {project.skillsLearned.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: 'var(--text-xs)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)',
                }}
              >
                {skill}
              </span>
            ))}
            {project.skillsLearned.length > 3 && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', alignSelf: 'center' }}>
                +{project.skillsLearned.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--brand-secondary)' }}>
          <CheckCircle2 size={13} />
          <span>Full Architecture & APIs</span>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--brand-primary)',
          }}
        >
          View Guide
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
