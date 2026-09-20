import { useState } from "react";
import type { MediaItem } from "@media-sdk/media-core";
import { useMediaClient } from "./MediaProvider";

export function useCuratedMedia() {
  const client = useMediaClient();

  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const loadCurated = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await client.getCurated({
        page: 1,
      });

      setItems(result.items);
      setPage(1);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCurated = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const nextPage = page + 1;

      const result = await client.getCurated({
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
        err instanceof Error
          ? err.message
          : "Something went wrong"
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
    loadCurated,
    loadMoreCurated,
  };
}