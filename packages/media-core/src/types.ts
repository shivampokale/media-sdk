export type MediaType = "photo" | "video";

export interface MediaItem {
  id: number;
  type: MediaType;
  width: number;
  height: number;
  title?: string;
  thumbnailUrl: string;
  mediaUrl: string;
  photographer?: string;
}

export interface MediaPage {
  items: MediaItem[];
  page: number;
  perPage: number;
  totalResults: number;
  hasNextPage: boolean;
}

export interface SearchParams {
  query: string;
  page?: number;
  perPage?: number;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface MediaClientConfig {
  apiKey: string;
}

export interface VideoSearchParams {
  query: string;
  page?: number;
  perPage?: number;
}