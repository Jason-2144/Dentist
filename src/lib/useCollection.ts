import { useEffect, useState } from 'react';
import { listDocuments } from './appwrite';

interface UseCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Generic live-collection hook used by every agent card.
 * Polls every `refreshMs` (default 30s) so cards stay current without a full page reload.
 * Falls back to an empty array on error so the UI never crashes — callers should
 * render a sensible empty/zero state rather than assuming data is always present.
 */
export function useCollection<T = Record<string, unknown>>(
  collectionId: string,
  queries: string[] = [],
  refreshMs = 30000
): UseCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const docs = await listDocuments<T>(collectionId, queries);
        if (!cancelled) {
          setData(docs);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId, JSON.stringify(queries), refreshMs]);

  return { data, loading, error };
}
