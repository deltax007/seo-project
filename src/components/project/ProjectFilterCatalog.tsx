'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Project } from '@/lib/content/schemas/project';
import { Technology } from '@/lib/content/schemas/technology';
import { ProjectCard } from './ProjectCard';

export function ProjectFilterCatalog({
  initialProjects,
  technologies,
}: {
  initialProjects: Project[];
  technologies: Technology[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedTech, setSelectedTech] = useState(searchParams.get('tech') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');

  const updateFilters = (tech: string, diff: string, type: string, q: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tech !== 'all') params.set('tech', tech);
    if (diff !== 'all') params.set('difficulty', diff);
    if (type !== 'all') params.set('type', type);

    const queryString = params.toString();
    router.replace(`/projects${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        const matchesSkills = p.skillsLearned.some(s => s.toLowerCase().includes(query));
        const matchesTech = p.technologySlugs.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesSkills && !matchesTech) return false;
      }

      // Technology filter
      if (selectedTech !== 'all') {
        const matchesTech = p.technologySlugs.includes(selectedTech) || p.primaryTechnologySlug === selectedTech;
        if (!matchesTech) return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all') {
        if (p.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
      }

      // Project type filter
      if (selectedType !== 'all') {
        const matchesType = (p.projectTypes as string[]).some(
          t => t.toLowerCase() === selectedType.toLowerCase()
        );
        if (!matchesType) return false;
      }

      return true;
    });
  }, [initialProjects, searchTerm, selectedTech, selectedDifficulty, selectedType]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTech('all');
    setSelectedDifficulty('all');
    setSelectedType('all');
    router.replace('/projects', { scroll: false });
  };

  return (
    <div>
      {/* Filter Control Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '2rem',
      }}>
        {/* Top Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1rem',
          marginBottom: '1.25rem',
        }}>
          <Search size={18} color="var(--brand-primary)" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              updateFilters(selectedTech, selectedDifficulty, selectedType, val);
            }}
            placeholder="Search by keywords, technologies, skills (e.g. 'FastAPI', 'Microservices', 'NLP')..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Filter Dropdowns & Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            {/* Technology Select */}
            <select
              value={selectedTech}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedTech(val);
                updateFilters(val, selectedDifficulty, selectedType, searchTerm);
              }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.75rem',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Technologies</option>
              {technologies.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Difficulty Select */}
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedDifficulty(val);
                updateFilters(selectedTech, val, selectedType, searchTerm);
              }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.75rem',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Project Purpose Select */}
            <select
              value={selectedType}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedType(val);
                updateFilters(selectedTech, selectedDifficulty, val, searchTerm);
              }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.75rem',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Project Types</option>
              <option value="final year">Final Year Projects</option>
              <option value="placement">Placement Oriented</option>
              <option value="major">Major Projects</option>
              <option value="portfolio">Portfolio Projects</option>
              <option value="resume">Resume Projects</option>
            </select>
          </div>

          {(selectedTech !== 'all' || selectedDifficulty !== 'all' || selectedType !== 'all' || searchTerm) && (
            <button
              onClick={resetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--brand-primary)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Catalog Counter Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProjects.length}</strong> verified project guide{filteredProjects.length === 1 ? '' : 's'}
        </p>
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div style={{
          padding: '4rem 1rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-surface)',
          border: '1px dashed var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.5rem' }}>No projects match your current filters</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Try broadening your search term or resetting the technology and difficulty filters.
          </p>
          <button
            onClick={resetFilters}
            style={{
              padding: '0.55rem 1.25rem',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
