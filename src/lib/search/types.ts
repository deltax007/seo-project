export interface SearchQuery {
  term: string;
  technologies?: string[];
  difficulty?: ('Beginner' | 'Intermediate' | 'Advanced')[];
  projectTypes?: string[];
  limit?: number;
}

export interface SearchResultItem {
  id: string;
  slug: string;
  title: string;
  snippet: string;
  entityType: 'project' | 'technology' | 'blog';
  primaryTechnology: string;
  difficulty?: string;
  url: string;
  matchScore: number;
}

export interface SearchService {
  search(query: SearchQuery): Promise<SearchResultItem[]>;
}
