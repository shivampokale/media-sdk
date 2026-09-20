import {
  useEffect,
  useRef,
  useState,
} from "react";

interface UseLightboxOptions<T> {
  items: T[];
}

export function useLightbox<T>({
  items,
}: UseLightboxOptions<T>) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = activeIndex !== null;

  const activeItem =
    activeIndex !== null ? items[activeIndex] : null;

  const open = (index: number) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

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

  useEffect(() => {
    if (!isOpen) {
      previousFocusRef.current?.focus();
      return;
    }

    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length]);

  const getDialogProps = () => ({
    ref: dialogRef,
    tabIndex: -1,
    role: "dialog" as const,
    "aria-modal": true as const,
  });

  return {
    isOpen,
    activeItem,
    activeIndex,
    open,
    close,
    next,
    previous,
    getDialogProps,
  };
}