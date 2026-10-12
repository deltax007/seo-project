import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle,
  Database,
  Server,
  Layers,
  Code2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { getAllProjects, getProjectBySlug, getRelatedProjects } from '@/lib/content/projects';
import { getTechnologyBySlug } from '@/lib/content/technologies';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Badge } from '@/components/common/Badge';
import { Accordion } from '@/components/common/Accordion';
import { ProjectCard } from '@/components/project/ProjectCard';
import { generateBreadcrumbJsonLd, generateTechArticleJsonLd, generateFaqJsonLd } from '@/lib/seo/jsonld';

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    alternates: {
      canonical: `https://devprojects.io/projects/${project.slug}`,
    },
    openGraph: {
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      type: 'article',
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      authors: [project.author.name],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const [primaryTech, relatedProjects] = await Promise.all([
    getTechnologyBySlug(project.primaryTechnologySlug),
    getRelatedProjects(project, 2),
  ]);

  const breadcrumbItems = [
    { label: 'Projects', href: '/projects' },
    { label: primaryTech?.name || 'Technology', href: `/technologies/${project.primaryTechnologySlug}` },
    { label: project.title },
  ];

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd(breadcrumbItems.map(b => ({
    name: b.label,
    url: b.href ? `https://devprojects.io${b.href}` : `https://devprojects.io/projects/${project.slug}`,
  })));
  const techArticleJsonLd = generateTechArticleJsonLd(project);
  const faqJsonLd = generateFaqJsonLd(project.faqs);

  const difficultyVariant = project.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';

  const interviewAccordionItems = project.interviewQuestions.map((q, idx) => ({
    id: `iq-${idx}`,
    title: q.question,
    categoryBadge: q.category,
    content: q.answer,
  }));

  const faqAccordionItems = project.faqs.map((f, idx) => ({
    id: `faq-${idx}`,
    title: f.question,
    content: f.answer,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Project Header Card */}
          <header style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
            position: 'relative',
          }}>
            {/* Badges Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Badge variant={difficultyVariant}>
                {project.difficulty}
              </Badge>
              {project.projectTypes.map(t => (
                <Badge key={t} variant="type">
                  {t}
                </Badge>
              ))}
              <Badge variant="tech">
                {primaryTech?.name || project.primaryTechnologySlug}
              </Badge>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', marginBottom: '1rem', lineHeight: 1.25 }}>
              {project.title}
            </h1>

            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '820px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {project.shortDescription}
            </p>

            {/* Author, Reviewer & Lifecycle Metadata Strip (E-E-A-T) */}
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
                <span style={{ color: 'var(--text-muted)' }}>Author: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{project.author.name}</strong> ({project.author.role})
              </div>
              {project.reviewer && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} color="var(--brand-secondary)" />
                  <span>Reviewed by </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{project.reviewer.name}</strong>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={13} />
                <span>Updated: {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </header>

          {/* Main Grid: Content + Sidebar Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }} className="project-layout-grid">
            {/* Main Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

              {/* Problem Statement & Real-World Use Case */}
              <section className="card-base">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <CheckCircle size={20} color="var(--brand-primary)" />
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>Problem Statement & Objectives</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
                  {project.problemStatement}
                </p>
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', borderLeft: '3px solid var(--brand-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem', fontSize: 'var(--text-sm)' }}>
                    Real-World Context:
                  </strong>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    {project.realWorldUseCase}
                  </span>
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Key Project Objectives:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {project.objectives.map((obj, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* System Architecture Section */}
              <section className="card-base">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Server size={20} color="var(--brand-primary)" />
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>System Architecture</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  {project.architecture.overview}
                </p>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  overflowX: 'auto',
                }}>
                  <pre style={{ color: '#a5b4fc', fontSize: '13px', lineHeight: 1.45 }}>
                    {project.architecture.diagramContent}
                  </pre>
                </div>
              </section>

              {/* Database Schema Section */}
              {project.databaseDesign && (
                <section className="card-base">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Database size={20} color="var(--brand-primary)" />
                    <h2 style={{ fontSize: 'var(--text-2xl)' }}>Database Design ({project.databaseDesign.databaseType})</h2>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                    {project.databaseDesign.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {project.databaseDesign.tables.map((table) => (
                      <div key={table.name} style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem 1.25rem',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-secondary)', fontSize: 'var(--text-sm)' }}>
                            Table: {table.name}
                          </span>
                          {table.primaryKey && (
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>PK: {table.primaryKey}</span>
                          )}
                        </div>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                          {table.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {table.fields.map(f => (
                            <span key={f} style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--text-secondary)',
                            }}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* REST API Endpoints Specification */}
              {project.apis && project.apis.length > 0 && (
                <section className="card-base">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Code2 size={20} color="var(--brand-primary)" />
                    <h2 style={{ fontSize: 'var(--text-2xl)' }}>REST API Specifications</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {project.apis.map((api, idx) => (
                      <div key={idx} style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                          <span style={{
                            padding: '0.15rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            backgroundColor: api.method === 'POST' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            color: api.method === 'POST' ? 'var(--brand-primary)' : 'var(--badge-beginner-text)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {api.method}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {api.endpoint}
                          </span>
                        </div>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                          {api.description}
                        </p>
                        {api.responseSample && (
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                              Response Payload:
                            </span>
                            <pre style={{
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--border-subtle)',
                              padding: '0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              color: '#93c5fd',
                              fontSize: '12px',
                              overflowX: 'auto',
                            }}>
                              {api.responseSample}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Step-by-Step Implementation Guide */}
              <section className="card-base">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Layers size={20} color="var(--brand-primary)" />
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>Step-by-Step Implementation Guide</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {project.implementationGuide.map((step) => (
                    <div key={step.stepNumber} style={{ borderLeft: '2px solid var(--border-medium)', paddingLeft: '1.25rem', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-9px',
                        top: '0',
                        width: '16px',
                        height: '16px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--brand-primary)',
                      }} />
                      <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.4rem' }}>
                        Step {step.stepNumber}: {step.title}
                      </h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                        {step.instructions}
                      </p>
                      {step.codeSnippet && (
                        <div style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                        }}>
                          {step.codeSnippet.fileName && (
                            <div style={{
                              padding: '0.4rem 0.75rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                              borderBottom: '1px solid var(--border-subtle)',
                              fontSize: '12px',
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--text-muted)',
                            }}>
                              {step.codeSnippet.fileName}
                            </div>
                          )}
                          <pre style={{
                            padding: '1rem',
                            overflowX: 'auto',
                            color: '#e2e8f0',
                            fontSize: '13px',
                            lineHeight: 1.5,
                          }}>
                            <code>{step.codeSnippet.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Placement & Viva Interview Questions */}
              <section className="card-base">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <HelpCircle size={20} color="var(--brand-primary)" />
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>Placement Viva & Technical Questions</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
                  Questions commonly asked by college examiners and product company interviewers regarding this project architecture.
                </p>
                <Accordion items={interviewAccordionItems} />
              </section>

              {/* Frequently Asked Questions */}
              <section className="card-base">
                <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: '1.25rem' }}>Project FAQs</h2>
                <Accordion items={faqAccordionItems} />
              </section>

            </div>

            {/* Sticky Sidebar Specs */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div className="card-base" style={{ position: 'sticky', top: '5.5rem' }}>
                <h3 style={{ fontSize: 'var(--text-base)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Project Metadata
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: 'var(--text-sm)' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Difficulty</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{project.difficulty}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Primary Technology</span>
                    <Link href={`/technologies/${project.primaryTechnologySlug}`} style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
                      {primaryTech?.name || project.primaryTechnologySlug}
                    </Link>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Languages</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{project.programmingLanguages.join(', ')}</span>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Domains</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{project.domains.join(', ')}</span>
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Core Skills</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                      {project.skillsLearned.map((s, idx) => (
                        <span key={idx} style={{
                          fontSize: '11px',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-secondary)',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link
                    href="#step-1"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--brand-primary)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: 'var(--text-sm)',
                      textDecoration: 'none',
                    }}
                  >
                    Start Implementation Guide
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Projects Showcase */}
          {relatedProjects.length > 0 && (
            <section style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-12)', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
                    Cross-Disciplinary Paths
                  </span>
                  <h2 style={{ marginTop: '0.3rem' }}>Related Engineering Projects</h2>
                </div>
                <Link href="/projects" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  View All Projects →
                </Link>
              </div>

              <div className="grid-2">
                {relatedProjects.map((p) => (
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
