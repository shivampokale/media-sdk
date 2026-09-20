# Media Component Library Documentation

## Overview

The media UI packages provide headless UI behavior for React and React Native.

They do not fetch data and do not import `media-core` or the platform SDK wrappers.

The consumer provides the media data, markup, and styling.

## React Package

```text
@media-sdk/media-ui-react
```

It provides:

- `useMediaGrid`
- `useLightbox`
- `useReelSwiper`

## Media Grid

`useMediaGrid` provides infinite-scroll/load-more behavior.

```tsx
const { getLoadMoreProps } = useMediaGrid({
  hasMore,
  loading,
  onLoadMore: loadMore,
});
```

Apply the returned props to the load-more element:

```tsx
<div {...getLoadMoreProps()}>
  Load more...
</div>
```

The hook uses intersection detection to request more items when the element becomes visible.

## Lightbox

`useLightbox` manages Lightbox state and navigation.

```tsx
const {
  isOpen,
  activeItem,
  activeIndex,
  open,
  close,
  next,
  previous,
  getDialogProps,
} = useLightbox({
  items,
});
```

Open an item:

```tsx
<button onClick={() => open(index)}>
  Open
</button>
```

Apply the dialog props:

```tsx
<div {...getDialogProps()}>
  Lightbox content
</div>
```

The React Lightbox behavior supports:

- Escape key to close
- Left arrow to show the previous item
- Right arrow to show the next item
- Focus handling when opening and closing

The application supplies all Lightbox markup and CSS.

## Reel Swiper

`useReelSwiper` provides vertical Reel-style active-item detection.

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

The application supplies the vertical scrolling and scroll-snap styles.

## React Native Package

```text
@media-sdk/media-ui-native
```

The React Native package provides the same headless UI concepts for:

- Grid load-more behavior
- Lightbox state and navigation
- Reel paging
- Active-item detection

## Headless Design

The component libraries contain behavior rather than application-specific presentation.

They do not:

- Fetch Pexels data
- Import `media-core`
- Import `media-react`
- Import `media-native`
- Ship application-specific styles

## Dependency Rule

```text
Web App -> media-ui-react

React Native App -> media-ui-native
```

The application combines the SDK wrapper data with the independent UI behavior.