import posthog from "posthog-js";
import { useEffect } from "react";

// Lightweight hash for stable identifiers (base36 for brevity)
const __phHash = (input) => {
  try {
    let h = 0;
    const s = String(input || "");
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0; // 32-bit int
    }
    return Math.abs(h).toString(36);
  } catch {
    return undefined;
  }
};

/**
 * PostHog Event Tracker Hook
 *
 * Usage:
 * const trackEvent = usePostHogTracker();
 * trackEvent('button_clicked', { buttonName: 'Sign Up' });
 */
export const usePostHogTracker = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 PostHog Debug Mode Enabled");
      console.log("PostHog User ID:", posthog?.get_distinct_id());
      console.log("PostHog Instance:", posthog);
    }
  }, []);

  const trackEvent = (eventName, properties = {}) => {
    if (!posthog) {
      console.warn("⚠️ PostHog not initialized");
      return;
    }

    posthog.capture(eventName, properties);

    if (process.env.NODE_ENV === "development") {
      console.log("📊 Event Tracked:", {
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
        userId: posthog.get_distinct_id(),
      });
    }
  };

  return trackEvent;
};

/**
 * PostHog Page View Tracker
 * Automatically tracks page views when the component mounts
 */
export const usePostHogPageView = (pageName) => {
  useEffect(() => {
    if (posthog && pageName) {
      posthog.capture("$pageview", {
        page: pageName,
        path: window.location.pathname,
      });

      if (process.env.NODE_ENV === "development") {
        console.log("📄 Page View Tracked:", {
          page: pageName,
          path: window.location.pathname,
        });
      }
    }
  }, [pageName]);
};

/**
 * PostHog Identity Setter
 * Use this to identify users with their email or ID
 */
export const usePostHogIdentify = () => {
  const identify = (userId, userProperties = {}) => {
    if (!posthog) {
      console.warn("⚠️ PostHog not initialized");
      return;
    }

    posthog.identify(userId, userProperties);

    if (process.env.NODE_ENV === "development") {
      console.log("👤 User Identified:", {
        userId,
        properties: userProperties,
      });
    }
  };

  return identify;
};

/**
 * Manual PostHog Debug Toggle
 * Call this in console to enable/disable debug mode
 */
export const togglePostHogDebug = (enabled = true) => {
  if (window.posthog) {
    window.posthog.debug(enabled);
    console.log(`🔍 PostHog Debug Mode ${enabled ? "Enabled" : "Disabled"}`);
  } else {
    console.warn("⚠️ PostHog not found on window object");
  }
};

// Expose debug function globally for console access
if (typeof window !== "undefined") {
  window.togglePostHogDebug = togglePostHogDebug;
}

/**
 * Global click tracker
 * - Captures clicks on <a>, <button>, and elements with role="button"
 * - Records basic context: text, href, id, classes
 */
export const usePostHogClickTracking = () => {
  useEffect(() => {
    if (!posthog) return;
    const handler = (e) => {
      const target = e.target.closest("a, button, [role=button]");
      if (!target) return;
      // Preferred explicit analytics id, then DOM id
      const phId =
        target.getAttribute("data-ph-id") ||
        target.getAttribute("data-analytics-id") ||
        target.dataset?.phId ||
        undefined;
      const domId = target.id || undefined;
      // Human-readable action label
      const label =
        target.getAttribute("data-action") ||
        target.getAttribute("aria-label") ||
        target.getAttribute("name") ||
        (target.innerText || target.value || "").trim();
      const href = target.tagName === "A" ? target.getAttribute("href") : undefined;
      // Stable action identifier (deterministic)
      const actionId = __phHash(
        [
          "v1", // version for future-proofing
          phId || "",
          domId || "",
          target.tagName || "",
          target.getAttribute("role") || "",
          href || "",
          label || "",
          window.location.pathname || "",
        ].join("|"),
      );
      const payload = {
        tag: target.tagName,
        role: target.getAttribute("role") || undefined,
        id: domId, // keep existing field for backward compatibility
        ph_id: phId || undefined,
        action: label ? label.slice(0, 120) : undefined,
        action_id: actionId,
        classes: target.className || undefined,
        text: (target.innerText || "").trim().slice(0, 120),
        href,
        path: window.location.pathname,
      };
      posthog.capture("ui_click", payload);
      if (process.env.NODE_ENV === "development") {
        console.log("🖱️ Click tracked", payload);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
};

/**
 * Scroll depth tracker
 * - Emits events when the user reaches 25%, 50%, 75%, and 100% of page scroll
 */
export const usePostHogScrollDepth = () => {
  useEffect(() => {
    if (!posthog) return;
    const milestones = new Set([25, 50, 75, 100]);
    const seen = new Set();

    const getScrollPercent = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return 100;
      return Math.min(100, Math.round((scrollTop / docHeight) * 100));
    };

    const onScroll = () => {
      const pct = getScrollPercent();
      for (const m of milestones) {
        if (pct >= m && !seen.has(m)) {
          seen.add(m);
          posthog.capture("scroll_depth", { milestone: m, path: window.location.pathname });
          if (process.env.NODE_ENV === "development") {
            console.log("📏 Scroll depth milestone", m);
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once in case of short pages
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
};

/**
 * Session recording controls
 * Helpers to start/stop or conditionally enable recording
 */
export const startSessionRecording = () => {
  if (window?.posthog?.startSessionRecording) {
    window.posthog.startSessionRecording();
    if (process.env.NODE_ENV === "development") console.log("🎥 Session recording started");
  }
};

export const stopSessionRecording = () => {
  if (window?.posthog?.stopSessionRecording) {
    window.posthog.stopSessionRecording();
    if (process.env.NODE_ENV === "development") console.log("🛑 Session recording stopped");
  }
};

/**
 * usePostHogSessionRecording
 * - Pass a boolean or function to control whether session recording is enabled
 * Example: usePostHogSessionRecording(() => !location.pathname.startsWith('/payment'))
 */
export const usePostHogSessionRecording = (enabledOrFn = true) => {
  useEffect(() => {
    if (!posthog) return;
    const enabled = typeof enabledOrFn === "function" ? !!enabledOrFn() : !!enabledOrFn;
    if (enabled) {
      posthog.startSessionRecording?.();
    } else {
      posthog.stopSessionRecording?.();
    }
  }, [enabledOrFn]);
};
