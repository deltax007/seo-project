import { z } from 'zod';
import { SeoMetadataSchema, ContentLifecycleSchema } from './common';

export const TechnologyCategoryEnum = z.enum([
  'ai-ml',
  'web-development',
  'java',
  'python',
  'data-science',
  'databases',
  'cloud-devops',
  'cybersecurity',
]);

export type TechnologyCategory = z.infer<typeof TechnologyCategoryEnum>;

export const TechnologySchema = ContentLifecycleSchema.extend({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1),
  category: TechnologyCategoryEnum,
  categoryLabel: z.string(),
  parentTechnologySlug: z.string().optional(),
  description: z.string().min(20),
  icon: z.string(), // icon identifier (e.g. "code", "cpu", "server", "database")
  officialDocsUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  subTechnologies: z.array(z.string()).default([]),
  seo: SeoMetadataSchema,
});

export type Technology = z.infer<typeof TechnologySchema>;
