import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../css/main.css";
import "../css/loading-screen.css";
import "../css/results-page.css";
import "../css/detail-page.css";
import "../css/dashboard-auth.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
