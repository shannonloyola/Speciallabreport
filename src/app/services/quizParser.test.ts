import { parseQuizQuestions } from './quizParser';

describe('quizParser', () => {
  it('parses numbered questions from text', () => {
    const text = '1. What is TF-IDF?\n2. Explain cosine similarity.';
    const parsed = parseQuizQuestions(text);
    expect(parsed.length).toBe(2);
    expect(parsed[0].questionText).toContain('What is TF-IDF');
    expect(parsed[1].questionText).toContain('Explain cosine similarity');
  });

  it('falls back to block split when no numbering present', () => {
    const text = 'What is NLP?\n\nExplain tokenization.';
    const parsed = parseQuizQuestions(text);
    expect(parsed.length).toBe(2);
    expect(parsed[0].questionText).toContain('What is NLP');
    expect(parsed[1].questionText).toContain('Explain tokenization');
  });
});
