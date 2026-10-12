import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllTechnologies } from '@/lib/content/technologies';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProjectFilterCatalog } from '@/components/project/ProjectFilterCatalog';

export const metadata: Metadata = {
  title: 'Engineering Projects Catalog | Computer Science & Placement Guides',
  description: 'Explore verified, implementation-ready Computer Science projects. Filter by technology, difficulty, and project type (final year, placement, major, minor).',
  alternates: {
    canonical: 'https://devprojects.io/projects',
  },
};

export default async function ProjectsPage() {
  const [projects, technologies] = await Promise.all([
    getAllProjects(),
    getAllTechnologies(),
  ]);

  return (
    <div style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Projects' }]} />

        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
            Curated Technical Library
          </span>
          <h1 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>Engineering Project Guides</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Comprehensive, step-by-step guides with system architecture diagrams, database schemas, and viva interview questions.
          </p>
        </div>

        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading projects catalog...</div>}>
          <ProjectFilterCatalog initialProjects={projects} technologies={technologies} />
        </Suspense>
      </div>
    </div>
  );
}
