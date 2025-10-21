import { ApolloClient, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { openSource } from "../../portfolio";
import Contact from "../contact/Contact";
import Loading from "../loading/Loading";

const renderLoader = () => <Loading />;
const GithubProfileCard = lazy(() => import("../../components/githubProfileCard/GithubProfileCard"));
export default function Profile() {
  const [prof, setrepo] = useState([]);
  const fetchedRef = useRef(false);
  // TTL constant is stable and used inside the effect
  const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    if (openSource.showGithubProfile !== "true") return;

    // Cache key based on current configured username
    const CACHE_KEY = `gh:profile:v1:${openSource.githubUserName}`;

    // Try cache first
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached?.ts && Date.now() - cached.ts < CACHE_TTL_MS && cached?.data) {
          setrepo(cached.data);
          return;
        }
      }
    } catch (_) {}

    const token = openSource.githubConvertedToken;
    if (!token) {
      console.warn(
        "GitHub: REACT_APP_GITHUB_TOKEN not found. Using cached profile if available; otherwise showing Contact.",
      );
      setrepo("Error");
      openSource.showGithubProfile = "false";
      return;
    }

    const httpLink = createHttpLink({ uri: "https://api.github.com/graphql" });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
      {
        user(login:"${openSource.githubUserName}") {
          name
          isHireable
          avatarUrl
          location
          followers { totalCount }
          following { totalCount }
          repositories(privacy: PUBLIC, isFork: false) { totalCount }
          pullRequests { totalCount }
          issues { totalCount }
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                  weekday
                }
              }
            }
          }
        }
    }
      `,
      })
      .then((result) => {
        const user = result.data.user;
        setrepo(user);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: user }));
        } catch (_) {}
      })
      .catch((error) => {
        console.log(error);
        // On error, try stale cache
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const cached = JSON.parse(raw);
            if (cached?.data) {
              setrepo(cached.data);
              return;
            }
          }
        } catch (_) {}
        setrepo("Error");
        console.log("Because of this Error Contact Section is Showed instead of Profile");
        openSource.showGithubProfile = "false";
      });
  }, []);
  if (openSource.showGithubProfile === "true" && !(typeof prof === "string" || prof instanceof String)) {
    return (
      <Suspense fallback={renderLoader()}>
        <GithubProfileCard prof={prof} key={prof.id} />
      </Suspense>
    );
  } else {
    return <Contact />;
  }
}
