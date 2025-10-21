import "./GithubProfileCard.css";
import { useEffect, useMemo, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";

export default function GithubProfileCard({ prof }) {
  // Apollo cache objects are frozen in dev; never mutate props.
  const contributions = prof?.contributionsCollection?.contributionCalendar?.weeks || [];
  const totalCommits = prof?.contributionsCollection?.totalCommitContributions || 0;
  const followers = prof?.followers?.totalCount || 0;
  const following = prof?.following?.totalCount || 0;
  const repos = prof?.repositories?.totalCount || 0;
  const prs = prof?.pullRequests?.totalCount || 0;
  const issues = prof?.issues?.totalCount || 0;

  // Determine intensity level (0-4) per day from contributionCount using GitHub-like bucketizing
  const levelWeeks = useMemo(() => {
    // Compute global max to scale buckets when counts are low
    let max = 0;
    for (const w of contributions) {
      for (const d of w.contributionDays) max = Math.max(max, d.contributionCount || 0);
    }
    // Avoid divide by zero; if max is 0 all are level 0
    const buckets = (count) => {
      if (!max || count <= 0) return 0;
      const q = count / max; // 0..1
      if (q > 0.8) return 4;
      if (q > 0.6) return 3;
      if (q > 0.35) return 2;
      return 1;
    };
    return contributions.map((w) => ({
      contributionDays: w.contributionDays.map((d) => ({
        ...d,
        level: buckets(d.contributionCount || 0),
      })),
    }));
  }, [contributions]);

  const heatmapRef = useRef(null);

  // Responsively grow cell size to fill width (never below 12px)
  useEffect(() => {
    function resizeCells() {
      const el = heatmapRef.current;
      if (!el) return;
      const weeks = levelWeeks.length || 52;
      const gap = 2; // match CSS gap
      const width = el.clientWidth || el.getBoundingClientRect().width || 0;
      if (!width || !weeks) return;
      const cell = Math.max(12, Math.floor((width - (weeks - 1) * gap) / weeks));
      el.style.setProperty("--gh-cell-size", `${cell}px`);
    }
    resizeCells();
    window.addEventListener("resize", resizeCells);
    return () => window.removeEventListener("resize", resizeCells);
  }, [levelWeeks]);

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
            <div className="activity-card">
              <div className="activity-card-content">
                <div className="activity-card-main">
                  <h3 className="activity-title">GitHub Activity</h3>
                  {/* Minimal contribution heatmap (compact) */}
                  <section ref={heatmapRef} className="gh-heatmap" aria-label="GitHub contribution calendar">
                    {levelWeeks.map((week, wi) => (
                      <div key={wi} className="gh-heatmap-week">
                        {week.contributionDays.map((d, di) => (
                          <span
                            key={di}
                            className={`gh-heatmap-day level-${d.level}`}
                            title={`${d.date}: ${d.contributionCount} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </section>
                  {/* Stats grid with emphasized values */}
                  <div className="gh-stats">
                    <div className="gh-stat">
                      <div className="gh-stat-value">{followers}</div>
                      <div className="gh-stat-label">Followers</div>
                    </div>
                    <div className="gh-stat">
                      <div className="gh-stat-value">{following}</div>
                      <div className="gh-stat-label">Following</div>
                    </div>
                    <div className="gh-stat">
                      <div className="gh-stat-value">{repos}</div>
                      <div className="gh-stat-label">Repos</div>
                    </div>
                    <div className="gh-stat">
                      <div className="gh-stat-value">{prs}</div>
                      <div className="gh-stat-label">PRs</div>
                    </div>
                    <div className="gh-stat">
                      <div className="gh-stat-value">{issues}</div>
                      <div className="gh-stat-label">Issues</div>
                    </div>
                    <div className="gh-stat gh-stat-accent">
                      <div className="gh-stat-value">{totalCommits}</div>
                      <div className="gh-stat-label">Commits (year)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SocialMedia />
          </div>
          {/* Avatar moved inside activity card */}
        </div>
      </div>
    </Fade>
  );
}
