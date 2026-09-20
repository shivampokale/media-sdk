import { useState, type UIEvent } from "react";

export function useReelSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getContainerProps = () => ({
    onScroll: (event: UIEvent<HTMLDivElement>) => {
      const container = event.currentTarget;
      const itemHeight = container.clientHeight;

      if (!itemHeight) return;

      const index = Math.round(
        container.scrollTop / itemHeight
      );

      setActiveIndex(index);
    },
  });

  const getItemProps = (index: number) => ({
    "data-active": index === activeIndex,
  });

  return {
    activeIndex,
    getContainerProps,
    getItemProps,
  };
}