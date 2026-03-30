import { ParsedSlide } from "../types/analysis";

export function parseSlides(rawText: string): ParsedSlide[] {
  // We expect rawText with slide delimiters for pptx parser output, e.g., "Slide 1: ..."
  const slideBlocks = rawText
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter((block) => block);

  if (slideBlocks.some((block) => /^Slide\s*\d+/i.test(block))) {
    return slideBlocks.map((block) => {
      const [firstLine, ...rest] = block.split("\n");
      const titleMatch = firstLine.match(/Slide\s*(\d+):?\s*(.*)/i);
      if (titleMatch) {
        const id = Number(titleMatch[1]);
        const text = rest.join(" ") || titleMatch[2] || "";
        return {
          id,
          title: `Slide ${id}`,
          text: `${titleMatch[2] ? `${titleMatch[2]} ` : ""}${text}`.trim(),
        };
      }
      return { id: 1, title: "Slide 1", text: block };
    });
  }

  // fallback: split by headers or equal-sized chunks
  const chunks = rawText
    .split(/\n(?=\s*[A-Z].*\n)/)
    .filter((block) => block.trim());

  if (chunks.length > 1) {
    return chunks.map((chunk, i) => ({ id: i + 1, title: `Slide ${i + 1}`, text: chunk.trim() }));
  }

  // last fallback: one slide
  return [{ id: 1, title: "Slide 1", text: rawText.trim() }];
}
