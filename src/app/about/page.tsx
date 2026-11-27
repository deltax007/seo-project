import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  Layers,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { getAllBlogArticles } from '@/lib/content/blogs';
import { getAllProjects } from '@/lib/content/projects';
import { getAllTechnologies } from '@/lib/content/technologies';
import { Accordion, AccordionItem } from '@/components/common/Accordion';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  generateAboutPageJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from '@/lib/seo/jsonld';

const SITE_URL = 'https://www.cse-placement-project-guide.me';

export const metadata: Metadata = {
  title: 'About DevProjects | Engineering Project Platform for CS Students',
  description:
    'Learn how DevProjects helps B.Tech, B.E., BCA, and MCA students build architecture-first final-year and placement projects with real schemas, APIs, and viva Q&A.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About DevProjects | Engineering Project Platform for CS Students',
    description:
      'Architecture-first final-year, major, minor, and placement project guides for Computer Science and IT students.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

const aboutFaqs = [
  {
    question: 'How is DevProjects different from typical college project idea lists?',
    answer:
      'Generic listicles only give you a title and a short paragraph. Every DevProjects guide is structured as an engineering blueprint covering problem framing, system architecture diagrams, normalized database schemas, REST API specifications, step-by-step implementation snippets, and grouped placement interview questions.',
  },
  {
    question: 'Who are these engineering project guides designed for?',
    answer:
      'Our content is built primarily for B.Tech CSE, B.E. CSE/IT, BCA, and MCA students across India and globally—whether you are preparing a final-year degree capstone, building a backend or AI/ML centerpiece for campus placements, or completing a semester minor project.',
  },
  {
    question: 'How do you review technical accuracy and prevent outdated code?',
    answer:
      'Every project guide and editorial article follows an explicit authoring and peer-review lifecycle tracked with published, updated, and last-reviewed dates. Experienced systems architects and AI/ML practitioners verify schema constraints, concurrency patterns, and interview tradeoffs before publication.',
  },
  {
    question: 'Can I extend these architectures for my own university submission or resume?',
    answer:
      'Yes. Each guide intentionally explains architectural tradeoffs, extension ideas, and viva defense points so you can implement the core system cleanly, customize features for your evaluation rubric, and explain every design decision confidently in technical interviews.',
  },
];

const editorialPillars = [
  {
    icon: Layers,
    title: 'Architecture-First Blueprints',
    description:
      'Every project begins with component boundaries, data flow diagrams, and failure-mode considerations instead of disconnected code snippets.',
  },
  {
    icon: Database,
    title: 'Real Data Modeling & APIs',
    description:
      'Guides include relational/NoSQL table designs, primary and foreign keys, indexing considerations, and concrete REST endpoint contracts.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Toy CRUD & Zero Fake Metrics',
    description:
      'We do not publish trivial Student/Library CRUD templates, fabricated accuracy numbers, or unverified claims—only defensible engineering depth.',
  },
  {
    icon: GraduationCap,
    title: 'Viva & Placement Readiness',
    description:
      'Each guide pairs implementation steps with tiered interview questions (Basic, Technical, and Architecture) that examiners and recruiters actually ask.',
  },
];

const audienceTracks = [
  {
    badge: 'Final Year Capstone',
    badgeClass: 'badge badge-type',
    title: 'B.Tech, B.E., BCA & MCA Candidates',
    description:
      'Multi-module major projects with clear problem statements, ER models, and defensible system designs built for external university evaluations.',
    href: '/projects?type=Final+Year',
    cta: 'Browse Final-Year Guides',
  },
  {
    badge: 'Campus Placements',
    badgeClass: 'badge badge-intermediate',
    title: 'Backend, Full-Stack & AI/ML Applicants',
    description:
      'Resume centerpieces demonstrating concurrency control, vector similarity, real-time synchronization, and clean modular service boundaries.',
    href: '/projects?type=Placement',
    cta: 'Browse Placement Projects',
  },
  {
    badge: 'Skill Mastery',
    badgeClass: 'badge badge-beginner',
    title: '2nd & 3rd Year Builders',
    description:
      'Focused minor projects and technology pathways that bridge classroom theory with practical software engineering workflows.',
    href: '/technologies',
    cta: 'Explore Tech Pathways',
  },
];

const architectureChain = [
  {
    step: '01',
    label: 'Technology Ecosystems',
    detail: 'Start with a stack like Spring Boot, Machine Learning, Python, or React to understand core industry patterns.',
    href: '/technologies',
  },
  {
    step: '02',
    label: 'Project Specifications',
    detail: 'Inspect filtered project blueprints matched to your difficulty level, academic timeline, and career target.',
    href: '/projects',
  },
  {
    step: '03',
    label: 'Supporting Articles',
    detail: 'Deepen your judgment with topic clusters on choosing projects, system tradeoffs, and placement strategy.',
    href: '/blog',
  },
  {
    step: '04',
    label: 'Related Cross-Paths',
    detail: 'Branch into adjacent architectures sharing domains or technologies to broaden your portfolio.',
    href: '/projects',
  },
];

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

/**
 * Edit the 5 team member boxes below with your custom names, roles, and info.
 */
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Archit Goswami',
    role: 'Product Strategy & Site Architect',
    bio: 'Defines audience focus, content strategy, and site architecture so every project guide solves real student challenges.',
  },
  {
    id: 'member-2',
    name: 'Anshu Chauhan',
    role: 'Content Structure & Quality Lead',
    bio: 'Maps curriculum topics to structured guides and reviews deployment documentation for accuracy and academic alignment.',
  },
  {
    id: 'member-3',
    name: 'Saatvik Goel',
    role: 'Curriculum & Search Intent Lead',
    bio: 'Researches student search trends and structures technical roadmaps to match B.Tech, BCA, and MCA project requirements.',
  },
  {
    id: 'member-4',
    name: 'Siddhant Shahi',
    role: 'Technical Benchmark & DNS Lead',
    bio: 'Evaluates top industry benchmarks, manages domain and Cloudflare configurations, and compiles technical documentation.',
  },
  {
    id: 'member-5',
    name: 'Shakti Chaudhary',
    role: 'Cloud Infrastructure & Gap Analyst',
    bio: 'Identifies missing industry topics in student resources and oversees VPS provisioning, hosting, and server workflows.',
  },
];


function getInitials(name: string, index: number): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return String(index + 1).padStart(2, '0');
  }
  return trimmed
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default async function AboutPage() {
  const [projects, technologies, articles] = await Promise.all([
    getAllProjects(),
    getAllTechnologies(),
    getAllBlogArticles(),
  ]);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ]);
  const aboutPageJsonLd = generateAboutPageJsonLd(SITE_URL);
  const faqJsonLd = generateFaqJsonLd(aboutFaqs);

  const faqAccordionItems: AccordionItem[] = aboutFaqs.map((faq, idx) => ({
    id: `about-faq-${idx}`,
    title: faq.question,
    content: faq.answer,
  }));

  const platformMetrics = [
    { label: 'Verified Project Guides', value: String(projects.length) },
    { label: 'Technology Ecosystems', value: String(technologies.length) },
    { label: 'Editorial Articles', value: String(articles.length) },
    { label: 'Team Members', value: String(TEAM_MEMBERS.length) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div>
        {/* 1. Hero & Platform Mission */}
        <section
          style={{
            paddingTop: 'var(--space-8)',
            paddingBottom: 'var(--space-16)',
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.14), transparent 70%)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="container">
            <Breadcrumbs items={[{ label: 'About' }]} />

            <div style={{ maxWidth: '820px', marginTop: 'var(--space-4)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  color: 'var(--brand-primary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                }}
              >
                <Terminal size={14} aria-hidden="true" />
                <span>About DevProjects</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                }}
              >
                Built to Turn Student Projects Into{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Real Engineering Depth
                </span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                DevProjects is a technical project library and educational publication for Computer
                Science and IT students. We bridge the gap between university project
                requirements—such as those outlined in the{' '}
                <a
                  href="https://csed.acm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  ACM/IEEE Computer Science Curricula
                </a>
                —and real software engineering standards, providing structured architectures,
                database designs, API contracts, and interview preparation instead of shallow
                project lists.
              </p>

              {/* Live Platform Inventory Strip */}
              <ul
                className="grid-4"
                style={{
                  listStyle: 'none',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {platformMetrics.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem',
                      }}
                    >
                      {item.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Engineering & Editorial Standards */}
        <section style={{ padding: 'var(--space-16) 0' }}>
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--brand-primary)',
                  fontWeight: 700,
                }}
              >
                Our Standards
              </span>
              <h2 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>
                Why We Built a Different Kind of Project Platform
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Students preparing for final-year evaluations and campus placements deserve guides
                that teach how production systems are actually designed, queried, and defended.
              </p>
            </div>

            <div className="grid-2">
              {editorialPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article key={pillar.title} className="card-base">
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(99, 102, 241, 0.12)',
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--brand-primary)',
                        marginBottom: '1rem',
                      }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.6rem' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      {pillar.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. How Knowledge Is Connected */}
        <section
          style={{
            padding: 'var(--space-16) 0',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--brand-secondary)',
                  fontWeight: 700,
                }}
              >
                Information Architecture
              </span>
              <h2 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>
                How Every Guide Connects Together
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Rather than isolated articles, DevProjects organizes technical learning as a
                connected graph from core technology ecosystems down to implementation details.
              </p>
            </div>

            <ol className="grid-4" style={{ listStyle: 'none' }}>
              {architectureChain.map((item) => (
                <li
                  key={item.step}
                  className="card-base"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minWidth: 0,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.85rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          color: 'var(--brand-secondary)',
                        }}
                      >
                        STEP {item.step}
                      </span>
                      <GitBranch size={16} color="var(--text-muted)" aria-hidden="true" />
                    </div>
                    <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.5rem' }}>
                      {item.label}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      paddingBlock: '0.25rem',
                    }}
                  >
                    <span>Explore section</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Who DevProjects Serves */}
        <section style={{ padding: 'var(--space-16) 0' }}>
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--brand-primary)',
                  fontWeight: 700,
                }}
              >
                Who We Serve
              </span>
              <h2 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>
                Designed for Every Stage of a CS Degree
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Tailored pathways whether you need a practical semester submission or a high-signal
                architecture to discuss with hiring managers.
              </p>
            </div>

            <div className="grid-3">
              {audienceTracks.map((track) => (
                <article
                  key={track.title}
                  className="card-base"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <span className={track.badgeClass}>{track.badge}</span>
                    </div>
                    <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.65rem' }}>
                      {track.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {track.description}
                    </p>
                  </div>
                  <Link
                    href={track.href}
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      paddingBlock: '0.25rem',
                    }}
                  >
                    <span>{track.cta}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Editorial & Technical Review Team */}
        <section
          style={{
            padding: 'var(--space-16) 0',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--brand-secondary)',
                  fontWeight: 700,
                }}
              >
                Editorial & Technical Review
              </span>
              <h2 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>
                Practitioners Behind the Guides
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Every project blueprint and editorial deep-dive is authored and peer-reviewed for
                architectural soundness, realistic scope, and interview relevance.
              </p>
            </div>

            <div className="grid-3">
              {TEAM_MEMBERS.map((member, index) => {
                const displayName = member.name.trim() || `Team Member ${index + 1}`;
                const displayRole = member.role.trim() || 'Role / Specialization';
                const displayBio = member.bio.trim();

                return (
                  <article
                    key={member.id}
                    className="card-base"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      minWidth: 0,
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div
                        aria-hidden="true"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-full)',
                          background:
                            'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: 'var(--text-sm)',
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(member.name, index)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.15rem' }}>
                          {displayName}
                        </h3>
                        <p
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--brand-primary)',
                            fontWeight: 600,
                          }}
                        >
                          {displayRole}
                        </p>
                      </div>
                    </div>

                    {displayBio ? (
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                        {displayBio}
                      </p>
                    ) : (
                      <div
                        style={{
                          minHeight: '4.5rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px dashed var(--border-medium)',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          padding: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                          Add team member bio &amp; details in TEAM_MEMBERS
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 'var(--space-8)',
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="var(--badge-beginner-text)" aria-hidden="true" />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Schema-validated content with explicit <code style={{ color: 'var(--text-primary)' }}>lastReviewedAt</code> tracking across all guides.
                </span>
              </div>
              <Link
                href="/blog"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <BookOpen size={15} aria-hidden="true" />
                <span>Read Editorial Articles</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FAQs */}
        <section style={{ padding: 'var(--space-16) 0' }}>
          <div className="container">
            <div className="reading-container">
              <div style={{ marginBottom: '2rem' }}>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--brand-primary)',
                    fontWeight: 700,
                  }}
                >
                  Common Questions
                </span>
                <h2 style={{ marginTop: '0.4rem' }}>About the Platform</h2>
              </div>
              <Accordion items={faqAccordionItems} />
            </div>
          </div>
        </section>

        {/* 7. Bottom CTA */}
        <section
          style={{
            padding: 'var(--space-16) 0',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
          }}
        >
          <div className="container" style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--brand-secondary)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem',
              }}
            >
              <Code2 size={15} aria-hidden="true" />
              <span>Start Building</span>
            </div>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: '1rem' }}>
              Ready to Explore Verified Project Guides?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Pick a technology ecosystem or filter the project catalog by difficulty, domain, and
              degree requirement.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 'var(--text-base)',
                  padding: '0.85rem 1.75rem',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <span>Explore Projects</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/technologies"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: 'var(--text-base)',
                  padding: '0.85rem 1.75rem',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                }}
              >
                <span>Browse Technologies</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
