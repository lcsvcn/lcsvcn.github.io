import React from "react";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST;
if (process.env.NODE_ENV === "production" && !POSTHOG_KEY) {
  // Helpful diagnostic in production builds if key wasn't embedded at build time
  // On static hosts (e.g., GitHub Pages) env vars must be present during `bun run build`
  // via .env.production or shell env with REACT_APP_ prefix.
  console.warn("PostHog: REACT_APP_POSTHOG_KEY is missing in production build. Analytics will be disabled.");
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={POSTHOG_KEY}
      options={{
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only", // or "always" to create profiles for anonymous users
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        // Session replay configuration
        session_recording: {
          maskAllInputs: false,
          maskText: false,
          recordCrossOriginIframes: true,
        },
        enable_recording_console_log: true,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            posthog.debug(true);
            console.log("🚀 PostHog loaded successfully!");
            console.log("User ID:", posthog.get_distinct_id());
          }
          // Ensure session recording starts when library loads
          if (posthog?.startSessionRecording) {
            posthog.startSessionRecording();
          }
        },
      }}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
