import { useState, type ReactElement } from "react";

export function pageNavigationController(steps: ReactElement[]) {
  // ------------------------------------ Initialisation ------------------------------------
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // tracks which step is currently shown, starts at 0

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i; // already on the last step, do nothing
      return i + 1;                         // otherwise advance by one
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i; // already on the first step, do nothing
      return i - 1;         // otherwise go back by one
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index); // jump directly to any step by index
  }
  // ----------------------------------------------------------------------------------------
  // -------------------------------------- Handler(s) --------------------------------------
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------
// ------------------------------------ Initialisation ------------------------------------
// --------------------------------------- State(s) ---------------------------------------
// -------------------------------------- Handler(s) --------------------------------------
// ----------------------------------------- View -----------------------------------------
// ----------------------------------------------------------------------------------------
