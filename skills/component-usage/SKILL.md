# Media UI Component Usage Skill

## Purpose

Use this skill when building UI with the headless media component libraries.

The component libraries provide behavior through hooks and prop-getters. The application is responsible for markup and styling.

## Dependency Direction

Web:

app -> media-ui-react

React Native:

app -> media-ui-native

The UI libraries must not import `media-core`, `media-react`, or `media-native`.

## Media Grid

Use `useMediaGrid` for load-more or infinite-scroll behavior.

```tsx
const { getLoadMoreProps } = useMediaGrid({
  hasMore,
  loading,
  onLoadMore: loadMore,
});

return (
  <div>
    {items.map((item) => (
      <img
        key={item.id}
        src={item.thumbnailUrl}
        alt={item.title}
      />
    ))}

    <div {...getLoadMoreProps()}>
      Load more...
    </div>
  </div>
);
```

## Lightbox

Use `useLightbox` to manage the active item and navigation.

```tsx
const {
  isOpen,
  activeItem,
  open,
  close,
  next,
  previous,
  getDialogProps,
} = useLightbox({
  items,
});
```

The web Lightbox supports:

- Escape to close
- Left arrow for previous
- Right arrow for next
- Focus handling

The application supplies the Lightbox markup and CSS.

## Reel Swiper

Use `useReelSwiper` for vertical Reel-style paging and active-item detection.

```tsx
const {
  activeIndex,
  getContainerProps,
  getItemProps,
} = useReelSwiper();
```

Apply the container props:

```tsx
<div {...getContainerProps()}>
  {videos.map((video, index) => (
    <div
      key={video.id}
      {...getItemProps(index)}
    >
      <video
        src={video.mediaUrl}
        controls
      />
    </div>
  ))}
</div>
```

The application supplies scroll-snap and other visual styles.

## Rules

- Keep the component library headless.
- Do not ship application styling from the UI library.
- Consumers provide markup and CSS.
- Components receive data and callbacks through arguments and props.
- Do not import `media-core` into the component library.
- Do not import SDK wrappers into the component library.
- Keep data fetching outside the component library.