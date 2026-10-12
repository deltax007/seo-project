# Blog Page Specification

The blog is an important SEO and educational component of the platform.

It should not be treated as a generic news/blog section.

Its primary purpose is to:

- Capture search intent
- Educate users
- Help users discover projects
- Build topical authority
- Internally link to project pages
- Support technology categories

---

## Article Structure

### 1. Title

Create a clear search-intent-focused title.

Avoid clickbait.

---

## 2. Metadata & Lifecycle

Every article should have:

- SEO title
- Meta description
- Canonical URL
- Author (Name, role, bio, avatar)
- Published date (`publishedAt`)
- Updated date (`updatedAt`)
- Technical review date (`lastReviewedAt`)
- Featured image
- Open Graph metadata

---

> **Architecture Note**: The blog post page is a scalable, schema-driven content template (`src/app/blog/[slug]/page.tsx`), not an individually hard-coded page. Articles feed directly into projects and technologies via structured relationship queries.

---

## 3. Introduction

Immediately answer the user's intent.

Do not spend several paragraphs saying what the article will discuss.

---

## 4. Table of Contents

Include when the article is sufficiently long.

---

## 5. Heading Structure

Use:

H1
H2
H3
H4 where genuinely required

Do not skip heading levels unnecessarily.

---

## 6. Main Content

Content should be useful, specific and technically accurate.

Examples:

- Best AI/ML Projects for Final Year CSE Students
- Top Spring Boot Projects for Placements
- Best MERN Stack Projects for Final Year
- Machine Learning Projects for CSE Students
- Best Python Projects for College Students
- How to Choose a Final Year Project
- Best Projects for a Software Developer Resume
- Final Year Project Ideas for Computer Science
- AI Projects for Placement Preparation

---

## 7. Internal Linking

Articles should naturally link to:

- Technology pages
- Individual projects
- Related articles
- Relevant resources

Avoid excessive or unnatural linking.

---

## 8. Project CTAs

Where appropriate, introduce relevant project pages.

Example:

"Want to build this yourself? Explore our complete Machine Learning project guide."

---

## 9. FAQ

Include useful questions that genuinely arise from the topic.

Use FAQ structured data only where appropriate.

---

## 10. Related Articles

Show articles that genuinely expand the topic.

---

## 11. Author Information

Include:

- Author
- Publication date
- Updated date if applicable

Do not fabricate credentials.

---

## 12. Content Quality

Avoid:

- Keyword stuffing
- Repetitive content
- Generic AI filler
- Unsupported claims
- Fake statistics
- Fake expertise
- Search-engine-first writing that harms readability

Write for humans first while maintaining strong SEO fundamentals.

---

## 13. Article-to-Project Relationship

Whenever an article discusses a technology or project category, link readers toward relevant project pages.

The blog should continuously feed users into the project library.