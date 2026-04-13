import type { RecommendationSet, CourseRecommendation, UniversityRecommendation } from "../types/recommendations";

type ResultsPageProps = {
  results: RecommendationSet;
  onAdjustPreferences: () => void;
  onCreateAccountLogin: () => void;
  onMoreInfo: (item: CourseRecommendation | UniversityRecommendation) => void;
};

export function ResultsPage({
  results,
  onAdjustPreferences,
  onCreateAccountLogin,
  onMoreInfo,
}: ResultsPageProps) {
  return (
    <section id="results-page">
      <h1 id="resultsPage-title">Your Top Recommendations</h1>
      <p id="resultsPage-subtitle">
        These results are temporary. Create an account or log in if you want to
        save them.
      </p>

      <h2 className="results_Section-title">
        Our 3 Course Recommendations for you
      </h2>
      <div className="results-grid">
        {results.recommendedCourses.map((course) => (
          <article className="result-card" key={course.courseName}>
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

      <h2 className="results_Section-title">
        Our 3 University Recommendations for you
      </h2>
      <div className="results-grid">
        {results.recommendedUniversities.map((uni) => (
          <article className="result-card" key={uni.universityName}>
            <h3>{uni.universityName}</h3>
            <p>Suitability: {uni.suitabilityScore}%</p>
            <p>{uni.explanation}</p>
            <button type="button" className="result-card-more-btn" onClick={() => onMoreInfo(uni)}>
              More Information
            </button>
          </article>
        ))}
      </div>

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
      </div>
    </section>
  );
}
