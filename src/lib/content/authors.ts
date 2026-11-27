import fs from 'node:fs/promises';
import path from 'node:path';
import { Author, AuthorSchema } from './schemas/common';

const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const files = await fs.readdir(AUTHORS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const authors = await Promise.all(
      jsonFiles.map(async (filename) => {
        const filePath = path.join(AUTHORS_DIR, filename);
        const raw = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(raw);
        return AuthorSchema.parse(data);
      })
    );

    return authors.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.error('Error loading authors:', err);
    return [];
  }
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const all = await getAllAuthors();
  return all.find(a => a.id === id) || null;
}

/**
 * Resolves whether an author's avatarUrl is usable (either an external URL or an existing file in public/).
 */
export async function resolveAvailableAvatarUrl(avatarUrl?: string): Promise<string | null> {
  if (!avatarUrl) return null;
  if (/^https?:\/\//i.test(avatarUrl)) {
    return avatarUrl;
  }
  const relativePath = avatarUrl.replace(/^\/+/, '');
  const fullPath = path.resolve(PUBLIC_DIR, relativePath);
  if (!fullPath.startsWith(PUBLIC_DIR + path.sep)) {
    return null;
  }
  try {
    await fs.access(fullPath);
    return avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
  } catch {
    return null;
  }
}
