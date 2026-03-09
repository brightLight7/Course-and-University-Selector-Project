import { useState, type FormEvent } from "react";
import { pageNavigationController } from "../Controller/pageNavigationController";
import { Question1Form } from "./View/Form/QuestionPages/Question1Form";
import { Question2Form } from "./View/Form/QuestionPages/Question2Form";
import { Question3Form } from "./View/Form/QuestionPages/Question3Form";
import { Question4Form } from "./View/Form/QuestionPages/Question4Form";
import { Question5Form } from "./View/Form/QuestionPages/Question5Form";
import { Question6Form } from "./View/Form/QuestionPages/Question6Form";
import { Question7Form } from "./View/Form/QuestionPages/Question7Form";
import { Question8Form } from "./View/Form/QuestionPages/Question8Form";
import { Question9Form } from "./View/Form/QuestionPages/Question9Form";
import { Question10Form } from "./View/Form/QuestionPages/Question10Form";
import { HomePage } from "./View/HomePage";

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
  question10Answer: string;
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
  question10Answer: "",
};

function App() {
  // --------------------------------------- State(s) ---------------------------------------

  const [data, setData] = useState(INITIAL_DATA);

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

  const [hasStartedQuiz, setHasStartedQuiz] = useState(false);
  // ========================================================================================
  // ------------------------------------ Initialisation ------------------------------------

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    pageNavigationController([
      <Question1Form {...data} updateFields={updateFields} />,
      <Question2Form {...data} updateFields={updateFields} />,
      <Question3Form {...data} updateFields={updateFields} />,
      <Question4Form {...data} updateFields={updateFields} />,
      <Question5Form {...data} updateFields={updateFields} />,
      <Question6Form {...data} updateFields={updateFields} />,
      <Question7Form {...data} updateFields={updateFields} />,
      <Question8Form {...data} updateFields={updateFields} />,
      <Question9Form {...data} updateFields={updateFields} />,
      <Question10Form {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    saveToLocal(data);

    if (!isLastStep) {
      next();
      return;
    } else {
      alert("Finished! Check console for data.");
      console.log(data);
      // Location of where I can handle form submission, e.g., send data to a server (API)
    }
  }

  // ========================================================================================

  // ----------------------------------------- View -----------------------------------------

  if (!hasStartedQuiz) {
    return (
      <div id="app-container">
        <HomePage onStart={() => setHasStartedQuiz(true)} />
      </div>
    );
  }
  return (
    <div id="app-container">
      <form id="question-form" onSubmit={onSubmit}>
        <div id="step-counter">
          Question {currentStepIndex + 1} of {steps.length}
        </div>

        {step}

        <div id="form-actions">
          <button
            id="back-button"
            type="button"
            onClick={() => {
              if (isFirstStep) {
                setHasStartedQuiz(false);
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
        </div>

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
  // ----------------------------------------------------------------------------------------
}
export default App;

// ----------------------------------------------------------------------------------------
// ------------------------------------ Initialisation ------------------------------------
// --------------------------------------- State(s) ---------------------------------------
// -------------------------------------- Handler(s) --------------------------------------
// ----------------------------------------- View -----------------------------------------
// ----------------------------------------------------------------------------------------
