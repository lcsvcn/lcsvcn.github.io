import { ApolloClient, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import "./Project.css";
import Button from "../../components/button/Button";
import { openSource, socialMediaLinks } from "../../portfolio";
import Loading from "../loading/Loading";

function getRepoData(callback) {
  const token = openSource.githubConvertedToken;
  if (!token) {
    console.warn(
      "GitHub: REACT_APP_GITHUB_TOKEN not found. Skipping Open Source projects fetch. Provide a read-only token in .env.development/.env.production before building.",
    );
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
      callback(result.data.user.pinnedItems.edges);
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
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

  const setrepoFunction = useCallback((array) => {
    setrepo(array);
  }, []);

  useEffect(() => {
    getRepoData(setrepoFunction);
  }, [setrepoFunction]);

  if (!(typeof repo === "string" || repo instanceof String)) {
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
