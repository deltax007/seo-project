export * from './schemas';
export * from './technologies';
export * from './projects';
export * from './blogs';

import { getTechnologyBySlug } from './technologies';
import { getProjectsByTechnology, getRelatedProjects } from './projects';
import { getArticlesForTechnology } from './blogs';
import { Technology } from './schemas/technology';
import { Project } from './schemas/project';
import { BlogArticle } from './schemas/blog';

/**
 * Traverses the complete knowledge graph chain:
 * Technology → Projects → Blog Articles → Related Projects
 */
export async function getCompleteKnowledgeCluster(techSlug: string): Promise<{
  technology: Technology | null;
  projects: Project[];
  supportingArticles: BlogArticle[];
  relatedProjects: Project[];
}> {
  const technology = await getTechnologyBySlug(techSlug);
  const projects = await getProjectsByTechnology(techSlug);
  const supportingArticles = await getArticlesForTechnology(techSlug);

  // Collect related projects from the top project in this cluster
  let relatedProjects: Project[] = [];
  if (projects.length > 0) {
    relatedProjects = await getRelatedProjects(projects[0], 3);
  }

  return {
    technology,
    projects,
    supportingArticles,
    relatedProjects,
  };
}
