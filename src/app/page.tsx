import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, CheckCircle, ShieldCheck, Terminal, BookOpen, Layers } from 'lucide-react';
import { getAllTechnologies } from '@/lib/content/technologies';
import { getAllProjects } from '@/lib/content/projects';
import { getAllBlogArticles } from '@/lib/content/blogs';
import { TechCard } from '@/components/technology/TechCard';
import { ProjectCard } from '@/components/project/ProjectCard';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata = {
  title: 'Build Projects That Get You Placement-Ready | DevProjects',
  description: 'Discover practical, technology-focused projects for Computer Science students — from AI/ML and Spring Boot to React and Cloud. Built for final year and placements.',
};

export default async function HomePage() {
  const [technologies, projects, blogs] = await Promise.all([
    getAllTechnologies(),
    getAllProjects(),
    getAllBlogArticles(),
  ]);

  const featuredProjects = projects.slice(0, 3);
  const recentBlogs = blogs.slice(0, 2);

  return (
    <div>
      {/* 1. Hero Section */}
      <section style={{
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '860px' }}>
          {/* Subtle Platform Status Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: 'var(--brand-primary)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            <Terminal size={14} />
            <span>Placement & Final-Year Engineering Project Platform</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Build Projects That Get You{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Placement-Ready
            </span>.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '720px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Discover practical, technology-focused projects for Computer Science students — from AI/ML and Spring Boot to React and Cloud microservices. Real architectures, zero toy code.
          </p>

          {/* Primary Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-glow)',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease, transform 0.15s ease',
              }}
            >
              Explore Projects
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/technologies"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none',
              }}
            >
              Browse Technologies
            </Link>
          </div>

          {/* Value Props Strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="var(--brand-secondary)" />
              <span>Full System Architecture Diagrams</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} color="var(--brand-secondary)" />
              <span>Database Schemas & APIs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={16} color="var(--brand-secondary)" />
              <span>Technical Viva & Interview Q&A</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Explore by Technology Section */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
                Structured Pathways
              </span>
              <h2 style={{ marginTop: '0.4rem' }}>Explore Projects by Technology</h2>
            </div>
            <Link href="/technologies" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              All 8 Ecosystems →
            </Link>
          </div>

          <div className="grid-4">
            {technologies.map((tech) => (
              <TechCard key={tech.id} technology={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Placement & Final Year Projects */}
      <section style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-secondary)', fontWeight: 700 }}>
                Verified Guides
              </span>
              <h2 style={{ marginTop: '0.4rem' }}>Featured Engineering Projects</h2>
            </div>
            <Link href="/projects" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              View Complete Project Library →
            </Link>
          </div>

          <div className="grid-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Projects by Purpose / Difficulty */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
              Tailored Intent
            </span>
            <h2 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>Find Projects Tailored to Your Goal</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Whether you have 48 hours for a minor semester submission or 4 months to architect your final-year placement resume centerpiece.
            </p>
          </div>

          <div className="grid-3">
            <div className="card-base" style={{ textAlign: 'left' }}>
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <span className="badge badge-type" style={{ fontSize: '12px' }}>Final Year Capstone</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem' }}>Major Degree Projects</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Multi-module architectures with database ER models, API documentation, and defensible system designs built to impress external examiners.
              </p>
              <Link href="/projects?type=Final+Year" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                Explore Major Projects →
              </Link>
            </div>

            <div className="card-base" style={{ textAlign: 'left' }}>
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <span className="badge badge-intermediate" style={{ fontSize: '12px' }}>Campus Hiring</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem' }}>Placement & Resume Centerpieces</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Production-grade backend and cloud projects built around concurrency, locking, caching, and scalable APIs that recruiters want to discuss.
              </p>
              <Link href="/projects?type=Placement" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                Explore Placement Projects →
              </Link>
            </div>

            <div className="card-base" style={{ textAlign: 'left' }}>
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <span className="badge badge-beginner" style={{ fontSize: '12px' }}>Practical Mastery</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem' }}>Minor & Skill Building</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Focused implementations allowing 2nd and 3rd year students to master asynchronous programming, WebSockets, or machine learning pipelines.
              </p>
              <Link href="/projects?type=Minor" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                Explore Minor Projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Supporting Topic Clusters / Editorial Blogs */}
      <section style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary)', fontWeight: 700 }}>
                Placement & Project Strategy
              </span>
              <h2 style={{ marginTop: '0.4rem' }}>Supporting Engineering Articles</h2>
            </div>
            <Link href="/blog" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              All Articles →
            </Link>
          </div>

          <div className="grid-2">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.id} article={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why DevProjects Is Different */}
      <section style={{ padding: 'var(--space-20) 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-secondary)', fontWeight: 700 }}>
              The DevProjects Standard
            </span>
            <h2 style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>Why We Are Not Another &quot;Project Ideas&quot; Website</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Generic listicle blogs give you bullet points. We give you engineering guides that teach you how systems actually function.
            </p>
          </div>

          <div className="grid-2">
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)'
            }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.5rem', color: '#f87171' }}>
                ✕ Generic College Project Sites
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                <li>• Flat lists of 100 vague titles with zero implementation guidance</li>
                <li>• Trivial CRUD applications (Library/Student Management) recruiters ignore</li>
                <li>• No database schema design, indexing, or transaction boundaries</li>
                <li>• No interview questions or explanation of technical tradeoffs</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-focus)',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)'
            }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.5rem', color: 'var(--brand-primary)' }}>
                ✓ DevProjects Engineering Guides
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <li>• Step-by-step verified implementation code snippets and repository layouts</li>
                <li>• Concurrency handling, pessimistic locking, CRDTs, and NLP vector math</li>
                <li>• Production database schemas with foreign keys and check constraints</li>
                <li>• Grouped placement interview questions (Basic, Technical, Architecture)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: '1rem' }}>
            Ready to Build a Project That Opens Doors?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Browse through our verified collection of engineering project guides and start implementing today.
          </p>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: 'var(--text-base)',
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            Explore the Project Catalog
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
