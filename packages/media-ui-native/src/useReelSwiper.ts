import { useState } from "react";

export function useReelSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{ index: number | null }>;
  }) => {
    const index = viewableItems[0]?.index;

    if (typeof index === "number") {
      setActiveIndex(index);
    }
  };

  const getListProps = () => ({
    pagingEnabled: true,
    onViewableItemsChanged: handleViewableItemsChanged,
  });

  return {
    activeIndex,
    getListProps,
  };
}