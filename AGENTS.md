# AGENTS.md

## Project Identity

This project is a professional technology education and project platform for Computer Science and IT students.

It provides practical, technology-specific final-year, academic, placement-oriented, resume, portfolio, and learning projects.

The platform must NOT look like a generic "college project ideas" website.

It should feel like a modern technology/startup platform combined with:
- A technical project library
- A technology learning platform
- An SEO-focused educational publication

---

## Core Product Principles

Always prioritize these five principles:

1. SEO
2. Usability
3. Searchability
4. High-quality technical content
5. Scalability

Never sacrifice long-term architecture for a quick visual implementation.

The platform must be capable of scaling from dozens of projects to hundreds or thousands of projects and articles.

---

## Primary Audience

The primary users are:

- B.Tech CSE students
- B.E. CSE/IT students
- BCA students
- MCA students
- Final-year engineering students
- Students preparing for placements
- Students looking for major/minor projects
- Beginners learning practical software development

The primary market is India, but the website must have a professional global appearance.

---

## Core Information Architecture

The fundamental relationship between content types is:

Technology
    ↓
Project Listings
    ↓
Individual Project Pages
    ↓
Supporting Blog Articles
    ↓
Related Projects

The platform should create strong internal relationships between:

Technology → Projects → Blog Articles → Related Projects

---

## Technology Categories

Initial categories include:

### AI & Machine Learning
- Machine Learning
- Deep Learning
- NLP
- Computer Vision
- Generative AI
- Recommendation Systems
- Predictive Analytics

### Web Development
- HTML
- CSS
- JavaScript
- React.js
- Node.js
- MERN Stack
- Full-Stack Development

### Java
- Core Java
- Advanced Java
- Spring Boot
- Spring MVC
- REST APIs
- Microservices

### Python
- Python Development
- Django
- Flask
- FastAPI
- Automation

### Data Science
- Data Analytics
- Data Visualization
- Predictive Modeling
- SQL
- Python
- Power BI

### Databases
- MySQL
- PostgreSQL
- MongoDB
- Database Management Systems

### Cloud & DevOps
- AWS
- Azure
- Docker
- Kubernetes
- CI/CD

### Cybersecurity
- Network Security
- Web Security
- Ethical Hacking
- Threat Detection

The architecture must allow additional technology categories to be added without restructuring the application.

---

## Content Quality Rules

Do not generate shallow project pages.

A project should explain how a student can actually understand, implement, extend, demonstrate, and discuss the project.

Avoid:
- Generic descriptions
- Keyword stuffing
- Repetitive paragraphs
- AI-generated filler
- Fake statistics
- Fake project results
- Fake screenshots
- Fake APIs
- Unsupported technical claims

Technical content must be useful to a student actually building the project.

---

## SEO Rules

SEO must be treated as an architectural requirement rather than something added later.

Every indexable page should have appropriate:
- Title
- Meta description
- Canonical URL
- H1
- Structured headings
- Breadcrumbs
- Internal links
- Open Graph metadata
- Appropriate structured data

Use semantic HTML.

Create scalable URL structures.

Do not create duplicate or near-duplicate pages merely to target keywords.

---

## Design Rules

The website must look like a professional technology/startup platform.

Use:
- Clean layouts
- Strong typography
- Excellent spacing
- Modern cards
- Subtle animations
- Rounded corners where appropriate
- Clear hierarchy
- Responsive layouts
- Mobile-first design

Avoid:
- Generic college website aesthetics
- Excessive gradients
- Excessive animations
- Clutter
- Overly colorful interfaces
- Template-looking layouts
- Unnecessary UI elements

---

## Development Rules

Before implementing a major architectural feature:

1. Inspect the existing codebase.
2. Understand the current architecture.
3. Reuse existing components when appropriate.
4. Avoid unnecessary dependencies.
5. Keep components modular.
6. Keep content separate from presentation wherever practical.
7. Maintain SEO and accessibility while implementing UI.

Do not rewrite working architecture unnecessarily.

---

## Scalability

Assume the final platform may contain:

- 1,000+ projects
- Hundreds of technologies/sub-technologies
- Hundreds or thousands of blog articles
- Thousands of relationships between projects and technologies
- Search and filtering across the entire content library

Architect accordingly.

---

## Critical Rule

Do not treat the project as a collection of static pages.

Treat it as a scalable content platform with structured relationships between:

Technologies
Projects
Skills
Blogs
Categories
Difficulty
Project Types
Interview Questions
Resources

All future implementation decisions should support this model.