import type { RecommendationSet } from "../types/recommendations";

type QuizAnswers = {
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

const API_BASE = "http://127.0.0.1:5000";

export async function generateRecommendations(
  answers: QuizAnswers,
): Promise<RecommendationSet> {
  const response = await fetch(`${API_BASE}/api/recommendations/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate recommendations.");
  }

  return (await response.json()) as RecommendationSet;
}

export async function saveResults(results: RecommendationSet, userId: number): Promise<void> {
  const response = await fetch(`${API_BASE}/api/results/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ results, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to save results.");
  }
}
