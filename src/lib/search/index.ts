export * from './types';
export * from './client-search-service';

import { defaultClientSearchService } from './client-search-service';
import { SearchService } from './types';

// Default search service for UI components (Client-safe)
export const defaultSearchService: SearchService = defaultClientSearchService;
