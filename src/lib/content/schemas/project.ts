import { z } from 'zod';
import { SeoMetadataSchema, ContentLifecycleSchema, FaqItemSchema } from './common';

export const DifficultyEnum = z.enum(['Beginner', 'Intermediate', 'Advanced']);
export type Difficulty = z.infer<typeof DifficultyEnum>;

export const ProjectTypeEnum = z.enum([
  'Final Year',
  'Major',
  'Minor',
  'Placement',
  'Resume',
  'Portfolio',
]);
export type ProjectType = z.infer<typeof ProjectTypeEnum>;

export const InterviewQuestionCategoryEnum = z.enum([
  'Basic',
  'Technical',
  'Architecture',
  'Database',
  'Placement',
]);
export type InterviewQuestionCategory = z.infer<typeof InterviewQuestionCategoryEnum>;

export const ProjectSchema = ContentLifecycleSchema.extend({
  id: z.string(),
  slug: z.string(),
  title: z.string().min(5),
  shortDescription: z.string().min(30).max(300),
  difficulty: DifficultyEnum,
  projectTypes: z.array(ProjectTypeEnum).min(1),
  
  // Relations
  primaryTechnologySlug: z.string(),
  technologySlugs: z.array(z.string()).min(1),
  programmingLanguages: z.array(z.string()).min(1),
  domains: z.array(z.string()).min(1),
  skillsLearned: z.array(z.string()).min(2),

  // Deep Technical Sections
  problemStatement: z.string().min(30),
  objectives: z.array(z.string()).min(2),
  realWorldUseCase: z.string().min(20),
  architecture: z.object({
    overview: z.string().min(30),
    diagramType: z.enum(['svg', 'mermaid', 'ascii']),
    diagramContent: z.string(),
  }),
  features: z.array(z.string()).min(3),
  modules: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })).min(2),
  databaseDesign: z.object({
    databaseType: z.string(),
    description: z.string(),
    tables: z.array(z.object({
      name: z.string(),
      description: z.string(),
      primaryKey: z.string().optional(),
      fields: z.array(z.string()),
    })).default([]),
  }).optional(),
  apis: z.array(z.object({
    endpoint: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    description: z.string(),
    responseSample: z.string().optional(),
  })).optional(),
  implementationGuide: z.array(z.object({
    stepNumber: z.number().int().positive(),
    title: z.string(),
    instructions: z.string(),
    codeSnippet: z.object({
      language: z.string(),
      code: z.string(),
      fileName: z.string().optional(),
    }).optional(),
  })).min(2),
  expectedOutput: z.string().min(20),
  futureImprovements: z.array(z.string()).min(1),
  interviewQuestions: z.array(z.object({
    category: InterviewQuestionCategoryEnum,
    question: z.string(),
    answer: z.string(),
  })).min(2),
  faqs: z.array(FaqItemSchema).min(1),

  // Relationships
  relatedProjectSlugs: z.array(z.string()).default([]),
  relatedBlogSlugs: z.array(z.string()).default([]),
  
  seo: SeoMetadataSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
