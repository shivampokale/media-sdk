# Headless Media SDK + Component Library

A headless media SDK and component library built with TypeScript, React, and React Native wrappers using the Pexels API.

## Project Structure

```text
media-sdk/
├── apps/
│   └── web/
├── packages/
│   ├── media-core/
│   ├── media-react/
│   ├── media-native/
│   ├── media-ui-react/
│   └── media-ui-native/
└── skills/
    ├── data-wiring/
    └── component-usage/
```

## Packages

### media-core

Framework-agnostic TypeScript SDK responsible for:

- Pexels photo search
- Pexels video search
- Curated photos
- Pagination
- Single photo fetch
- Single video fetch
- API key configuration
- Error handling
- In-memory caching
- View events
- Download events

It does not import React, React Native, or DOM-specific APIs.

### media-react

React wrapper around `media-core`.

Provides:

- `MediaProvider`
- `useMediaClient`
- `useMediaSearch`
- `useVideoSearch`
- `useCuratedMedia`

### media-native

React Native wrapper around `media-core` with the same data-access contract.

### media-ui-react

Independent headless React UI behavior library.

Provides:

- Media Grid behavior
- Lightbox behavior
- Keyboard and focus handling
- Reel Swiper behavior
- Active Reel detection

It does not import `media-core` or `media-react`.

### media-ui-native

Independent React Native UI behavior library.

Provides:

- Grid load-more behavior
- Lightbox state
- Reel paging and active-item behavior

It does not import `media-core` or `media-native`.

## Dependency Direction

```text
Web App -> media-react -> media-core
Web App -> media-ui-react

React Native App -> media-native -> media-core
React Native App -> media-ui-native
```

The wrapper packages and UI packages do not import each other.

## Web Demo

The React web application demonstrates:

- Photo search
- Curated photos
- Infinite loading
- Photo Lightbox
- Keyboard navigation
- Download events
- View events
- Video search
- Vertical Reel-style video browsing
- Active Reel detection

## Environment Setup

Create:

```text
apps/web/.env.local
```

Add:

```text
VITE_PEXELS_API_KEY=your_pexels_api_key
```

Do not commit `.env.local`.

## Install

From the project root:

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Skill Documents

AI workflow guidance is available in:

```text
skills/data-wiring/SKILL.md
skills/component-usage/SKILL.md
```

The data-wiring skill describes how an AI coding assistant should connect applications to the SDK wrappers.

The component-usage skill describes how an AI coding assistant should use the headless component libraries without breaking package boundaries.

## AI-Assisted Development

AI coding assistance was used during development to help with:

- Project structure planning
- Boilerplate generation
- TypeScript implementation suggestions
- Headless hook design
- Documentation
- Reviewing dependency boundaries
- Build-error troubleshooting

The implementation was manually integrated, configured, run, and verified in the project.

The developer remained responsible for understanding the architecture, testing the application, configuring the Pexels API, validating generated code, and making final implementation decisions.

## API Key Note

The demo receives the Pexels API key through application configuration and passes it to the SDK through `MediaProvider`.

For a production application where an API credential must remain secret, API requests should normally be made through a secure backend or server-side proxy rather than exposing the credential in client-side JavaScript.