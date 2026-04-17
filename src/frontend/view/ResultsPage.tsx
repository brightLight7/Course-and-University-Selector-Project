import type { RecommendationSet, CourseRecommendation, UniversityRecommendation } from "../types/recommendations";

type ResultsPageProps = {
  results: RecommendationSet;
  onAdjustPreferences: () => void;
  onCreateAccountLogin: () => void;
  onMoreInfo: (item: CourseRecommendation | UniversityRecommendation) => void;
  onStartAgain: () => void;
};

export function ResultsPage({
  results,
  onAdjustPreferences,
  onCreateAccountLogin,
  onMoreInfo,
  onStartAgain,
}: ResultsPageProps) {
  const tierLabels = ["Best Match", "Strong Alternative", "Worth Considering"];

  return (
    <section id="results-page">
      <h1 id="results-title">Your Top Recommendations</h1>
      <p id="results-subtitle">
        These results are temporary. Create an account or log in if you want to
        save them.
      </p>
      <p id="results-reassurance">
        These recommendations are here to guide your decision, not make it for you. Use them as a starting point for your research.
      </p>

      <h2 className="results-section-title">
        Our 3 Course Recommendations for you
      </h2>
      <div className="results-grid">
        {results.recommendedCourses.map((course, index) => (
          <article className="result-card" key={course.courseName}>
            <span className="result-card-tier">{tierLabels[index]}</span>
            <h3>{course.courseName}</h3>
            <p>{course.universityName}</p>
            <p>Suitability: {course.suitabilityScore}%</p>
            <p>{course.explanation}</p>
            <button type="button" className="result-card-more-btn" onClick={() => onMoreInfo(course)}>
              More Information
            </button>
          </article>
        ))}
      </div>

      <h2 className="results-section-title">
        Our 3 University Recommendations for you
      </h2>
      <div className="results-grid">
        {results.recommendedUniversities.map((uni, index) => (
          <article className="result-card" key={uni.universityName}>
            <span className="result-card-tier">{tierLabels[index]}</span>
            <h3>{uni.universityName}</h3>
            <p>Suitability: {uni.suitabilityScore}%</p>
            <p>{uni.explanation}</p>
            <button type="button" className="result-card-more-btn" onClick={() => onMoreInfo(uni)}>
              More Information
            </button>
          </article>
        ))}
      </div>

      <p id="results-last-updated">Course and university data last updated: April 2026.</p>

      <div id="results-actions">
        <button
          id="results-login-button"
          type="button"
          onClick={onCreateAccountLogin}
        >
          Create an Account / Login
        </button>

        <button
          id="results-adjust-button"
          type="button"
          onClick={onAdjustPreferences}
        >
          Adjust Preferences
        </button>

        <button
          id="results-start-again-button"
          type="button"
          onClick={onStartAgain}
        >
          Start Again
        </button>
      </div>
    </section>
  );
}
