# Technical Architecture

## Objective

Build a scalable content-driven web platform capable of supporting hundreds or thousands of projects and blog articles.

The architecture must prioritize:

- Performance
- SEO
- Maintainability
- Scalability
- Developer experience
- Content management
- Searchability

---

## 1. Architecture Philosophy

Separate:

1. Presentation
2. Content
3. Content relationships
4. Search/filtering
5. SEO
6. Application logic

Do not hardcode large amounts of project content directly inside UI components.

---

## 2. Content Model

At minimum, the system should conceptually support:

### Technology

Fields should include appropriate equivalents of:

- Name
- Slug
- Description
- Parent category
- Sub-technologies
- Icon/image
- Related projects
- Related articles
- SEO metadata

### Project

Support:

- Title
- Slug
- Short description
- Full description
- Technology stack
- Programming languages
- Difficulty
- Project type
- Domain
- Problem statement
- Objectives
- Features
- Architecture
- Modules
- Database design
- APIs
- Implementation guide
- Expected output
- Screenshots
- Demo
- Future improvements
- Skills learned
- Interview questions
- FAQs
- Related projects
- SEO metadata

### Blog

Support:

- Title
- Slug
- Excerpt
- Content
- Author
- Publication date
- Updated date
- Category
- Tags
- Related technologies
- Related projects
- FAQ
- SEO metadata
- Featured image

---

## 3. Relationships

Projects may belong to multiple technologies.

Projects may have multiple skills.

Projects may belong to multiple project types.

Blogs may reference multiple technologies and projects.

Technologies should automatically expose related projects and relevant articles.

Projects should expose relevant articles and related projects.

---

## 4. Routing

Use clean, predictable URLs.

Possible conceptual structure:

/projects
/projects/[project-slug]

/technologies
/technologies/[technology-slug]

/blog
/blog/[article-slug]

/resources
/resources/[resource-slug]

Avoid unnecessary URL parameters for pages that should be indexable.

---

## 5. Search

Search should eventually support:

- Project title
- Technology
- Programming language
- Skill
- Domain
- Blog title

The search system should be designed so that it can scale beyond a small static dataset.

---

## 6. Filtering

Project filters should support:

- Technology
- Language
- Difficulty
- Project type
- Domain
- Skill

Filters must be usable on desktop and mobile.

---

## 7. Component Architecture

Create reusable components for:

- Navigation
- Footer
- Search
- Project cards
- Technology cards
- Blog cards
- Breadcrumbs
- Filters
- Difficulty badges
- Technology badges
- CTA sections
- FAQ
- Table of contents
- Related content
- Metadata

Do not create duplicate components for visually identical functionality.

---

## 8. Performance

Prioritize:

- Fast initial page load
- Optimized images
- Minimal client-side JavaScript
- Lazy loading where appropriate
- Efficient fonts
- Semantic HTML
- Efficient data fetching
- Caching where appropriate

Do not add client-side complexity without a reason.

---

## 9. Accessibility

Support:

- Keyboard navigation
- Semantic HTML
- Appropriate ARIA where needed
- Accessible contrast
- Meaningful alt text
- Focus states
- Accessible forms
- Screen-reader-friendly navigation

---

## 10. Deployment

The architecture should be deployment-friendly.

Avoid unnecessary infrastructure until it is actually required.

Design the application so that the content system can later move from local/static content to a CMS or database without rewriting the entire frontend.

---

## 11. Important Architectural Decision & Production Stack Selection

### Stack Evaluation & Comparison

| Criterion | Next.js (App Router, TS) | Astro (TS) | Remix / React Router v7 | Vite + React SPA |
| :--- | :--- | :--- | :--- | :--- |
| **SEO & Indexability** | **Exceptional (RSC / SSG / ISR)** | Exceptional (Zero-JS SSG) | Strong (SSR) | **Poor (CSR)** |
| **Content Performance (Core Web Vitals)** | **High (RSC, zero client JS for content)** | High (Islands) | Medium-High (SSR overhead) | Poor (Large client bundles) |
| **Interactive Search & Faceted Filtering** | **Native client/server hybrid routing** | Requires React/Vue island bridge | Native loaders/actions | Pure client-side |
| **Dynamic ISR at Scale (1,000+ pages)** | **Built-in on-demand ISR** | Requires full rebuild or SSR adapter | SSR caching required | Not applicable |
| **Ecosystem & Long-term Extensibility** | **Unmatched (CMS, DB, Auth, Analytics)** | Growing, content-focused | Strong standard web | Standard SPA |

### Selected Stack: Next.js (Latest Stable Active LTS) + TypeScript + Vanilla CSS / CSS Modules with Design Tokens

**Architectural Justifications:**

1. **Server-First Content Architecture**: React Server Components (RSC) serve as the default for all content-heavy pages (project guides, technology hubs, blog articles) to minimize client-side JavaScript. Client Components are isolated strictly to genuinely interactive functionality (e.g., search modal, faceted filter drawer, code copy buttons, accordion expanders).
2. **Hybrid Static Generation (SSG + ISR)**: Core content pages and hubs are pre-rendered at build time for instant CDN response times, with On-Demand or periodic Incremental Static Regeneration (ISR) to enable content updates and long-tail scaling without full rebuilds.
3. **Lightweight Content Layer**: Content querying is managed through lightweight, functional TypeScript modules (`src/lib/content/*.ts`) without over-engineered classes, factories, or complex adapter hierarchies. Content is validated against strict, first-class Zod schemas at build time.
4. **Stable Search Service Interface**: The search UI component relies exclusively on an abstract `SearchService` interface (`search(query, filters): Promise<SearchResult[]>`). Phase 1 implements this interface using a build-time generated search index; future database or full-text search engines can implement the exact same interface without any changes to the search UI.
5. **Design System & Styling**: Vanilla CSS and CSS Modules utilizing CSS custom properties (Design Tokens in `src/styles/tokens.css`). Guarantees zero runtime CSS-in-JS overhead, pristine performance, and strict conformance to [DESIGN_SYSTEM.md](file:///c:/Users/omen/seo-%20project/docs/DESIGN_SYSTEM.md).
6. **Scalable Content Templates**: Project pages (`/projects/[slug]`) and blog pages (`/blog/[slug]`) are built as dynamic, schema-driven content templates rather than individually hardcoded pages.

---

## 12. Architectural Decision Records (ADRs)

- **ADR-001: Next.js Active LTS App Router**: Selected for server-first rendering, SSG/ISR capabilities, and minimal client JavaScript for content-heavy educational pages.
- **ADR-002: Lightweight Functional Content Layer**: Use lightweight TypeScript functions backed by Zod schemas (`src/lib/content/*.ts`) to load and validate structured Markdown/JSON content. Avoid over-engineering multi-tier abstractions.
- **ADR-003: Contract-Based Search Service (`SearchService`)**: Search UI interacts with a standard `SearchService` contract. Phase 1 provides a local in-memory index implementation; backend full-text search can replace it transparently later.
- **ADR-004: Strict URL Canonicalization & Content Knowledge Graph**: Enforce clean routes (`/projects/[slug]`, `/technologies/[slug]`, `/blog/[slug]`) and explicitly model the relationship chain: `Technology → Projects → Blog Articles → Related Projects`.
- **ADR-005: First-Class Content Lifecycle & Metadata**: All publishable entities must include lifecycle metadata (`publishedAt`, `updatedAt`, `lastReviewedAt`, `author`, and SEO metadata) validated via Zod.