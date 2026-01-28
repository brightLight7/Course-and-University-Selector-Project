import { useState, type FormEvent } from "react";
import { AddressForm } from "./View/AddressForm";
import { AccountForm } from "./View/AccountForm";
import { useMultiStepForm } from "./View/useMultiStepForm";
import { UserForm } from "./View/UserForm";
import { Question1Form } from "./View/Form/Question1Form";
import { Question2Form } from "./View/Form/Question2Form";
import { Question3Form } from "./View/Form/Question3Form";
import { Question4Form } from "./View/Form/Question4Form";
import { Question5Form } from "./View/Form/Question5Form";
import { Question6Form } from "./View/Form/Question6Form";
import { Question7Form } from "./View/Form/Question7Form";
import { Question8Form } from "./View/Form/Question8Form";
import { Question9Form } from "./View/Form/Question9Form";
import { Question10Form } from "./View/Form/Question10Form";

type FormData = {
  // firstName: string;
  // lastName: string;
  // age: string;
  // street: string;
  // city: string;
  // state: string;
  // postalCode: string;
  // email: string;
  // password: string;
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
  // firstName: "",
  // lastName: "",
  // age: "",
  // street: "",
  // city: "",
  // state: "",
  // postalCode: "",
  // email: "",
  // password: "",
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

  // ========================================================================================
  // ------------------------------------ Initialisation ------------------------------------

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      // <UserForm {...data} updateFields={updateFields} />,
      // <AddressForm {...data} updateFields={updateFields} />,
      // <AccountForm {...data} updateFields={updateFields} />,
      // ^-- Previous form steps commented out for simplification
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
    if (!isLastStep) return next();
    else {
      alert("Successful Account Creation");
      console.log(data);
      // Location of where I can handle form submission, e.g., send data to a server (API)
    }
  }

  // ========================================================================================

  // ----------------------------------------- View -----------------------------------------

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        fontFamily: "Arial, Helvetica, sans-serif",
        //maxWidth: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
        >
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
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
