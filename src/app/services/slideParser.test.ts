import { parseSlides } from './slideParser';

describe('slideParser', () => {
  it('parses numbered slide blocks from pptx-like text', () => {
    const text = 'Slide 1: Intro\nContent line\n\nSlide 2: Details\nAnother line';
    const parsed = parseSlides(text);
    expect(parsed.length).toBe(2);
    expect(parsed[0].title).toBe('Slide 1');
    expect(parsed[1].title).toBe('Slide 2');
  });

  it('creates fallback slide when plain text with no slide prefix', () => {
    const text = 'This is slide text only with no numbered block';
    const parsed = parseSlides(text);
    expect(parsed.length).toBe(1);
    expect(parsed[0].title).toBe('Slide 1');
  });
});
