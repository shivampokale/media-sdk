export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  src: {
    medium: string;
    large: string;
  };
}

export interface PexelsPhotoResponse {
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  photos: PexelsPhoto[];
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  image: string;
  user?: {
    name: string;
  };
  video_files?: Array<{
    link: string;
  }>;
}

export interface PexelsVideoResponse {
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  videos: PexelsVideo[];
}