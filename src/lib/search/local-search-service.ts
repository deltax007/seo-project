import { SearchQuery, SearchResultItem, SearchService } from './types';
import { getAllProjects } from '../content/projects';
import { getAllTechnologies } from '../content/technologies';
import { getAllBlogArticles } from '../content/blogs';

export class LocalSearchService implements SearchService {
  async search(query: SearchQuery): Promise<SearchResultItem[]> {
    const rawTerm = (query.term || '').trim().toLowerCase();
    const limit = query.limit || 15;

    const [projects, technologies, blogs] = await Promise.all([
      getAllProjects(),
      getAllTechnologies(),
      getAllBlogArticles(),
    ]);

    const results: SearchResultItem[] = [];

    // Search Projects
    for (const p of projects) {
      // Filter constraints
      if (query.technologies && query.technologies.length > 0) {
        const matchesTech = query.technologies.some(t => p.technologySlugs.includes(t) || p.primaryTechnologySlug === t);
        if (!matchesTech) continue;
      }

      if (query.difficulty && query.difficulty.length > 0) {
        if (!query.difficulty.includes(p.difficulty)) continue;
      }

      if (query.projectTypes && query.projectTypes.length > 0) {
        const matchesType = query.projectTypes.some(t => (p.projectTypes as string[]).includes(t));
        if (!matchesType) continue;
      }

      let score = 0;
      if (!rawTerm) {
        score = 1;
      } else {
        const titleLower = p.title.toLowerCase();
        const descLower = p.shortDescription.toLowerCase();
        const techMatch = p.technologySlugs.some(t => t.toLowerCase().includes(rawTerm));
        const skillsMatch = p.skillsLearned.some(s => s.toLowerCase().includes(rawTerm));
        const domainMatch = p.domains.some(d => d.toLowerCase().includes(rawTerm));

        if (titleLower === rawTerm) score += 100;
        else if (titleLower.includes(rawTerm)) score += 50;
        if (techMatch) score += 30;
        if (skillsMatch) score += 20;
        if (domainMatch) score += 15;
        if (descLower.includes(rawTerm)) score += 10;
      }

      if (score > 0) {
        results.push({
          id: p.id,
          slug: p.slug,
          title: p.title,
          snippet: p.shortDescription,
          entityType: 'project',
          primaryTechnology: p.primaryTechnologySlug,
          difficulty: p.difficulty,
          url: `/projects/${p.slug}`,
          matchScore: score,
        });
      }
    }

    // Search Technologies
    if (!query.difficulty?.length && !query.projectTypes?.length) {
      for (const t of technologies) {
        let score = 0;
        const nameLower = t.name.toLowerCase();
        const descLower = t.description.toLowerCase();

        if (!rawTerm) {
          score = 1;
        } else {
          if (nameLower === rawTerm) score += 100;
          else if (nameLower.includes(rawTerm)) score += 60;
          else if (t.category.includes(rawTerm)) score += 30;
          else if (descLower.includes(rawTerm)) score += 10;
        }

        if (score > 0) {
          results.push({
            id: t.id,
            slug: t.slug,
            title: `${t.name} Project Hub`,
            snippet: t.description,
            entityType: 'technology',
            primaryTechnology: t.slug,
            url: `/technologies/${t.slug}`,
            matchScore: score,
          });
        }
      }

      // Search Blogs
      for (const b of blogs) {
        let score = 0;
        const titleLower = b.title.toLowerCase();
        const excerptLower = b.excerpt.toLowerCase();
        const tagMatch = b.tags.some(tag => tag.toLowerCase().includes(rawTerm));

        if (!rawTerm) {
          score = 1;
        } else {
          if (titleLower === rawTerm) score += 90;
          else if (titleLower.includes(rawTerm)) score += 45;
          else if (tagMatch) score += 25;
          else if (excerptLower.includes(rawTerm)) score += 10;
        }

        if (score > 0) {
          results.push({
            id: b.id,
            slug: b.slug,
            title: b.title,
            snippet: b.excerpt,
            entityType: 'blog',
            primaryTechnology: b.targetTechnologySlugs[0] || 'guide',
            url: `/blog/${b.slug}`,
            matchScore: score,
          });
        }
      }
    }

    results.sort((a, b) => b.matchScore - a.matchScore);
    return results.slice(0, limit);
  }
}
