import homeImage from "../../assets/page-pictures/home-page/home-image.png";
type HomePageProps = {
  onStart: () => void;
};

export function HomePage({ onStart }: HomePageProps) {
  return (
    <section id="home-page">
      <h1 id="home-title">University and Course Selector</h1>
      <div id="home-hero">
        <div id="home-image" className="media-panel">
          <img
            id="home-image-photo"
            className="media-panel-image"
            src={homeImage}
            alt="Students looking at a laptop together"
          />
        </div>
        <div id="home-content">
          <h2 id="home-heading">
            Find the University and Course that suits you
          </h2>

          <p id="home-text">
            A short quiz to help you explore you explore suitable options based
            on your interests, skills, and preferences.
          </p>

          <button id="home-start-button" type="button" onClick={onStart}>
            Start Quiz
          </button>
        </div>
      </div>

      <div id="home-divider">
        <span>OR</span>
      </div>

      <p id="home-login-text">View your existing quiz results</p>

      <button id="home-login-button" type="button">
        Login
      </button>
    </section>
  );
}
