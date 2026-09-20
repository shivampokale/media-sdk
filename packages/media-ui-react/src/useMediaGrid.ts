import { useEffect, useRef } from "react";

interface UseMediaGridOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export function useMediaGrid({
  hasMore,
  loading,
  onLoadMore,
}: UseMediaGridOptions) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, onLoadMore]);

  const getLoadMoreProps = () => ({
    ref: loadMoreRef,
  });

  return {
    getLoadMoreProps,
  };
}