import fs from 'node:fs/promises';
import path from 'node:path';
import { Technology, TechnologySchema } from './schemas/technology';

const TECHNOLOGIES_DIR = path.join(process.cwd(), 'content', 'technologies');

export async function getAllTechnologies(): Promise<Technology[]> {
  try {
    const files = await fs.readdir(TECHNOLOGIES_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const technologies = await Promise.all(
      jsonFiles.map(async (filename) => {
        const filePath = path.join(TECHNOLOGIES_DIR, filename);
        const raw = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(raw);
        return TechnologySchema.parse(data);
      })
    );

    return technologies.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } catch (err) {
    console.error('Error loading technologies:', err);
    return [];
  }
}

export async function getTechnologyBySlug(slug: string): Promise<Technology | null> {
  const all = await getAllTechnologies();
  return all.find(t => t.slug === slug) || null;
}
