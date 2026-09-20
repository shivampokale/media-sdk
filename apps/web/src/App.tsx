import { useEffect, useState } from "react";

import {
  useMediaSearch,
  useVideoSearch,
  useCuratedMedia,
  useMediaClient,
} from "@media-sdk/media-react";

import {
  useMediaGrid,
  useLightbox,
  useReelSwiper,
} from "@media-sdk/media-ui-react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [showReels, setShowReels] = useState(false);
  const [showCurated, setShowCurated] = useState(false);

  const client = useMediaClient();

  useEffect(() => {
    const unsubscribe = client.subscribe((event) => {
      console.log("[app event]", event);
    });

    return unsubscribe;
  }, [client]);

  const {
    items,
    loading,
    error,
    hasMore,
    search,
    loadMore,
  } = useMediaSearch();

  const {
    videos,
    loading: videosLoading,
    error: videosError,
    searchVideos,
  } = useVideoSearch();

  const {
    items: curatedItems,
    loading: curatedLoading,
    error: curatedError,
    hasMore: curatedHasMore,
    loadCurated,
    loadMoreCurated,
  } = useCuratedMedia();

  const displayedItems = showCurated
    ? curatedItems
    : items;

  const { getLoadMoreProps } = useMediaGrid({
    hasMore: showCurated ? curatedHasMore : hasMore,
    loading: showCurated ? curatedLoading : loading,
    onLoadMore: showCurated
      ? loadMoreCurated
      : loadMore,
  });

  const {
    isOpen,
    activeItem,
    open,
    close,
    next,
    previous,
    getDialogProps,
  } = useLightbox({
    items: displayedItems,
  });

  const {
    activeIndex,
    getContainerProps,
    getItemProps,
  } = useReelSwiper();

  useEffect(() => {
    if (!showReels || videos.length === 0) return;

    const activeVideo = videos[activeIndex];

    if (activeVideo) {
      client.emitView(activeVideo.id);
    }
  }, [activeIndex, showReels, videos, client]);

  const handleSearch = () => {
    if (!searchText.trim()) return;

    setShowReels(false);
    setShowCurated(false);

    search(searchText);
  };

  const handleCurated = () => {
    setShowReels(false);
    setShowCurated(true);

    loadCurated();
  };

  const handleReels = () => {
    if (!searchText.trim()) return;

    setShowCurated(false);
    setShowReels(true);

    searchVideos(searchText);
  };

  const handleOpenPhoto = (index: number) => {
    open(index);

    const item = displayedItems[index];

    client.emitView(item.id);
  };

  const handleDownload = () => {
    if (!activeItem) return;

    client.emitDownload(activeItem.id);

    window.open(activeItem.mediaUrl, "_blank");
  };

  const handleVideoDownload = (index: number) => {
    const video = videos[index];

    if (!video) return;

    client.emitDownload(video.id);

    window.open(video.mediaUrl, "_blank");
  };

  if (showReels) {
    return (
      <div>
        <button onClick={() => setShowReels(false)}>
          Back to Photos
        </button>

        {videosLoading && <p>Loading videos...</p>}

        {videosError && <p>{videosError}</p>}

        <div
          {...getContainerProps()}
          style={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
          }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              {...getItemProps(index)}
              style={{
                height: "100vh",
                scrollSnapAlign: "start",
              }}
            >
              <video
                src={video.mediaUrl}
                controls
                muted
                style={{
                  width: "100%",
                  height: "90%",
                  objectFit: "contain",
                }}
              />

              <button
                onClick={() =>
                  handleVideoDownload(index)
                }
              >
                Download
              </button>

              {activeIndex === index && (
                <p>Active Reel</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Media Search</h1>

      <input
        type="text"
        placeholder="Search media..."
        value={searchText}
        onChange={(event) =>
          setSearchText(event.target.value)
        }
      />

      <button
        onClick={handleSearch}
        disabled={loading}
      >
        Search Photos
      </button>

      <button
        onClick={handleCurated}
        disabled={curatedLoading}
      >
        Curated Photos
      </button>

      <button
        onClick={handleReels}
        disabled={videosLoading}
      >
        Search Reels
      </button>

      {error && <p>{error}</p>}
      {curatedError && <p>{curatedError}</p>}

      <div>
        {displayedItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() =>
              handleOpenPhoto(index)
            }
          >
            <img
              src={item.thumbnailUrl}
              alt={item.title || "Media"}
              width="250"
            />

            <p>{item.photographer}</p>
          </button>
        ))}
      </div>

      {(loading || curatedLoading) && (
        <p>Loading...</p>
      )}

      {(showCurated
        ? curatedHasMore
        : hasMore) && (
        <div {...getLoadMoreProps()}>
          Load more...
        </div>
      )}

      {isOpen && activeItem && (
        <div
          {...getDialogProps()}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
            }}
          >
            Close
          </button>

          <button onClick={previous}>
            Previous
          </button>

          <img
            src={activeItem.mediaUrl}
            alt={activeItem.title || "Media"}
            style={{
              maxWidth: "80%",
              maxHeight: "80vh",
            }}
          />

          <button onClick={handleDownload}>
            Download
          </button>

          <button onClick={next}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;