import fs from 'node:fs/promises';
import path from 'node:path';
import { BlogArticle, BlogArticleSchema } from './schemas/blog';

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  try {
    const files = await fs.readdir(BLOGS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const articles = await Promise.all(
      jsonFiles.map(async (filename) => {
        const filePath = path.join(BLOGS_DIR, filename);
        const raw = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(raw);
        return BlogArticleSchema.parse(data);
      })
    );

    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (err) {
    console.error('Error loading blog articles:', err);
    return [];
  }
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const all = await getAllBlogArticles();
  return all.find(a => a.slug === slug) || null;
}

export async function getArticlesForTechnology(techSlug: string): Promise<BlogArticle[]> {
  const all = await getAllBlogArticles();
  return all.filter(a => a.targetTechnologySlugs.includes(techSlug));
}

export async function getArticlesForProject(projectSlug: string): Promise<BlogArticle[]> {
  const all = await getAllBlogArticles();
  return all.filter(a => a.featuredProjectSlugs.includes(projectSlug));
}
