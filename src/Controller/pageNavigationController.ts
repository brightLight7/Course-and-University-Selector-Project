import { useState, type ReactElement } from "react";

export function pageNavigationController(steps: ReactElement[]) {
  // ------------------------------------ Initialisation ------------------------------------
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }
  function goTo(index: number) {
    setCurrentStepIndex(index);
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
