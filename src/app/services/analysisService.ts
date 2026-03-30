import {
  AnalysisResult,
  ParsedQuestion,
  ParsedSlide,
  CoverageStatus,
  CognitiveLevel,
  QuestionAnalysis,
  Recommendation,
  TopicCoverage,
} from "../types/analysis";

const STOP_WORDS = new Set([
  "the","is","in","and","to","of","a","an","it","for","on","with","by","that","this","as","are","from","or","be","at","which","was","has","have"
]);

function extractKeywords(text: string): string[] {
  const cleaned = text
    .toLowerCase()
    .replace(/[\u2018\u2019\u201c\u201d\u2014]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter((w) => w && !STOP_WORDS.has(w));
  const freq = words.reduce<Record<string, number>>((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).map((x) => x[0]);
  return sorted.slice(0, 12);
}

function lexicalOverlap(qKw: string[], slideText: string): number {
  const slideWords = new Set(
    slideText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(" ")
      .filter((w) => w && !STOP_WORDS.has(w))
  );
  if (slideWords.size === 0) return 0;
  const matched = qKw.filter((k) => slideWords.has(k)).length;
  return matched / qKw.length;
}

function detectConcept(questionText: string, slideText: string): string {
  const qWords = extractKeywords(questionText);
  const slideWords = extractKeywords(slideText);
  const intersection = qWords.filter((w) => slideWords.includes(w));
  return intersection.join(" ") || qWords.slice(0, 3).join(" ") || "General Concept";
}

function scoreSlideMatch(questionText: string, slideText: string): number {
  const qKw = extractKeywords(questionText);
  const overlap = lexicalOverlap(qKw, slideText);
  const textSim = Math.min(1, (qKw.length ? qKw.filter((w) => slideText.toLowerCase().includes(w)).length : 0) / Math.max(3, qKw.length));
  let score = 0.6 * overlap + 0.4 * textSim;

  const keywordMatchPct = qKw.length ? qKw.filter((w) => slideText.toLowerCase().includes(w)).length / qKw.length : 0;
  if (keywordMatchPct >= 0.7) {
    score = Math.max(score, 0.85);
  } else if (keywordMatchPct >= 0.5 && overlap >= 0.5 && textSim >= 0.5) {
    score = Math.max(score, 0.8);
  }

  if (slideText.toLowerCase().includes(questionText.toLowerCase().replace(/[^a-z0-9\s]/g, ""))) {
    score = Math.max(score, 0.9);
  }

  return Math.min(1, Math.max(0, score));
}

function getCognitiveLevel(questionText: string): CognitiveLevel {
  const lower = questionText.toLowerCase();
  if (/implement|calculate|solve|build|write/.test(lower)) return "Apply";
  if (/compare|contrast|analyze|evaluate|critique/.test(lower)) return "Analyze";
  if (/explain|describe|summarize|interpret|discuss/.test(lower)) return "Understand";
  if (/define|list|name|identify|recall/.test(lower)) return "Remember";
  return "Understand";
}

function getSlideDepth(slideText: string): CognitiveLevel {
  const lower = slideText.toLowerCase();
  if (/example|case study|exercise|practice|project/.test(lower)) return "Apply";
  if (/compare|contrast|analyze|evaluate|critique/.test(lower)) return "Analyze";
  if (/explain|describe|summarize|interpret|discuss/.test(lower)) return "Understand";
  return "Remember";
}

function classifyCoverage(score: number): CoverageStatus {
  if (score >= 0.65) return "Fully Covered";
  if (score >= 0.4) return "Partially Covered";
  return "Not Covered";
}

function computeConfidence(score: number): number {
  return Math.min(1, Math.max(0.1, score + 0.05));
}

function compareCognitive(qLevel: CognitiveLevel, slideLevel: CognitiveLevel): { mismatch: boolean; explanation: string } {
  const order: Record<CognitiveLevel, number> = { Remember: 1, Understand: 2, Apply: 3, Analyze: 4 };
  const mismatch = order[qLevel] > order[slideLevel];
  const explanation = mismatch
    ? `Question demand (${qLevel}) is higher than slide depth (${slideLevel}).` 
    : `Slide depth (${slideLevel}) aligns with or exceeds question demand (${qLevel}).`;
  return { mismatch, explanation };
}

export function analyzeQuizAgainstSlides(questions: ParsedQuestion[], slides: ParsedSlide[]): AnalysisResult {
  const questionAnalysis: QuestionAnalysis[] = questions.map((q) => {
    const qKeywords = extractKeywords(q.questionText);
    const scores = slides.map((slide) => ({
      slide,
      score: scoreSlideMatch(q.questionText, slide.text),
    }));
    scores.sort((a, b) => b.score - a.score);

    const primary = scores[0];
    const secondary = scores[1] || primary;
    const matchScore = primary?.score ?? 0;
    const coverageStatus = classifyCoverage(matchScore);
    const confidence = computeConfidence(matchScore);
    const qConcept = detectConcept(q.questionText, primary?.slide.text || "");
    const qCog = getCognitiveLevel(q.questionText);
    const slideCog = getSlideDepth(primary?.slide.text ?? "");
    const cog = compareCognitive(qCog, slideCog);

    const explained = `Based on keyword overlap and text similarity, this question matches ${primary?.slide.title} with a relevance score of ${(matchScore * 100).toFixed(0)}%. ${cog.explanation}`;

    return {
      id: q.id,
      questionText: q.questionText,
      concept: qConcept,
      bestMatchingSlide: primary?.slide.title || "Unknown",
      secondBestSlide: secondary?.slide.title,
      coverageStatus,
      confidence,
      cognitiveLevel: qCog,
      slideCognitiveLevel: slideCog,
      explanation: explained,
      quizRequires: `Answer requires ${qCog} level understanding of ${qConcept}.`,
      slidesSupport: `Slide provides ${slideCog} level content and shows matched keywords: ${qKeywords.slice(0, 5).join(", ")}.`,
      slideExcerpts: [primary?.slide.text.slice(0, 160) + "..."],
      recommendation: coverageStatus === "Fully Covered"
        ? `Good coverage. Review ${primary?.slide.title} for details.`
        : coverageStatus === "Partially Covered"
        ? `Add more supporting content around ${qConcept} in ${primary?.slide.title} and nearby slides.`
        : `Require adding new slide content for ${qConcept}.`,
    };
  });

  const summary = {
    totalQuestions: questionAnalysis.length,
    fullyCovered: questionAnalysis.filter((q) => q.coverageStatus === "Fully Covered").length,
    partiallyCovered: questionAnalysis.filter((q) => q.coverageStatus === "Partially Covered").length,
    notCovered: questionAnalysis.filter((q) => q.coverageStatus === "Not Covered").length,
    alignmentScore: Math.round(
      (questionAnalysis.reduce((sum, q) => sum + (q.coverageStatus === "Fully Covered" ? 1 : q.coverageStatus === "Partially Covered" ? 0.5 : 0), 0) / Math.max(1, questionAnalysis.length)) * 100
    ),
    averageConfidence:
      questionAnalysis.reduce((sum, q) => sum + q.confidence, 0) / Math.max(1, questionAnalysis.length),
  };

  const coverageChartData = [
    { name: "Fully Covered", value: summary.fullyCovered, color: "#10b981" },
    { name: "Partially Covered", value: summary.partiallyCovered, color: "#f59e0b" },
    { name: "Not Covered", value: summary.notCovered, color: "#ef4444" },
  ];

  const conceptMap: Record<string, TopicCoverage> = {};
  questionAnalysis.forEach((q) => {
    const key = q.concept || "General";
    if (!conceptMap[key]) {
      conceptMap[key] = { concept: key, quizCount: 0, slideCount: 0, coverage: 0 };
    }
    const item = conceptMap[key];
    item.quizCount += 1;
    if (q.coverageStatus === "Fully Covered") item.slideCount += 1;
    item.coverage = Math.round(((item.slideCount / item.quizCount) * 100) || 0);
  });

  const conceptDistribution = Object.values(conceptMap);

  const cognitiveLevelData = ["Remember", "Understand", "Apply", "Analyze"].map((level) => {
    const levelTyped = level as CognitiveLevel;
    const quiz = questionAnalysis.filter((q) => q.cognitiveLevel === levelTyped).length;
    const slideCountForLevel = slides.filter((slide) => getSlideDepth(slide.text) === levelTyped).length;
    return { level: levelTyped, quiz, slides: slideCountForLevel };
  });

  const keyRecommendations: Recommendation[] = [];
  questionAnalysis.forEach((q) => {
    if (q.coverageStatus === "Not Covered") {
      keyRecommendations.push({
        id: `q-not-covered-${q.id}`,
        type: "Add Content",
        severity: "high",
        title: `${q.concept} Not Covered`,
        description: `Question ${q.id} asks ${q.questionText}. Add slide content for this concept in the course material.`,
        affectedQuestions: [q.id],
      });
    } else if (q.coverageStatus === "Partially Covered") {
      keyRecommendations.push({
        id: `q-partial-${q.id}`,
        type: "Deepen Explanation",
        severity: "medium",
        title: `Partial Coverage for Question ${q.id}`,
        description: `Expand slides for ${q.concept}, including examples and comparative analysis to bridge the gap.`,
        affectedQuestions: [q.id],
      });
    }

    const qCogNum = { Remember: 1, Understand: 2, Apply: 3, Analyze: 4 }[q.cognitiveLevel];
    const slideCogNum = { Remember: 1, Understand: 2, Apply: 3, Analyze: 4 }[q.slideCognitiveLevel];
    if (qCogNum > slideCogNum) {
      keyRecommendations.push({
        id: `q-cog-${q.id}`,
        type: "Cognitive Mismatch",
        severity: "medium",
        title: `Cognitive mismatch for Question ${q.id}`,
        description: `Question requires ${q.cognitiveLevel} but the slide supports ${q.slideCognitiveLevel}. Add exercises or deeper reasoning examples.`,
        affectedQuestions: [q.id],
      });
    }
  });

  const overrepresentedTopics = conceptDistribution
    .filter((topic) => topic.coverage >= 80)
    .map((topic) => ({
      topic: topic.concept,
      slideCount: topic.slideCount,
      quizCount: topic.quizCount,
      note: "Well covered topic."
    }));

  const underrepresentedTopics = conceptDistribution
    .filter((topic) => topic.coverage < 80)
    .map((topic) => ({
      topic: topic.concept,
      slideCount: topic.slideCount,
      quizCount: topic.quizCount,
      note: "Needs more coverage."
    }));

  return {
    questions: questionAnalysis,
    summary,
    coverageChartData,
    conceptDistribution,
    cognitiveLevelData,
    keyRecommendations,
    overrepresentedTopics,
    underrepresentedTopics,
  };
}
