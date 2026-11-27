import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ExternalLink, Layers, ShieldCheck } from 'lucide-react';
import { getAllAuthors, getAuthorById, resolveAvailableAvatarUrl } from '@/lib/content/authors';
import { getAllBlogArticles } from '@/lib/content/blogs';
import { getAllProjects } from '@/lib/content/projects';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { BlogCard } from '@/components/blog/BlogCard';
import { ProjectCard } from '@/components/project/ProjectCard';
import {
  SITE_URL,
  generateBreadcrumbJsonLd,
  generateProfilePageJsonLd,
  toAbsoluteSiteUrl,
} from '@/lib/seo/jsonld';

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ id: author.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthorById(id);
  if (!author) return {};

  const canonicalUrl = `${SITE_URL}/authors/${author.id}`;
  const availableAvatarUrl = await resolveAvailableAvatarUrl(author.avatarUrl);
  const title = `${author.name} — ${author.role}`;

  return {
    title,
    description: author.bio,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: author.bio,
      type: 'profile',
      url: canonicalUrl,
      ...(availableAvatarUrl
        ? {
            images: [{ url: toAbsoluteSiteUrl(availableAvatarUrl) }],
          }
        : {}),
    },
  };
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = await getAuthorById(id);
  if (!author) notFound();

  const [availableAvatarUrl, allArticles, allProjects] = await Promise.all([
    resolveAvailableAvatarUrl(author.avatarUrl),
    getAllBlogArticles(),
    getAllProjects(),
  ]);

  const authoredArticles = allArticles.filter((article) => article.author.id === author.id);
  const authoredProjects = allProjects.filter((project) => project.author.id === author.id);
  const reviewedArticles = allArticles.filter(
    (article) => article.reviewer?.id === author.id && article.author.id !== author.id
  );
  const reviewedProjects = allProjects.filter(
    (project) => project.reviewer?.id === author.id && project.author.id !== author.id
  );

  const authorProfileUrl = `${SITE_URL}/authors/${author.id}`;
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: author.name, url: authorProfileUrl },
  ]);
  const profilePageJsonLd = generateProfilePageJsonLd(author, availableAvatarUrl);

  const socialEntries: { label: string; href: string }[] = [];
  if (author.socialLinks?.github) {
    socialEntries.push({ label: 'GitHub', href: author.socialLinks.github });
  }
  if (author.socialLinks?.linkedin) {
    socialEntries.push({ label: 'LinkedIn', href: author.socialLinks.linkedin });
  }
  if (author.socialLinks?.twitter) {
    socialEntries.push({ label: 'Twitter', href: author.socialLinks.twitter });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: author.name }]} />

          {/* Author Profile Header */}
          <header
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                gap: '1.5rem',
              }}
            >
              {availableAvatarUrl ? (
                <img
                  src={availableAvatarUrl}
                  alt={author.name}
                  width={80}
                  height={80}
                  fetchPriority="high"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-full)',
                    objectFit: 'cover',
                    border: '2px solid var(--border-medium)',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-full)',
                    background:
                      'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'var(--text-2xl)',
                    flexShrink: 0,
                  }}
                >
                  {getInitials(author.name)}
                </div>
              )}

              <div style={{ flex: 1, minWidth: '240px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--brand-primary)',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                  }}
                >
                  Author Profile
                </span>
                <h1
                  style={{
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    lineHeight: 1.2,
                    marginBottom: '0.4rem',
                  }}
                >
                  {author.name}
                </h1>
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--brand-secondary)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {author.role}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    maxWidth: '720px',
                    marginBottom: socialEntries.length > 0 ? '1.25rem' : '0',
                  }}
                >
                  {author.bio}
                </p>

                {socialEntries.length > 0 && (
                  <ul
                    aria-label={`${author.name} social profiles`}
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    {socialEntries.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          <span>{social.label}</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </header>

          {/* Authored Blog Articles */}
          {authoredArticles.length > 0 && (
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <BookOpen size={20} color="var(--brand-primary)" aria-hidden="true" />
                <h2>Articles by {author.name}</h2>
              </div>
              <div className="grid-2">
                {authoredArticles.map((article) => (
                  <BlogCard key={article.id} article={article} headingLevel="h3" />
                ))}
              </div>
            </section>
          )}

          {/* Authored Project Guides */}
          {authoredProjects.length > 0 && (
            <section style={{ marginBottom: 'var(--space-12)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <Layers size={20} color="var(--brand-primary)" aria-hidden="true" />
                <h2>Project Guides by {author.name}</h2>
              </div>
              <div className="grid-2">
                {authoredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} headingLevel="h3" />
                ))}
              </div>
            </section>
          )}

          {/* Peer-Reviewed Content */}
          {(reviewedArticles.length > 0 || reviewedProjects.length > 0) && (
            <section
              style={{
                paddingTop: 'var(--space-10)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <ShieldCheck size={20} color="var(--brand-secondary)" aria-hidden="true" />
                <h2>Technical Reviews by {author.name}</h2>
              </div>

              <div className="grid-2">
                {reviewedArticles.map((article) => (
                  <BlogCard key={article.id} article={article} headingLevel="h3" />
                ))}
                {reviewedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} headingLevel="h3" />
                ))}
              </div>
            </section>
          )}

          <div
            style={{
              marginTop: 'var(--space-12)',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
            }}
          >
            <Link href="/blog">Browse All Articles →</Link>
            <Link href="/projects">Browse All Projects →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
