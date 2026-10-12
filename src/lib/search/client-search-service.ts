import { SearchQuery, SearchResultItem, SearchService } from './types';

export class ClientSearchService implements SearchService {
  async search(query: SearchQuery): Promise<SearchResultItem[]> {
    const params = new URLSearchParams();
    if (query.term) params.set('q', query.term);
    if (query.limit) params.set('limit', String(query.limit));
    if (query.technologies?.length) params.set('tech', query.technologies[0]);
    if (query.difficulty?.length) params.set('difficulty', query.difficulty[0]);
    if (query.projectTypes?.length) params.set('type', query.projectTypes[0]);

    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error('ClientSearchService error:', err);
      return [];
    }
  }
}

export const defaultClientSearchService: SearchService = new ClientSearchService();
