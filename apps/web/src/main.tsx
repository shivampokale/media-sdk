import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MediaProvider } from "@media-sdk/media-react";
import "./index.css";
import App from "./App.tsx";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MediaProvider apiKey={apiKey}>
      <App />
    </MediaProvider>
  </StrictMode>
);