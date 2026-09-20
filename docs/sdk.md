# Media SDK Documentation

## Overview

The Media SDK provides a framework-agnostic TypeScript client for accessing Pexels photos and videos.

The core SDK is located in:

```text
packages/media-core
```

## Create a Client

```ts
import { MediaClient } from "@media-sdk/media-core";

const client = new MediaClient({
  apiKey: "YOUR_PEXELS_API_KEY",
});
```

## Search Photos

```ts
const result = await client.search({
  query: "nature",
  page: 1,
  perPage: 20,
});

console.log(result.items);
```

The result contains:

```ts
{
  items,
  page,
  perPage,
  totalResults,
  hasNextPage
}
```

## Search Videos

```ts
const result = await client.searchVideos({
  query: "nature",
  page: 1,
  perPage: 20,
});

console.log(result.items);
```

## Curated Photos

```ts
const result = await client.getCurated({
  page: 1,
  perPage: 20,
});
```

## Fetch a Single Photo

```ts
const photo = await client.getById(123);
```

## Fetch a Single Video

```ts
const video = await client.getVideoById(123);
```

## Pagination

Search and curated methods support page-based pagination.

```ts
const firstPage = await client.search({
  query: "mountains",
  page: 1,
  perPage: 20,
});

const secondPage = await client.search({
  query: "mountains",
  page: 2,
  perPage: 20,
});
```

Use `hasNextPage` to determine whether another page is available.

## Media Item

The SDK normalizes Pexels responses into a common media shape.

```ts
interface MediaItem {
  id: number;
  type: "photo" | "video";
  width: number;
  height: number;
  title?: string;
  thumbnailUrl: string;
  mediaUrl: string;
  photographer?: string;
}
```

## Events

The SDK supports:

```text
view
download
```

Subscribe to events:

```ts
const unsubscribe = client.subscribe((event) => {
  console.log(event);
});
```

Emit a view event:

```ts
client.emitView(mediaId);
```

Emit a download event:

```ts
client.emitDownload(mediaId);
```

Unsubscribe:

```ts
unsubscribe();
```

## Error Handling

API requests throw an error when Pexels returns an unsuccessful response.

```ts
try {
  const result = await client.search({
    query: "nature",
  });
} catch (error) {
  console.error(error);
}
```

## Caching

The SDK uses basic in-memory caching for media requests.

Repeated requests using the same cache key can return the previously cached result.

## React Wrapper

React applications should use:

```text
@media-sdk/media-react
```

instead of directly coupling application components to the core client.

## React Native Wrapper

React Native applications should use:

```text
@media-sdk/media-native
```

## Dependency Rule

```text
Application -> Platform Wrapper -> media-core
```

UI component libraries remain independent from the SDK and wrappers.