# Media SDK Data Wiring Skill

## Purpose

Use this skill when connecting an application to the headless media SDK.

The application should access media data through the platform wrapper instead of importing `media-core` directly.

## Dependency Direction

Web:

app -> media-react -> media-core

React Native:

app -> media-native -> media-core

The UI component libraries must not import the SDK wrappers or media-core.

## Web Setup

Wrap the application with `MediaProvider`.

```tsx
import { MediaProvider } from "@media-sdk/media-react";

<MediaProvider apiKey={apiKey}>
  <App />
</MediaProvider>