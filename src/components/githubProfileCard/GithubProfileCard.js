import "./GithubProfileCard.css";
import { Fade } from "react-awesome-reveal";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";

export default function GithubProfileCard({ prof }) {
  // Apollo cache objects are frozen in dev; never mutate props. Derive display label.
  const hireableText = prof?.isHireable ? "Yes" : "No";
  const contributions = prof?.contributionsCollection?.contributionCalendar?.weeks || [];
  const totalCommits = prof?.contributionsCollection?.totalCommitContributions || 0;
  const followers = prof?.followers?.totalCount || 0;
  const following = prof?.following?.totalCount || 0;
  const repos = prof?.repositories?.totalCount || 0;
  const prs = prof?.pullRequests?.totalCount || 0;
  const issues = prof?.issues?.totalCount || 0;
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="contact">
        <h1 className="prof-title">Reach Out to me!</h1>
        <div className="row">
          <div className="main-content-profile">
            <div className="blog-header">
              <p className="subTitle blog-subtitle">{contactInfo.subtitle}</p>
            </div>
            {/* Hide GitHub bio per request; show email prominently */}
            <div className="contact-email">
              <span className="desc-prof">Email: {contactInfo.email_address}</span>
            </div>
            {prof.location !== null && (
              <div className="location-div">
                <span className="desc-prof">
                  <svg viewBox="0 0 12 16" version="1.1" width="20" height="18" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"
                    ></path>
                  </svg>
                  {prof.location}
                </span>
              </div>
            )}
            <div className="opp-div">
              <span className="desc-prof">Open for opportunities: {hireableText}</span>
            </div>
            {/* Simple stats row */}
            <div className="gh-stats">
              <span className="desc-prof">Followers: {followers}</span>
              <span className="desc-prof">Following: {following}</span>
              <span className="desc-prof">Repos: {repos}</span>
              <span className="desc-prof">PRs: {prs}</span>
              <span className="desc-prof">Issues: {issues}</span>
              <span className="desc-prof">Commits (year): {totalCommits}</span>
            </div>
            {/* Minimal contribution heatmap (compact) */}
            <section className="gh-heatmap" aria-label="GitHub contribution calendar">
              {contributions.map((week, wi) => (
                // each week is ~7 days
                <div key={wi} className="gh-heatmap-week">
                  {week.contributionDays.map((d, di) => (
                    <span
                      key={di}
                      className="gh-heatmap-day"
                      title={`${d.date}: ${d.contributionCount} contributions`}
                      style={{ backgroundColor: d.color }}
                    />
                  ))}
                </div>
              ))}
            </section>
            <SocialMedia />
          </div>
          <div className="image-content-profile">
            <img src={prof.avatarUrl} alt={prof.name} className="profile-image" />
          </div>
        </div>
      </div>
    </Fade>
  );
}
