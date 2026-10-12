import React from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 'var(--space-16)',
      paddingBottom: 'var(--space-12)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
        }}>
          {/* Brand Column */}
          <div style={{ maxWidth: '320px' }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: 'var(--text-lg)',
              textDecoration: 'none',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}>
                <Terminal size={16} strokeWidth={2.5} />
              </div>
              <span>Dev<span style={{ color: 'var(--brand-primary)' }}>Projects</span></span>
            </Link>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              A serious engineering project platform for Computer Science students. Rigorous architectures, real database designs, and placement-oriented project guides.
            </p>
          </div>

          {/* Technologies Column */}
          <div>
            <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Technologies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-sm)' }}>
              <li><Link href="/technologies/machine-learning" style={{ color: 'var(--text-secondary)' }}>AI & Machine Learning</Link></li>
              <li><Link href="/technologies/spring-boot" style={{ color: 'var(--text-secondary)' }}>Spring Boot & Java</Link></li>
              <li><Link href="/technologies/python" style={{ color: 'var(--text-secondary)' }}>Python & FastAPI</Link></li>
              <li><Link href="/technologies/react" style={{ color: 'var(--text-secondary)' }}>React & Full-Stack</Link></li>
              <li><Link href="/technologies" style={{ color: 'var(--brand-primary)' }}>Browse All Technologies →</Link></li>
            </ul>
          </div>

          {/* Project Types Column */}
          <div>
            <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Project Types
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-sm)' }}>
              <li><Link href="/projects?type=Final+Year" style={{ color: 'var(--text-secondary)' }}>Final Year Projects</Link></li>
              <li><Link href="/projects?type=Placement" style={{ color: 'var(--text-secondary)' }}>Placement-Oriented Projects</Link></li>
              <li><Link href="/projects?type=Major" style={{ color: 'var(--text-secondary)' }}>Major & Minor Projects</Link></li>
              <li><Link href="/projects?type=Resume" style={{ color: 'var(--text-secondary)' }}>Resume Centric Projects</Link></li>
              <li><Link href="/projects?difficulty=Intermediate" style={{ color: 'var(--text-secondary)' }}>Intermediate Guides</Link></li>
            </ul>
          </div>

          {/* Educational Resources Column */}
          <div>
            <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Editorial Guides
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-sm)' }}>
              <li><Link href="/blog/best-spring-boot-projects-for-placements" style={{ color: 'var(--text-secondary)' }}>Spring Boot Placement Prep</Link></li>
              <li><Link href="/blog/how-to-choose-machine-learning-final-year-project" style={{ color: 'var(--text-secondary)' }}>How to Choose an ML Project</Link></li>
              <li><Link href="/blog" style={{ color: 'var(--brand-primary)' }}>All Topic Clusters →</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
        }}>
          <div>
            © {new Date().getFullYear()} DevProjects Engineering Platform. Built for Computer Science & IT Students.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Verified Technical Schemas</span>
            <span>Zero Fake Code</span>
            <span>E-E-A-T Editorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
