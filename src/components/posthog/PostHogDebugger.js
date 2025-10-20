import posthog from "posthog-js";
import { useEffect, useState } from "react";
import "./PostHogDebugger.css";

/**
 * PostHog Event Debugger Component
 * Shows recent events in development mode
 * Add this component to your app to see events in real-time
 */
export default function PostHogDebugger() {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    // Enable debug mode
    posthog?.debug?.(true);

    // Intercept PostHog capture calls
    if (posthog?.capture) {
      const originalCapture = posthog.capture.bind(posthog);
      posthog.capture = (eventName, properties) => {
        const eventData = {
          name: eventName,
          properties,
          timestamp: new Date().toLocaleTimeString(),
        };

        setEvents((prev) => [eventData, ...prev].slice(0, 10)); // Keep last 10 events

        return originalCapture(eventName, properties);
      };
    }
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      <button
        type="button"
        className="posthog-debug-toggle"
        onClick={() => setIsVisible(!isVisible)}
        title="Toggle PostHog Debugger"
      >
        📊 {events.length}
      </button>

      {isVisible && (
        <div className="posthog-debugger">
          <div className="posthog-debugger-header">
            <h3>PostHog Events</h3>
            <button type="button" onClick={() => setEvents([])}>
              Clear
            </button>
            <button type="button" onClick={() => setIsVisible(false)}>
              ✕
            </button>
          </div>

          <div className="posthog-debugger-info">
            <p>
              <strong>User ID:</strong> {posthog?.get_distinct_id?.()}
            </p>
            <p>
              <strong>Host:</strong> {process.env.REACT_APP_POSTHOG_HOST || "Not configured"}
            </p>
          </div>

          <div className="posthog-debugger-events">
            {events.length === 0 ? (
              <p className="no-events">No events captured yet</p>
            ) : (
              events.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-header">
                    <span className="event-name">{event.name}</span>
                    <span className="event-time">{event.timestamp}</span>
                  </div>
                  {event.properties && (
                    <pre className="event-properties">{JSON.stringify(event.properties, null, 2)}</pre>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="posthog-debugger-actions">
            <button type="button" onClick={() => posthog?.capture?.("test_event", { test: true })}>
              Send Test Event
            </button>
            <button type="button" onClick={() => console.log("PostHog Instance:", posthog)}>
              Log to Console
            </button>
          </div>
        </div>
      )}
    </>
  );
}
