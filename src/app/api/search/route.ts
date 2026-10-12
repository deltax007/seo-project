import { NextRequest, NextResponse } from 'next/server';
import { LocalSearchService } from '@/lib/search/local-search-service';

const searchService = new LocalSearchService();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const tech = searchParams.get('tech');
  const difficulty = searchParams.get('difficulty');
  const type = searchParams.get('type');

  const results = await searchService.search({
    term,
    limit,
    technologies: tech ? [tech] : undefined,
    difficulty: difficulty ? [difficulty as any] : undefined,
    projectTypes: type ? [type] : undefined,
  });

  return NextResponse.json(results);
}
