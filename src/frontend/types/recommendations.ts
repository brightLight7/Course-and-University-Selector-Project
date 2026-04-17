export type CourseRecommendation = {
  courseName: string;
  universityName: string;
  suitabilityScore: number;
  explanation: string;
  detailedExplanation: string;
  assessmentMethodSummary?: string;
};

export type UniversityRecommendation = {
  universityName: string;
  suitabilityScore: number;
  explanation: string;
  detailedExplanation: string;
};

export type RecommendationSet = {
  recommendedCourses: CourseRecommendation[];
  recommendedUniversities: UniversityRecommendation[];
  generatedAt: string;
};
