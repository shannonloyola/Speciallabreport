import { analyzeQuizAgainstSlides } from './analysisService';
import { ParsedQuestion, ParsedSlide } from '../types/analysis';

describe('analysisService', () => {
  it('classifies fully covered question when slide text has strong overlap', () => {
    const questions: ParsedQuestion[] = [{ id: 1, questionText: 'Explain TF-IDF formula and application.' }];
    const slides: ParsedSlide[] = [{ id: 1, title: 'Slide 1', text: 'TF-IDF formula: term frequency and inverse document frequency. Use for document weighting.' }];
    const result = analyzeQuizAgainstSlides(questions, slides);
    expect(result.summary.totalQuestions).toBe(1);
    expect(result.questions[0].coverageStatus).toBe('Fully Covered');
    expect(result.questions[0].bestMatchingSlide).toBe('Slide 1');
    expect(result.questions[0].confidence).toBeGreaterThan(0.7);
  });

  it('classifies not covered when there is no overlap and the question is unrelated', () => {
    const questions: ParsedQuestion[] = [{ id: 1, questionText: 'Describe k-means clustering steps.' }];
    const slides: ParsedSlide[] = [{ id: 1, title: 'Slide 1', text: 'Natural language processing concepts and definitions.' }];
    const result = analyzeQuizAgainstSlides(questions, slides);
    expect(result.questions[0].coverageStatus).toBe('Not Covered');
    expect(result.summary.notCovered).toBe(1);
    expect(result.summary.fullyCovered).toBe(0);
  });

  it('generates cognitive mismatch recommendation when quiz demand > slide depth', () => {
    const questions: ParsedQuestion[] = [{ id: 1, questionText: 'Compare and analyze classification vs clustering scenarios.' }];
    const slides: ParsedSlide[] = [{ id: 1, title: 'Slide 1', text: 'Classification and clustering are basic definitions.' }];
    const result = analyzeQuizAgainstSlides(questions, slides);
    expect(result.keyRecommendations.some((r) => r.type === 'Cognitive Mismatch')).toBe(true);
  });
});
