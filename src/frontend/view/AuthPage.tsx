import { useState } from "react";

type AuthPageProps = {
  onLogin: (email: string, password: string) => void;
  onSignUp: (firstName: string, email: string, password: string) => void;
};

export function AuthPage({ onLogin, onSignUp }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "login") {
      onLogin(email, password);
    } else {
      onSignUp(firstName, email, password);
    }
  }

  return (
    <section id="auth-page">
      <h1 id="auth-title">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h1>

      <div id="auth-toggle">
        <button
          type="button"
          className={`auth-toggle-btn${mode === "login" ? " auth-toggle-btn--active" : ""}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`auth-toggle-btn${mode === "signup" ? " auth-toggle-btn--active" : ""}`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      <form id="auth-form" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div className="auth-field">
            <label htmlFor="auth-firstname">First Name</label>
            <input
              id="auth-firstname"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="auth-field">
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button id="auth-submit-btn" type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </section>
  );
}
