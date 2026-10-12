import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://devprojects.io'),
  title: {
    template: '%s | DevProjects Platform',
    default: 'DevProjects | Engineering Project Platform for Computer Science Students',
  },
  description: 'Discover practical, technology-specific final-year, placement, and portfolio projects for CS & IT students. Real architectures, database designs, and interview preparation.',
  keywords: [
    'Final Year Projects',
    'CSE Projects',
    'Placement Projects',
    'Spring Boot Projects',
    'Machine Learning Projects',
    'Python Projects',
    'MERN Stack Projects',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devprojects.io',
    siteName: 'DevProjects Platform',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
