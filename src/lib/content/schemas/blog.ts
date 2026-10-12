import { z } from 'zod';
import { SeoMetadataSchema, ContentLifecycleSchema, FaqItemSchema } from './common';

export const BlogArticleSchema = ContentLifecycleSchema.extend({
  id: z.string(),
  slug: z.string(),
  title: z.string().min(10),
  excerpt: z.string().min(30).max(300),
  readTimeMinutes: z.number().int().positive().default(5),
  content: z.string().min(50),
  category: z.string(),
  tags: z.array(z.string()).min(1),
  
  // Knowledge Graph Relationships
  targetTechnologySlugs: z.array(z.string()).min(1),
  featuredProjectSlugs: z.array(z.string()).min(1),
  relatedArticleSlugs: z.array(z.string()).default([]),

  faqs: z.array(FaqItemSchema).default([]),
  seo: SeoMetadataSchema,
});

export type BlogArticle = z.infer<typeof BlogArticleSchema>;
