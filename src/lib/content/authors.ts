import fs from 'node:fs/promises';
import path from 'node:path';
import { Author, AuthorSchema } from './schemas/common';

const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors');

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
