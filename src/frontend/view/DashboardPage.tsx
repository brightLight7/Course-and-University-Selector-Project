export type SavedResult = {
  attemptId: number;
  courses: string[];
  universities: string[];
};

type DashboardPageProps = {
  firstName: string;
  savedResults: SavedResult[];
  onViewResults: (attemptId: number) => void;
  onAdjustPreferences: (attemptId: number) => void;
  onNewQuiz: () => void;
};

export function DashboardPage({
  firstName,
  savedResults,
  onViewResults,
  onAdjustPreferences,
  onNewQuiz,
}: DashboardPageProps) {
  return (
    <section id="dashboard-page">
      <h1 id="dashboard-name">Welcome, {firstName}</h1>

      <div id="dashboard-saves">
        {savedResults.map((save, index) => (
          <article className="save-card" key={save.attemptId}>
            <h2 className="save-card-title">Save {index + 1}</h2>
            <p className="save-card-detail">
              Courses: {save.courses.join(", ")}
            </p>
            <p className="save-card-detail">
              Universities: {save.universities.join(", ")}
            </p>
            <div className="save-card-actions">
              <button
                type="button"
                className="save-card-btn"
                onClick={() => onViewResults(save.attemptId)}
              >
                View Results
              </button>
              <button
                type="button"
                className="save-card-btn"
                onClick={() => onAdjustPreferences(save.attemptId)}
              >
                Adjust Preferences
              </button>
            </div>
          </article>
        ))}
      </div>

      <button id="dashboard-new-quiz-btn" type="button" onClick={onNewQuiz}>
        New Quiz
      </button>
    </section>
  );
}
