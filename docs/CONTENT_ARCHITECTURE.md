# Content Architecture

## Core Principle

The website should be treated as a structured knowledge graph rather than a collection of independent articles.

Core entities:

Technology
Project
Skill
Blog
Domain
Difficulty
Project Type
Interview Question
Resource

---

## 1. Technology Hierarchy

Technology categories may have parent-child relationships.

Example:

AI & Machine Learning
→ Machine Learning
→ Deep Learning
→ NLP
→ Computer Vision
→ Generative AI

Web Development
→ JavaScript
→ React
→ Node.js
→ MERN

Java
→ Spring Boot
→ Spring MVC
→ REST APIs
→ Microservices

---

## 2. Project Relationships

A project can belong to:

- Multiple technologies
- Multiple skills
- One or more domains
- One or more project purposes

Example:

Project:
"AI Resume Screening System"

Technologies:
- Python
- NLP
- Machine Learning
- FastAPI

Skills:
- NLP
- Classification
- REST APIs
- Python

Project types:
- Final Year
- Major
- Placement
- Resume

---

## 3. Blog Relationships

Blogs should not exist independently.

Every relevant blog should connect to:

- Technologies
- Projects
- Skills
- Other related articles

---

## 4. Content Cluster Example

Technology:

Spring Boot

Projects:

- Employee Management API
- E-Commerce Backend
- Banking Transaction System
- Job Portal Backend

Supporting articles:

- Best Spring Boot Projects for Placements
- Spring Boot Projects for Final Year
- How to Build a Spring Boot REST API
- Spring Boot Interview Project Ideas

These should form a connected content cluster.

---

## 5. Project Content Depth

Every serious project should explain:

1. What the project is
2. Why it exists
3. Problem being solved
4. Real-world use case
5. Technologies
6. Features
7. Architecture
8. Modules
9. Database
10. APIs
11. Implementation
12. Output
13. Future improvements
14. Skills learned
15. Interview questions
16. FAQs

---

## 6. Content Templates

Project pages should use a consistent template.

Blog articles should use a consistent template.

Technology pages should use a consistent template.

However, templates should allow content-specific sections where genuinely useful.

---

## 7. Content Scaling

The architecture must support:

- 10 projects
- 100 projects
- 1,000 projects
- 10,000+ content relationships

without requiring manual modification of frontend components.

---

## 8. Content Quality

Each page should provide unique value.

Do not generate pages solely by swapping:

"Python"

for

"Java"

inside the same paragraph structure.

Technology-specific content should actually reflect the technology.

---

## 9. Content Lifecycle & Author Metadata

Every primary content item (Projects, Technologies, Blog Articles) must track lifecycle metadata for editorial freshness, E-E-A-T signals, and Google search quality:

- `publishedAt`: ISO 8601 string of initial publication.
- `updatedAt`: ISO 8601 string of latest code or architectural revision.
- `lastReviewedAt`: ISO 8601 string indicating when a subject-matter expert verified technical accuracy.
- `author`: Reference to an Author entity containing name, role, bio, and social links.

---

## 10. Explicit Relationship Model

The platform enforces the canonical 4-tier knowledge graph relationship:

```
Technology
    ↓ (exposes catalog of projects)
Projects
    ↓ (deeply referenced by)
Supporting Blog Articles
    ↓ (recommends contextual)
Related Projects
```

All content interfaces and template renderers must natively support traversing and displaying these relationships.