import React from 'react';
import { Metadata } from 'next';
import { getAllTechnologies } from '@/lib/content/technologies';
import { getAllProjects } from '@/lib/content/projects';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { TechCard } from '@/components/technology/TechCard';

export const metadata: Metadata = {
  title: 'Technology Categories & Ecosystems | DevProjects',
  description: 'Explore engineering project pathways categorized by technology: AI/ML, Spring Boot, Python, React, Cloud, Databases, and Cybersecurity.',
  alternates: {
    canonical: 'https://devprojects.io/technologies',
  },
};

export default async function TechnologiesPage() {
  const [technologies, projects] = await Promise.all([
    getAllTechnologies(),
    getAllProjects(),
  ]);

  return (
    <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Technologies' }]} />

        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
            Curated Ecosystems
          </span>
          <h1 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>Technology Categories</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Choose your specialization track. Each technology hub aggregates verified final-year projects, placement guides, and deep-dive architectural articles.
          </p>
        </div>

        <div className="grid-3">
          {technologies.map((tech) => {
            const count = projects.filter(p => p.technologySlugs.includes(tech.slug) || p.primaryTechnologySlug === tech.slug).length;
            return (
              <TechCard key={tech.id} technology={tech} projectCount={count} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
