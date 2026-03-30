import React, { createContext, useContext, useMemo, useState } from "react";
import { parseFileContent } from "../services/fileParsers";
import { parseQuizQuestions } from "../services/quizParser";
import { parseSlides } from "../services/slideParser";
import { analyzeQuizAgainstSlides } from "../services/analysisService";
import { AnalysisResult, ParsedQuestion, ParsedSlide } from "../types/analysis";
import { sampleQuestions, summaryStats, coverageChartData, conceptDistribution, cognitiveLevelData, keyRecommendations, overrepresentedTopics, underrepresentedTopics } from "../data/sampleData";

interface AnalysisContextValue {
  quizFile: File | null;
  slideFile: File | null;
  parsedQuestions: ParsedQuestion[];
  parsedSlides: ParsedSlide[];
  analysisResult: AnalysisResult;
  isAnalyzing: boolean;
  error: string | null;
  demoMode: boolean;
  setQuizFile: (file: File | null) => void;
  setSlideFile: (file: File | null) => void;
  runAnalysis: () => Promise<void>;
  reset: () => void;
}

const defaultAnalysisResult: AnalysisResult = {
  questions: [],
  summary: { totalQuestions: 0, fullyCovered: 0, partiallyCovered: 0, notCovered: 0, alignmentScore: 0, averageConfidence: 0 },
  coverageChartData: [],
  conceptDistribution: [],
  cognitiveLevelData: [],
  keyRecommendations: [],
  overrepresentedTopics: [],
  underrepresentedTopics: [],
};

const Context = createContext<AnalysisContextValue | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [quizFile, setQuizFile] = useState<File | null>(null);
  const [slideFile, setSlideFile] = useState<File | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [parsedSlides, setParsedSlides] = useState<ParsedSlide[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(defaultAnalysisResult);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(true);

  const runAnalysis = async () => {
    setError(null);
    if (!quizFile || !slideFile) {
      setError("Please upload both quiz and slide files before analyzing.");
      return false;
    }

    setIsAnalyzing(true);
    try {
      const [quizText, slidesText] = await Promise.all([parseFileContent(quizFile), parseFileContent(slideFile)]);
      const questions = parseQuizQuestions(quizText);
      const slides = parseSlides(slidesText);
      const result = analyzeQuizAgainstSlides(questions, slides);
      setParsedQuestions(questions);
      setParsedSlides(slides);
      setAnalysisResult(result);
      setDemoMode(false);
      return true;
    } catch (err: any) {
      setError(err?.message || "An error occurred during analysis.");
      return false;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setQuizFile(null);
    setSlideFile(null);
    setParsedQuestions([]);
    setParsedSlides([]);
    setAnalysisResult(defaultAnalysisResult);
    setError(null);
    setDemoMode(true);
  };

  const value = useMemo(
    () => ({
      quizFile,
      slideFile,
      parsedQuestions,
      parsedSlides,
      analysisResult,
      isAnalyzing,
      error,
      demoMode,
      setQuizFile,
      setSlideFile,
      runAnalysis,
      reset,
    }),
    [quizFile, slideFile, parsedQuestions, parsedSlides, analysisResult, isAnalyzing, error, demoMode]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAnalysis() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useAnalysis must be used within AnalysisProvider");
  }
  return ctx;
}

// Legacy support for sample data in demo mode
export function getDemoAnalysis(): AnalysisResult {
  const questions = sampleQuestions.map((q) => ({ ...q }));
  const summary = summaryStats;
  return {
    questions,
    summary,
    coverageChartData,
    conceptDistribution,
    cognitiveLevelData,
    keyRecommendations,
    overrepresentedTopics,
    underrepresentedTopics,
  };
}
