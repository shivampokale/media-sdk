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
  const handleEndReached = () => {
    if (hasMore && !loading) {
      onLoadMore();
    }
  };

  const getListProps = () => ({
    onEndReached: handleEndReached,
    onEndReachedThreshold: 0.5,
  });

  return {
    getListProps,
  };
}