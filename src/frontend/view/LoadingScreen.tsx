export function LoadingScreen() {
  return (
    <section id="loading-screen" aria-live="polite" aria-busy="true">
      <div id="loading-shell">
        <p id="loading-eyebrow">We are processing your answers.</p>
        <h1 id="loading-title">
          Please wait while we generate your recommendations.
        </h1>
        <div id="loading-spinner" aria-hidden="true" />
        <div id="loading-progress-track" aria-hidden="true">
          <div id="loading-progress-bar" />
        </div>
        <p id="loading-status">
          The results will appear only when the recommendations are ready.
        </p>
      </div>
    </section>
  );
}
