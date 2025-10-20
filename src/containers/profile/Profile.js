import { ApolloClient, createHttpLink, gql, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { lazy, Suspense, useEffect, useState } from "react";
import { openSource } from "../../portfolio";
import Contact from "../contact/Contact";
import Loading from "../loading/Loading";

const renderLoader = () => <Loading />;
const GithubProfileCard = lazy(() => import("../../components/githubProfileCard/GithubProfileCard"));
export default function Profile() {
  const [prof, setrepo] = useState([]);
  function setProfileFunction(array) {
    setrepo(array);
  }
  function getProfileData() {
    const token = openSource.githubConvertedToken;
    if (!token) {
      console.warn(
        "GitHub: REACT_APP_GITHUB_TOKEN not found. Showing Contact section instead of GitHub profile. Add a minimal read-only token to .env files before build.",
      );
      setProfileFunction("Error");
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
        setProfileFunction(result.data.user);
      })
      .catch((error) => {
        console.log(error);
        setProfileFunction("Error");
        console.log("Because of this Error Contact Section is Showed instead of Profile");
        openSource.showGithubProfile = "false";
      });
  }
  useEffect(() => {
    if (openSource.showGithubProfile === "true") {
      getProfileData();
    }
  });
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
