import type {
  MediaClientConfig,
  MediaItem,
  MediaPage,
  PaginationParams,
  SearchParams,
  VideoSearchParams,
} from "./types";

import {
  MediaEventEmitter,
  type MediaEventListener,
} from "./events";

import { MemoryCache } from "./cache";

import type {
  PexelsPhoto,
  PexelsPhotoResponse,
  PexelsVideo,
  PexelsVideoResponse,
} from "./pexels-types";

const BASE_URL = "https://api.pexels.com/v1";
const VIDEO_BASE_URL = "https://api.pexels.com/videos";

export class MediaClient {
  private apiKey: string;
  private events = new MediaEventEmitter();
  private cache = new MemoryCache();

  constructor(config: MediaClientConfig) {
    if (!config.apiKey?.trim()) {
      throw new Error("Pexels API key is required");
    }

    this.apiKey = config.apiKey;

    this.events.subscribe((event) => {
      console.log("[media-core event]", event);
    });
  }

  private async request<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Authorization: this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Pexels API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  }

  private mapPhoto(photo: PexelsPhoto): MediaItem {
    return {
      id: photo.id,
      type: "photo",
      width: photo.width,
      height: photo.height,
      title: photo.alt,
      thumbnailUrl: photo.src.medium,
      mediaUrl: photo.src.large,
      photographer: photo.photographer,
    };
  }

  private mapVideo(video: PexelsVideo): MediaItem {
    return {
      id: video.id,
      type: "video",
      width: video.width,
      height: video.height,
      title: `Video by ${video.user?.name ?? "Unknown"}`,
      thumbnailUrl: video.image,
      mediaUrl: video.video_files?.[0]?.link ?? "",
      photographer: video.user?.name,
    };
  }

  async search(params: SearchParams): Promise<MediaPage> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const cacheKey =
      `search:${params.query}:${page}:${perPage}`;

    const cached = this.cache.get<MediaPage>(cacheKey);

    if (cached) {
      return cached;
    }

    const url =
      `${BASE_URL}/search?query=${encodeURIComponent(params.query)}` +
      `&page=${page}&per_page=${perPage}`;

    const data =
      await this.request<PexelsPhotoResponse>(url);

    const result: MediaPage = {
      items: data.photos.map((photo) =>
        this.mapPhoto(photo)
      ),
      page: data.page,
      perPage: data.per_page,
      totalResults: data.total_results,
      hasNextPage: Boolean(data.next_page),
    };

    this.cache.set(cacheKey, result);

    return result;
  }

  async searchVideos(
    params: VideoSearchParams
  ): Promise<MediaPage> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const cacheKey =
      `video-search:${params.query}:${page}:${perPage}`;

    const cached = this.cache.get<MediaPage>(cacheKey);

    if (cached) {
      return cached;
    }

    const url =
      `${VIDEO_BASE_URL}/search?query=${encodeURIComponent(params.query)}` +
      `&page=${page}&per_page=${perPage}`;

    const data =
      await this.request<PexelsVideoResponse>(url);

    const result: MediaPage = {
      items: data.videos.map((video) =>
        this.mapVideo(video)
      ),
      page: data.page,
      perPage: data.per_page,
      totalResults: data.total_results,
      hasNextPage: Boolean(data.next_page),
    };

    this.cache.set(cacheKey, result);

    return result;
  }

  async getCurated(
    params: PaginationParams = {}
  ): Promise<MediaPage> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const cacheKey = `curated:${page}:${perPage}`;

    const cached = this.cache.get<MediaPage>(cacheKey);

    if (cached) {
      return cached;
    }

    const url =
      `${BASE_URL}/curated?page=${page}&per_page=${perPage}`;

    const data =
      await this.request<PexelsPhotoResponse>(url);

    const result: MediaPage = {
      items: data.photos.map((photo) =>
        this.mapPhoto(photo)
      ),
      page: data.page,
      perPage: data.per_page,
      totalResults: data.total_results,
      hasNextPage: Boolean(data.next_page),
    };

    this.cache.set(cacheKey, result);

    return result;
  }

  async getById(id: number): Promise<MediaItem> {
    const cacheKey = `photo:${id}`;

    const cached = this.cache.get<MediaItem>(cacheKey);

    if (cached) {
      return cached;
    }

    const photo =
      await this.request<PexelsPhoto>(
        `${BASE_URL}/photos/${id}`
      );

    const result = this.mapPhoto(photo);

    this.cache.set(cacheKey, result);

    return result;
  }

  async getVideoById(id: number): Promise<MediaItem> {
    const cacheKey = `video:${id}`;

    const cached = this.cache.get<MediaItem>(cacheKey);

    if (cached) {
      return cached;
    }

    const video =
      await this.request<PexelsVideo>(
        `${VIDEO_BASE_URL}/videos/${id}`
      );

    const result = this.mapVideo(video);

    this.cache.set(cacheKey, result);

    return result;
  }

  subscribe(listener: MediaEventListener) {
    return this.events.subscribe(listener);
  }

  emitView(mediaId: number) {
    this.events.emit({
      type: "view",
      mediaId,
      timestamp: Date.now(),
    });
  }

  emitDownload(mediaId: number) {
    this.events.emit({
      type: "download",
      mediaId,
      timestamp: Date.now(),
    });
  }
}