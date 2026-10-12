import fs from 'node:fs/promises';
import path from 'node:path';
import { Project, ProjectSchema } from './schemas/project';

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

export async function getAllProjects(): Promise<Project[]> {
  try {
    const files = await fs.readdir(PROJECTS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const projects = await Promise.all(
      jsonFiles.map(async (filename) => {
        const filePath = path.join(PROJECTS_DIR, filename);
        const raw = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(raw);
        return ProjectSchema.parse(data);
      })
    );

    return projects.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (err) {
    console.error('Error loading projects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getAllProjects();
  return all.find(p => p.slug === slug) || null;
}

export async function getProjectsByTechnology(techSlug: string): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter(p => p.technologySlugs.includes(techSlug) || p.primaryTechnologySlug === techSlug);
}

export async function getRelatedProjects(current: Project, limit: number = 2): Promise<Project[]> {
  const all = await getAllProjects();
  const others = all.filter(p => p.id !== current.id);

  // Score relationships: matching tech (+3), matching domain (+2), matching difficulty (+1)
  const scored = others.map(project => {
    let score = 0;
    if (project.primaryTechnologySlug === current.primaryTechnologySlug) score += 3;
    const commonTech = project.technologySlugs.filter(t => current.technologySlugs.includes(t));
    score += commonTech.length * 2;
    const commonDomains = project.domains.filter(d => current.domains.includes(d));
    score += commonDomains.length * 2;
    if (project.difficulty === current.difficulty) score += 1;
    return { project, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.project);
}
