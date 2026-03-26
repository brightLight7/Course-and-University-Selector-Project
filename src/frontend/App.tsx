import { useState, type FormEvent } from "react";
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
import type { RecommendationSet } from "./types/recommendations";
import { generateRecommendations } from "./services/recommendations";
import { LoadingScreen } from "./view/LoadingScreen";
import { ResultsPage } from "./view/ResultsPage";

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
  const [data, setData] = useState(INITIAL_DATA);

  const [screen, setScreen] = useState<"home" | "quiz" | "loading" | "results">(
    "home",
  );

  const [results, setResults] = useState<RecommendationSet | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  type Submission = FormData & {
    submittedat: string;
  };

  const STORAGE_KEY = "course_selector_submissions";

  function saveToLocal(data: FormData) {
    const submission: Submission = {
      ...data,
      submittedat: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    ) as Submission[];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...existing, submission]),
    );
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

  async function onSubmit(e: FormEvent) {
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

  function handleAdjustPreferences() {
    setScreen("quiz");
    goTo(0);
  }

  function handleCreateAccountLogin() {
    window.alert("Login and saving results will be connected next.");
  }

  if (screen === "home") {
    return (
      <div id="app-container">
        <HomePage onStart={() => setScreen("quiz")} />
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
  if (screen === "results" && results) {
    return (
      <div id="app-container">
        <ResultsPage
          results={results}
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
