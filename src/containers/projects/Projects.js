import { ApolloClient, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import "./Project.css";
import Button from "../../components/button/Button";
import { openSource, socialMediaLinks } from "../../portfolio";
import Loading from "../loading/Loading";

const CACHE_KEY = `gh:pinned:v1:${openSource.githubUserName}`;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getRepoData(callback) {
  // Try cache first to avoid unnecessary API calls/rate-limit
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw);
      if (cached?.ts && Date.now() - cached.ts < CACHE_TTL_MS && Array.isArray(cached?.data)) {
        callback(cached.data);
        return; // Use cache and stop here
      }
    }
  } catch (_) {
    // ignore cache errors
  }
  const token = openSource.githubConvertedToken;
  if (!token) {
    console.warn("GitHub: REACT_APP_GITHUB_TOKEN not found. Using cached data if available; skipping fetch.");
    // If we didn't early return from cache above, return Error to hide section
    callback("Error");
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
      user(login: "${openSource.githubUserName}") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          totalCount
          edges {
            node {
              ... on Repository {
                name
                description
                forkCount
                stargazers {
                  totalCount
                }
                url
                id
                diskUsage
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
      `,
    })
    .then((result) => {
      const edges = result.data.user.pinnedItems.edges;
      callback(edges);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: edges }));
      } catch (_) {
        // ignore quota/storage errors
      }
    })
    .catch((error) => {
      console.log(error);
      // On error, try to serve stale cache
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          if (cached && Array.isArray(cached.data)) {
            callback(cached.data);
            return;
          }
        }
      } catch (_) {}
      callback("Error");
      console.log(
        "Because of this Error, nothing is shown in place of Projects section. Projects section not configured",
      );
    });
}

const FailedLoading = () => null;
const renderLoader = () => <Loading />;

export default function Projects() {
  const GithubRepoCard = lazy(() => import("../../components/githubRepoCard/GithubRepoCard"));
  const [repo, setrepo] = useState([]);
  const [loading, setLoading] = useState(true);

  const setrepoFunction = useCallback((array) => {
    setrepo(array);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getRepoData(setrepoFunction);
  }, [setrepoFunction]);

  if (loading) {
    return renderLoader();
  }

  if (!(typeof repo === "string" || repo instanceof String) && Array.isArray(repo) && repo.length > 0) {
    return (
      <Suspense fallback={renderLoader()}>
        <div className="main" id="opensource">
          <h1 className="project-title">Open Source Projects</h1>
          <div className="repo-cards-div-main">
            {repo.map((v, _i) => {
              return <GithubRepoCard repo={v} key={v.node.id} />;
            })}
          </div>
          <Button text={"More Projects"} className="project-button" href={socialMediaLinks.github} newTab={true} />
        </div>
      </Suspense>
    );
  } else {
    return <FailedLoading />;
  }
}
