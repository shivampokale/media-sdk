import { useState } from "react";

interface UseLightboxOptions<T> {
  items: T[];
}

export function useLightbox<T>({
  items,
}: UseLightboxOptions<T>) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const isOpen = activeIndex !== null;

  const activeItem =
    activeIndex !== null ? items[activeIndex] : null;

  const open = (index: number) => {
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
  };

  const next = () => {
    if (activeIndex === null || items.length === 0) return;

    setActiveIndex(
      (activeIndex + 1) % items.length
    );
  };

  const previous = () => {
    if (activeIndex === null || items.length === 0) return;

    setActiveIndex(
      (activeIndex - 1 + items.length) % items.length
    );
  };

  return {
    isOpen,
    activeItem,
    activeIndex,
    open,
    close,
    next,
    previous,
  };
}