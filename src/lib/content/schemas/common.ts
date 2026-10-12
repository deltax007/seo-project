import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  role: z.string(),
  bio: z.string(),
  avatarUrl: z.string().optional(),
  socialLinks: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }).optional(),
});

export type Author = z.infer<typeof AuthorSchema>;

export const FaqItemSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;

export const SeoMetadataSchema = z.object({
  metaTitle: z.string().min(10).max(100),
  metaDescription: z.string().min(30).max(250),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),
});

export type SeoMetadata = z.infer<typeof SeoMetadataSchema>;

export const ContentLifecycleSchema = z.object({
  publishedAt: z.string(), // ISO string
  updatedAt: z.string(),   // ISO string
  lastReviewedAt: z.string(), // ISO string
  author: AuthorSchema,
  reviewer: AuthorSchema.optional(),
});
