import * as mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import JSZip from "jszip";

export async function parseTextFile(file: File): Promise<string> {
  return file.text();
}

export async function parseDocxFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  return value;
}

export async function parsePdfFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    text += `${pageText}\n\n`;
  }
  return text;
}

export async function parsePptxFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const slideFiles = Object.keys(zip.files).filter((name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml"));
  slideFiles.sort((a, b) => {
    const aNum = parseInt(a.match(/slide(\d+)\.xml/)?.[1] ?? "0", 10);
    const bNum = parseInt(b.match(/slide(\d+)\.xml/)?.[1] ?? "0", 10);
    return aNum - bNum;
  });

  let combined = "";

  for (const slideFile of slideFiles) {
    const slideContent = await zip.file(slideFile)?.async("string");
    if (!slideContent) continue;
    const textMatches = Array.from(slideContent.matchAll(/<a:t>(.*?)<\/a:t>/g));
    const slideText = textMatches.map((m) => m[1]).join(" ");
    combined += `Slide ${slideFile.match(/slide(\d+)\.xml/)?.[1] || ""}: ${slideText}\n\n`;
  }

  return combined;
}

export async function parseFileContent(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) return parseTextFile(file);
  if (name.endsWith(".docx")) return parseDocxFile(file);
  if (name.endsWith(".pdf")) return parsePdfFile(file);
  if (name.endsWith(".pptx")) return parsePptxFile(file);
  throw new Error(`Unsupported file type: ${file.name}`);
}
