import { useState } from "react";
import type { MediaItem } from "@media-sdk/media-core";
import { useMediaClient } from "./MediaProvider";

export function useMediaSearch() {
  const client = useMediaClient();

  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const search = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await client.search({
        query: searchQuery,
        page: 1,
      });

      setItems(result.items);
      setHasMore(result.hasNextPage);
      setQuery(searchQuery);
      setPage(1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore || !query) return;

    try {
      setLoading(true);

      const nextPage = page + 1;

      const result = await client.search({
        query,
        page: nextPage,
      });

      setItems((current) => [
        ...current,
        ...result.items,
      ]);

      setPage(nextPage);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    hasMore,
    search,
    loadMore,
  };
}