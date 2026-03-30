import { ParsedQuestion } from "../types/analysis";

const splitByQuestionPattern = /(?:^|\n)(\d+)[\).:]*\s+([^\n]+)/g;

export function parseQuizQuestions(rawText: string): ParsedQuestion[] {
  const lines = rawText
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const joined = lines.join("\n");
  const questions: ParsedQuestion[] = [];

  let match;
  let currentId = 1;
  let currentText = "";
  let hasExplicit = false;

  while ((match = splitByQuestionPattern.exec(joined)) !== null) {
    hasExplicit = true;
    if (currentText) {
      questions.push({ id: currentId, questionText: currentText.trim() });
      currentId += 1;
    }
    currentText = match[2];
  }

  if (hasExplicit && currentText) {
    questions.push({ id: currentId, questionText: currentText.trim() });
  }

  if (!hasExplicit) {
    // fallback split by double line breaks
    const blocks = rawText.split(/\n\s*\n/).filter((b) => b.trim());
    return blocks.map((block, i) => ({ id: i + 1, questionText: block.trim() }));
  }

  return questions;
}
