import React from "react";
import "./index.css";
import posthog from "posthog-js";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST;

// Initialize PostHog vanilla SDK (avoid react wrapper to silence source-map warnings)
if (POSTHOG_KEY && POSTHOG_HOST) {
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
      if (process.env.NODE_ENV === "development") {
        ph.debug(true);
      }
      ph.startSessionRecording?.();
    },
  });
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
