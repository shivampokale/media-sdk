import { useState } from "react";
import type { MediaItem } from "@media-sdk/media-core";
import { useMediaClient } from "./MediaProvider";

export function useVideoSearch() {
  const client = useMediaClient();

  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const searchVideos = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await client.searchVideos({
        query: searchQuery,
        page: 1,
      });

      setVideos(result.items);
      setQuery(searchQuery);
      setPage(1);
      setHasMore(result.hasNextPage);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = async () => {
    if (loading || !hasMore || !query) return;

    try {
      setLoading(true);

      const nextPage = page + 1;

      const result = await client.searchVideos({
        query,
        page: nextPage,
      });

      setVideos((current) => [
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
    videos,
    loading,
    error,
    hasMore,
    searchVideos,
    loadMoreVideos,
  };
}