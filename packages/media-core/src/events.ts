export type MediaEventType = "view" | "download";

export interface MediaEvent {
  type: MediaEventType;
  mediaId: number;
  timestamp: number;
}

export type MediaEventListener = (event: MediaEvent) => void;

export class MediaEventEmitter {
  private listeners = new Set<MediaEventListener>();

  subscribe(listener: MediaEventListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(event: MediaEvent) {
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }
}