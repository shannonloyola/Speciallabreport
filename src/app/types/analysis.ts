export type CoverageStatus = "Fully Covered" | "Partially Covered" | "Not Covered";

export type CognitiveLevel = "Remember" | "Understand" | "Apply" | "Analyze";

export interface ParsedQuestion {
  id: number;
  questionText: string;
  concept?: string;
}

export interface ParsedSlide {
  id: number;
  title: string;
  text: string;
}

export interface QuestionAnalysis {
  id: number;
  questionText: string;
  concept: string;
  bestMatchingSlide: string;
  secondBestSlide?: string;
  coverageStatus: CoverageStatus;
  confidence: number;
  cognitiveLevel: CognitiveLevel;
  slideCognitiveLevel: CognitiveLevel;
  explanation: string;
  quizRequires: string;
  slidesSupport: string;
  slideExcerpts: string[];
  recommendation: string;
}

export interface AnalysisSummary {
  totalQuestions: number;
  fullyCovered: number;
  partiallyCovered: number;
  notCovered: number;
  alignmentScore: number;
  averageConfidence: number;
}

export interface TopicCoverage {
  concept: string;
  quizCount: number;
  slideCount: number;
  coverage: number;
}

export interface Recommendation {
  id: string | number;
  type: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  affectedQuestions: number[];
}

export interface AnalysisResult {
  questions: QuestionAnalysis[];
  summary: AnalysisSummary;
  coverageChartData: { name: string; value: number; color: string }[];
  conceptDistribution: TopicCoverage[];
  cognitiveLevelData: { level: CognitiveLevel; quiz: number; slides: number }[];
  keyRecommendations: Recommendation[];
  overrepresentedTopics: { topic: string; slideCount: number; quizCount: number; note: string }[];
  underrepresentedTopics: { topic: string; slideCount: number; quizCount: number; note: string }[];
}
