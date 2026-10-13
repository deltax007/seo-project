import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllTechnologies } from '@/lib/content/technologies';
import { getAllBlogArticles } from '@/lib/content/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://seo-project-alpha.vercel.app';

  const [projects, technologies, blogs] = await Promise.all([
    getAllProjects(),
    getAllTechnologies(),
    getAllBlogArticles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/technologies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const techRoutes: MetadataRoute.Sitemap = technologies.map(t => ({
    url: `${baseUrl}/technologies/${t.slug}`,
    lastModified: new Date(t.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map(b => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...techRoutes, ...blogRoutes];
}
