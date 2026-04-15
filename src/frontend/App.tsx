import { useState, useEffect } from "react";
import { pageNavigationController } from "./controller/pageNavigationController";
import { Question1Form } from "./view/question-pages/Question1Form";
import { Question2Form } from "./view/question-pages/Question2Form";
import { Question3Form } from "./view/question-pages/Question3Form";
import { Question4Form } from "./view/question-pages/Question4Form";
import { Question5Form } from "./view/question-pages/Question5Form";
import { Question6Form } from "./view/question-pages/Question6Form";
import { Question7Form } from "./view/question-pages/Question7Form";
import { Question8Form } from "./view/question-pages/Question8Form";
import { Question9Form } from "./view/question-pages/Question9Form";
import { Question10Form } from "./view/question-pages/Question10Form";
import { HomePage } from "./view/HomePage";
import type { RecommendationSet, CourseRecommendation, UniversityRecommendation } from "./types/recommendations";
import { generateRecommendations, saveResults } from "./services/recommendations";
import { login, signUp, fetchUserSaves } from "./services/auth";
import { LoadingScreen } from "./view/LoadingScreen";
import { ResultsPage } from "./view/ResultsPage";
import { DetailPage } from "./view/DetailPage";
import { AuthPage } from "./view/AuthPage";
import { DashboardPage } from "./view/DashboardPage";
import type { SavedResult } from "./view/DashboardPage";

type FormData = {
  question1Answer: string;
  question2Answer: string;
  question3Answer: string;
  question4Answer: string;
  question5Answer: string;
  question6Answer: string;
  question7Answer: string;
  question8Answer: string;
  question9Answer: string;
  question10Answer: string[];
};

const INITIAL_DATA: FormData = {
  question1Answer: "",
  question2Answer: "",
  question3Answer: "",
  question4Answer: "",
  question5Answer: "",
  question6Answer: "",
  question7Answer: "",
  question8Answer: "",
  question9Answer: "",
  question10Answer: [],
};

function App() {
  const ANSWERS_KEY = "quiz_answers";
  const RESULTS_KEY = "quiz_results";

  const [data, setData] = useState<FormData>(() => {
    const saved = sessionStorage.getItem(ANSWERS_KEY);
    return saved ? (JSON.parse(saved) as FormData) : INITIAL_DATA;
  });

  const [screen, setScreen] = useState<"home" | "quiz" | "loading" | "results" | "detail" | "auth" | "dashboard">(
    "home",
  );

  const [selectedItem, setSelectedItem] = useState<CourseRecommendation | UniversityRecommendation | null>(null);

  const [results, setResults] = useState<RecommendationSet | null>(() => {
    const saved = sessionStorage.getItem(RESULTS_KEY);
    return saved ? (JSON.parse(saved) as RecommendationSet) : null;
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);

  useEffect(() => {
    sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (results) {
      sessionStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    }
  }, [results]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, isFirstStep, isLastStep, back, next, goTo } =
    pageNavigationController(new Array(10).fill(null));

  const formActions = (
    <>
      <button
        id="back-button"
        type="button"
        onClick={() => {
          if (isFirstStep) {
            setScreen("home");
            return;
          }

          back();
        }}
      >
        Back
      </button>
      <button id="forward-button" type="submit">
        {isLastStep ? "Finish" : "Next"}
      </button>
    </>
  );

  const steps = [
    <Question1Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question2Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question3Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question4Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question5Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question6Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question7Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question8Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question9Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
    <Question10Form
      {...data}
      updateFields={updateFields}
      actions={formActions}
    />,
  ];

  const step = steps[currentStepIndex];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLastStep) {
      next();
      return;
    }

    setSubmissionError(null);
    setScreen("loading");

    try {
      const generatedResults = await generateRecommendations(data);
      setResults(generatedResults);
      setScreen("results");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not generate recommendations right now.";

      setSubmissionError(message);
      setScreen("quiz");
    }
  }

  function handleMoreInfo(item: CourseRecommendation | UniversityRecommendation) {
    setSelectedItem(item);
    setScreen("detail");
  }

  function handleAdjustPreferences() {
    setScreen("quiz");
    goTo(0);
  }

async function saveSessionResults(id: number): Promise<void> {
    const raw = sessionStorage.getItem(RESULTS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as RecommendationSet;
    await saveResults(parsed, id);
    sessionStorage.removeItem(RESULTS_KEY);
    sessionStorage.removeItem(ANSWERS_KEY);
  }

  async function handleLogin(email: string, password: string): Promise<void> {
    const user = await login(email, password);
    setFirstName(user.firstName);
    setUserId(user.userId);
    await saveSessionResults(user.userId);
    const saves = await fetchUserSaves(user.userId);
    setSavedResults(saves);
    setScreen("dashboard");
  }

  async function handleSignUp(newFirstName: string, email: string, password: string): Promise<void> {
    const user = await signUp(newFirstName, email, password);
    setFirstName(user.firstName);
    setUserId(user.userId);
    await saveSessionResults(user.userId);
    const saves = await fetchUserSaves(user.userId);
    setSavedResults(saves);
    setScreen("dashboard");
  }

  async function handleCreateAccountLogin() {
    if (userId && results) {
      await saveResults(results, userId);
      const saves = await fetchUserSaves(userId);
      setSavedResults(saves);
      sessionStorage.removeItem(RESULTS_KEY);
      sessionStorage.removeItem(ANSWERS_KEY);
      setScreen("dashboard");
    } else {
      setScreen("auth");
    }
  }

  if (screen === "home") {
    return (
      <div id="app-container">
        <HomePage onStart={() => setScreen("quiz")} onLogin={() => setScreen("auth")} />
      </div>
    );
  }
  if (screen === "auth") {
    return (
      <div id="app-container">
        <AuthPage onLogin={handleLogin} onSignUp={handleSignUp} />
      </div>
    );
  }
  if (screen === "dashboard") {
    return (
      <div id="app-container">
        <DashboardPage
          firstName={firstName}
          savedResults={savedResults}
          onViewResults={() => setScreen("results")}
          onAdjustPreferences={() => { setScreen("quiz"); goTo(0); }}
          onNewQuiz={() => { setData(INITIAL_DATA); goTo(0); setScreen("quiz"); }}
        />
      </div>
    );
  }
  if (screen === "loading") {
    return (
      <div id="app-container">
        <LoadingScreen />
      </div>
    );
  }
  if (screen === "detail" && selectedItem) {
    return (
      <div id="app-container">
        <DetailPage item={selectedItem} onBack={() => setScreen("results")} />
      </div>
    );
  }
  if (screen === "results" && results) {
    return (
      <div id="app-container">
        <ResultsPage
          results={results}
          onMoreInfo={handleMoreInfo}
          onAdjustPreferences={handleAdjustPreferences}
          onCreateAccountLogin={handleCreateAccountLogin}
        />
      </div>
    );
  }
  return (
    <div id="app-container">
      <form id="question-form" onSubmit={onSubmit}>
        <div id="step-counter">
          Question {currentStepIndex + 1} of {steps.length}
        </div>

        {submissionError ? (
          <p id="submission-error" role="alert">
            {submissionError}
          </p>
        ) : null}

        {step}

        <div id="progress-bar" aria-hidden="true">
          <div
            id="progress-bar-fill"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
