import React from "react";
import "./index.css";
import posthog from "posthog-js";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST;

// Debug logging - always log to help troubleshoot
console.log("=== PostHog Initialization ===");
console.log("Environment:", process.env.NODE_ENV);
console.log("Hostname:", window.location.hostname);
console.log("Has Key:", !!POSTHOG_KEY);
console.log("Key Preview:", POSTHOG_KEY ? POSTHOG_KEY.substring(0, 10) + "..." : "MISSING");
console.log("Host:", POSTHOG_HOST || "MISSING");

if (process.env.NODE_ENV === "production" && !POSTHOG_KEY) {
  console.warn("PostHog: REACT_APP_POSTHOG_KEY is missing in production build. Analytics will be disabled.");
}

// Initialize PostHog vanilla SDK (avoid react wrapper to silence source-map warnings)
if (POSTHOG_KEY && POSTHOG_HOST) {
  console.log("Initializing PostHog...");
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    session_recording: {
      maskAllInputs: false,
      maskText: false,
      recordCrossOriginIframes: true,
    },
    enable_recording_console_log: true,
    loaded: (ph) => {
      console.log("✅ PostHog LOADED successfully!");
      console.log("User ID:", ph.get_distinct_id());
      if (process.env.NODE_ENV === "development") {
        ph.debug(true);
      }
      ph.startSessionRecording?.();
    },
  });
} else {
  console.error("❌ PostHog NOT initialized - missing required config");
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
