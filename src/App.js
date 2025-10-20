import "./App.css";
import PostHogDebugger from "./components/posthog/PostHogDebugger";
import Main from "./containers/Main";
import { usePostHogClickTracking, usePostHogScrollDepth } from "./hooks/usePostHog";

function App() {
  // Global analytics trackers
  usePostHogClickTracking();
  usePostHogScrollDepth();
  return (
    <div>
      <Main />
      <PostHogDebugger />
    </div>
  );
}

export default App;
