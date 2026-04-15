import { useState } from "react";

type AuthPageProps = {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (firstName: string, email: string, password: string) => Promise<void>;
};

export function AuthPage({ onLogin, onSignUp }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin(email, password);
      } else {
        await onSignUp(firstName, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(newMode: "login" | "signup") {
    setMode(newMode);
    setError(null);
    setShowPassword(false);
    setConfirmPassword("");
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
          onClick={() => switchMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`auth-toggle-btn${mode === "signup" ? " auth-toggle-btn--active" : ""}`}
          onClick={() => switchMode("signup")}
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
          <div className="auth-input-wrapper">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="auth-show-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div className="auth-field">
            <label htmlFor="auth-confirm-password">Confirm Password</label>
            <div className="auth-input-wrapper">
              <input
                id="auth-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {error && <p id="auth-error">{error}</p>}

        <button id="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </section>
  );
}
