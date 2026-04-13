import type { CourseRecommendation, UniversityRecommendation } from "../types/recommendations";

type DetailPageProps = {
  item: CourseRecommendation | UniversityRecommendation;
  onBack: () => void;
};

function isCourse(item: CourseRecommendation | UniversityRecommendation): item is CourseRecommendation {
  return "courseName" in item;
}

export function DetailPage({ item, onBack }: DetailPageProps) {
  const title = isCourse(item) ? item.courseName : item.universityName;
  const subtitle = isCourse(item) ? item.universityName : null;

  return (
    <section id="detail-page">
      <h1 id="detail-title">{title}</h1>
      {subtitle && <h2 id="detail-subtitle">{subtitle}</h2>}

      <p id="detail-score">Suitability Score: {item.suitabilityScore}%</p>

      <div id="detail-summary">
        <h3>Summary</h3>
        <p>{item.explanation}</p>
      </div>

      <div id="detail-breakdown">
        <h3>Why this is a great match for you</h3>
        <p>{item.detailedExplanation}</p>
      </div>

      <button id="detail-back-button" type="button" onClick={onBack}>
        ← Back to Results
      </button>
    </section>
  );
}
