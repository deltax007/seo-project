# Project Page Specification

Every project should have a dedicated, SEO-optimized, implementation-oriented page.

---

## Page Structure

### 1. Breadcrumb

Example:

Home
→ Projects
→ Machine Learning
→ Project Name

---

## 2. Project Header

Include:

- Project title
- Short description
- Difficulty badge (Beginner, Intermediate, Advanced)
- Project type badges (Final Year, Placement, Major, Minor, Resume)
- Primary technologies & key skills
- Author and Reviewer credentials (E-E-A-T)
- Lifecycle metadata: Published date, Last updated date, Last reviewed date

Primary CTA:

"Get the Complete Project Guide"

---

> **Architecture Note**: The project page is a reusable, schema-driven content template (`src/app/projects/[slug]/page.tsx`), not an individually hand-coded page. All dynamic sections, tables, accordions, and diagrams are rendered based on the validated Project Zod schema.

---

## 3. Introduction

Explain:

- What the project is
- Who it is suitable for
- Why it is useful
- What the student will build

---

## 4. Project Overview

Explain the system at a high level.

---

## 5. Problem Statement

Clearly define the real-world problem.

---

## 6. Objective

Explain what the project intends to accomplish.

---

## 7. Real-World Use Case

Explain where similar systems could be used in the real world.

Do not invent claims about real organizations unless properly sourced.

---

## 8. Technologies Used

Clearly list:

- Programming languages
- Frameworks
- Libraries
- Databases
- APIs
- Cloud tools
- DevOps tools

---

## 9. Features

List meaningful project functionality.

---

## 10. System Architecture

Provide a clear architecture explanation.

Where useful, include an architecture diagram.

---

## 11. How It Works

Explain the complete workflow from input to output.

---

## 12. Database Design

Where applicable:

- Tables/collections
- Relationships
- Important fields
- Data flow

---

## 13. APIs

Where applicable:

- API purpose
- Endpoint
- Method
- Request
- Response
- Authentication

Do not invent APIs that the project does not actually use.

---

## 14. Project Modules

Break the project into understandable modules.

---

## 15. Step-by-Step Implementation

Explain how a student can build the project.

The implementation should be practical rather than theoretical.

---

## 16. Expected Output

Explain what the completed system should produce.

---

## 17. Screenshots / Demo

Support:

- Screenshots
- UI previews
- Architecture diagrams
- Demo links where available

Do not create fake screenshots and present them as real results.

---

## 18. Future Improvements

Provide realistic extensions.

---

## 19. Skills Students Learn

Examples:

- Programming
- APIs
- Databases
- System design
- Deployment
- Debugging
- Testing

Only include skills genuinely relevant to the project.

---

## 20. Interview Questions

Include questions related to the actual project.

Group them where useful:

### Basic
### Technical
### Architecture
### Database
### Advanced

Questions should help students explain their project during interviews.

---

## 21. FAQ

Answer realistic questions students may have.

Examples:

- Is this suitable for a final-year project?
- What programming knowledge is required?
- Is this suitable for beginners?
- Can this project be extended?
- What technologies are required?

---

## 22. Related Projects

Show projects based on:

- Similar technologies
- Similar domain
- Similar difficulty
- Similar project purpose

---

## 23. SEO

Every project page must support:

- SEO title
- Meta description
- Canonical
- Open Graph
- Breadcrumb schema
- Appropriate structured data
- Internal links

---

## 24. Quality Standard

A project page should feel like a mini technical guide.

It should answer:

"What is it?"

"Why build it?"

"How does it work?"

"How do I build it?"

"What technologies do I learn?"

"How do I explain it in an interview?"