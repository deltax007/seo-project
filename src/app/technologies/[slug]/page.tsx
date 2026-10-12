import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Layers, ArrowRight, ShieldCheck, ExternalLink, BookOpen } from 'lucide-react';
import { getAllTechnologies, getTechnologyBySlug } from '@/lib/content/technologies';
import { getProjectsByTechnology, getRelatedProjects } from '@/lib/content/projects';
import { getArticlesForTechnology } from '@/lib/content/blogs';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProjectCard } from '@/components/project/ProjectCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';

export async function generateStaticParams() {
  const techs = await getAllTechnologies();
  return techs.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tech = await getTechnologyBySlug(slug);
  if (!tech) return {};

  return {
    title: tech.seo.metaTitle,
    description: tech.seo.metaDescription,
    alternates: {
      canonical: `https://devprojects.io/technologies/${tech.slug}`,
    },
    openGraph: {
      title: tech.seo.metaTitle,
      description: tech.seo.metaDescription,
      type: 'website',
    },
  };
}

export default async function TechnologyHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = await getTechnologyBySlug(slug);
  if (!tech) notFound();

  const [projects, articles] = await Promise.all([
    getProjectsByTechnology(slug),
    getArticlesForTechnology(slug),
  ]);

  let relatedCrossProjects: any[] = [];
  if (projects.length > 0) {
    relatedCrossProjects = await getRelatedProjects(projects[0], 2);
  }

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Technologies', url: 'https://devprojects.io/technologies' },
    { name: tech.name, url: `https://devprojects.io/technologies/${tech.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <Breadcrumbs items={[
            { label: 'Technologies', href: '/technologies' },
            { label: tech.name },
          ]} />

          {/* Technology Hub Header Card */}
          <header style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span style={{
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--brand-primary)',
                fontWeight: 700,
              }}>
                {tech.categoryLabel}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
              {tech.name} Engineering Projects
            </h1>

            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {tech.description}
            </p>

            {/* Sub-technologies Tags */}
            {tech.subTechnologies.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Included Stacks:</span>
                {tech.subTechnologies.map(sub => (
                  <span
                    key={sub}
                    style={{
                      fontSize: 'var(--text-xs)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}

            {/* Author / Reviewer Credentials */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
            }}>
              <div>
                <span>Curated by </span>
                <strong style={{ color: 'var(--text-primary)' }}>{tech.author.name}</strong>
              </div>
              {tech.reviewer && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} color="var(--brand-secondary)" />
                  <span>Verified by </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{tech.reviewer.name}</strong>
                </div>
              )}
              {tech.officialDocsUrl && (
                <a
                  href={tech.officialDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--brand-primary)' }}
                >
                  Official Documentation
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </header>

          {/* Section 1: Technology Projects */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
                  Active Guides
                </span>
                <h2 style={{ marginTop: '0.3rem' }}>{tech.name} Project Implementations</h2>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                {projects.length} Guide{projects.length === 1 ? '' : 's'}
              </span>
            </div>

            {projects.length > 0 ? (
              <div className="grid-2">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                New project guides for {tech.name} are currently being peer-reviewed.
              </p>
            )}
          </section>

          {/* Section 2: Supporting Blog Articles */}
          {articles.length > 0 && (
            <section style={{
              marginBottom: 'var(--space-16)',
              padding: 'var(--space-8)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <BookOpen size={20} color="var(--brand-primary)" />
                <h2 style={{ fontSize: 'var(--text-2xl)' }}>Placement & Academic Articles for {tech.name}</h2>
              </div>
              <div className="grid-2">
                {articles.map(article => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Related Cross-Disciplinary Projects */}
          {relatedCrossProjects.length > 0 && (
            <section style={{ paddingTop: 'var(--space-12)', borderTop: '1px solid var(--border-subtle)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: '1.5rem' }}>
                Complementary Projects in Other Stacks
              </h2>
              <div className="grid-2">
                {relatedCrossProjects.map(p => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
