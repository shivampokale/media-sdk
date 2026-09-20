import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { MediaClient } from "@media-sdk/media-core";

interface MediaProviderProps {
  apiKey: string;
  children: ReactNode;
}

const MediaContext = createContext<MediaClient | null>(null);

export function MediaProvider({
  apiKey,
  children,
}: MediaProviderProps) {
  const client = useMemo(() => {
    return new MediaClient({ apiKey });
  }, [apiKey]);

  return (
    <MediaContext.Provider value={client}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMediaClient(): MediaClient {
  const client = useContext(MediaContext);

  if (!client) {
    throw new Error(
      "useMediaClient must be used inside MediaProvider"
    );
  }

  return client;
}