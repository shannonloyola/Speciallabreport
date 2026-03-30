// Sample quiz questions data
export const sampleQuestions = [
  {
    id: 1,
    questionText: "Explain how TF-IDF measures the importance of a term in a document relative to a collection of documents. What does the 'IDF' component specifically address?",
    concept: "TF-IDF",
    bestMatchingSlide: "Slide 3: Introduction to TF-IDF",
    secondBestSlide: "Slide 4: TF-IDF Formula Breakdown",
    coverageStatus: "Fully Covered",
    confidence: 0.92,
    cognitiveLevel: "Understand",
    explanation: "This question is fully covered because Slide 3 provides a comprehensive explanation of TF-IDF including both term frequency and inverse document frequency components. The slide explicitly defines what IDF addresses: reducing the weight of common terms.",
    quizRequires: "Understanding of both TF and IDF components, ability to explain the purpose of inverse document frequency",
    slidesSupport: "Complete explanation with formula and examples of how IDF penalizes common words",
    slideExcerpts: [
      "TF-IDF = Term Frequency × Inverse Document Frequency",
      "IDF reduces the weight of terms that appear frequently across documents"
    ],
    recommendation: "Review Slide 3 before answering this question. The slide contains all the information you need."
  },
  {
    id: 2,
    questionText: "When calculating cosine similarity between two text documents, why do we use the angle between vectors rather than Euclidean distance? Provide a specific example.",
    concept: "Cosine Similarity",
    bestMatchingSlide: "Slide 6: Cosine Similarity Formula",
    secondBestSlide: "Slide 7: Vector Space Models",
    coverageStatus: "Partially Covered",
    confidence: 0.78,
    cognitiveLevel: "Analyze",
    explanation: "This question is partially covered. While Slide 6 explains the cosine similarity formula and how it works, it doesn't provide a comparison with Euclidean distance or explain why angles are preferred. The 'why' aspect requires deeper reasoning than what's presented.",
    quizRequires: "Comparative analysis of distance metrics, ability to explain advantages of cosine similarity, concrete example",
    slidesSupport: "Formula and basic concept, but lacks comparison with other metrics and practical examples",
    slideExcerpts: [
      "Cosine similarity measures the cosine of the angle between two vectors",
      "Result ranges from -1 to 1, where 1 means identical direction"
    ],
    recommendation: "The slides explain what cosine similarity is, but you may need to research why it's better than Euclidean distance for text comparison. Consider how document length affects each metric."
  },
  {
    id: 3,
    questionText: "List and briefly describe the five main steps in text preprocessing for NLP applications.",
    concept: "Text Preprocessing",
    bestMatchingSlide: "Slide 9: Text Preprocessing Steps",
    secondBestSlide: "Slide 10: Tokenization and Normalization",
    coverageStatus: "Fully Covered",
    confidence: 0.95,
    cognitiveLevel: "Remember",
    explanation: "This question is fully covered. Slide 9 provides a clear numbered list of the five preprocessing steps with brief descriptions for each one. This is a straightforward recall question.",
    quizRequires: "List of five preprocessing steps with descriptions",
    slidesSupport: "Exact list with detailed descriptions: tokenization, lowercasing, stopword removal, stemming/lemmatization, and removing special characters",
    slideExcerpts: [
      "1. Tokenization: Breaking text into words or tokens",
      "2. Lowercasing: Converting all text to lowercase",
      "3. Stopword Removal: Removing common words like 'the', 'is', 'at'"
    ],
    recommendation: "Review Slide 9 - it contains exactly what you need to answer this question. Make sure to memorize all five steps."
  },
  {
    id: 4,
    questionText: "Compare and contrast supervised classification with unsupervised clustering. In what scenarios would you choose one approach over the other?",
    concept: "Classification vs Clustering",
    bestMatchingSlide: "Slide 12: Classification vs Clustering",
    secondBestSlide: "Slide 13: Supervised Learning Overview",
    coverageStatus: "Partially Covered",
    confidence: 0.71,
    cognitiveLevel: "Analyze",
    explanation: "This question is partially covered. Slide 12 defines both classification and clustering and highlights key differences. However, the question asks for scenario-based decision making, which requires deeper application knowledge not fully addressed in the slides.",
    quizRequires: "Comparison of both methods, ability to recommend appropriate method based on scenario, real-world application thinking",
    slidesSupport: "Definitions and basic differences, but limited discussion of when to use each approach",
    slideExcerpts: [
      "Classification: Supervised learning with labeled training data",
      "Clustering: Unsupervised learning that groups similar items without labels"
    ],
    recommendation: "Study Slide 12 for the basic differences. For the 'when to use' part, think about whether you have labeled data available and what your goal is."
  },
  {
    id: 5,
    questionText: "Implement a function that calculates the Jaccard similarity coefficient between two sets of words. Show your work with a concrete example.",
    concept: "Similarity Metrics",
    bestMatchingSlide: "Slide 15: Distance and Similarity Metrics",
    secondBestSlide: "Slide 6: Cosine Similarity Formula",
    coverageStatus: "Not Covered",
    confidence: 0.45,
    cognitiveLevel: "Apply",
    explanation: "This question is not covered by the slides. While Slide 15 mentions various similarity metrics, Jaccard similarity is not discussed in detail. The slides focus primarily on cosine similarity and don't provide the formula or examples for Jaccard coefficient.",
    quizRequires: "Understanding of Jaccard similarity formula, ability to implement it, provide worked example",
    slidesSupport: "Brief mention of 'similarity metrics' but no specific coverage of Jaccard coefficient",
    slideExcerpts: [
      "Various similarity metrics exist for comparing documents"
    ],
    recommendation: "This topic is not covered in the slides. You'll need to research Jaccard similarity independently. It's calculated as: |A ∩ B| / |A ∪ B| where A and B are sets."
  },
  {
    id: 6,
    questionText: "What is the purpose of feature extraction in NLP, and name three common feature extraction techniques?",
    concept: "Feature Extraction",
    bestMatchingSlide: "Slide 16: Feature Extraction in NLP",
    secondBestSlide: "Slide 3: Introduction to TF-IDF",
    coverageStatus: "Fully Covered",
    confidence: 0.88,
    cognitiveLevel: "Understand",
    explanation: "This question is fully covered. Slide 16 explains the purpose of feature extraction and lists multiple techniques including Bag of Words, TF-IDF, and Word Embeddings.",
    quizRequires: "Purpose of feature extraction and three technique names",
    slidesSupport: "Clear explanation of purpose and comprehensive list of techniques with descriptions",
    slideExcerpts: [
      "Feature extraction converts text into numerical representations that machines can process",
      "Common techniques: Bag of Words, TF-IDF, Word2Vec, Word Embeddings"
    ],
    recommendation: "Review Slide 16. It directly answers both parts of this question."
  },
  {
    id: 7,
    questionText: "Describe the difference between stemming and lemmatization. Which one would be more appropriate for sentiment analysis and why?",
    concept: "Text Normalization",
    bestMatchingSlide: "Slide 10: Tokenization and Normalization",
    secondBestSlide: "Slide 9: Text Preprocessing Steps",
    coverageStatus: "Partially Covered",
    confidence: 0.66,
    cognitiveLevel: "Analyze",
    explanation: "This question is partially covered. The slides define both stemming and lemmatization and show examples, but they don't discuss which is better for specific tasks like sentiment analysis. The application-based reasoning isn't provided.",
    quizRequires: "Definitions of both terms, comparison, application to sentiment analysis with reasoning",
    slidesSupport: "Definitions and examples of stemming and lemmatization, but no task-specific recommendations",
    slideExcerpts: [
      "Stemming: Reducing words to their root form (running → run)",
      "Lemmatization: Reducing words to their dictionary form using linguistic rules"
    ],
    recommendation: "Review Slide 10 for the definitions. For the sentiment analysis part, consider which method preserves more meaning - this isn't directly covered in the slides."
  },
  {
    id: 8,
    questionText: "What are stop words and why are they typically removed in text preprocessing? Can you think of a scenario where removing stop words might be problematic?",
    concept: "Stop Words",
    bestMatchingSlide: "Slide 9: Text Preprocessing Steps",
    secondBestSlide: "Slide 11: Stop Word Lists",
    coverageStatus: "Partially Covered",
    confidence: 0.73,
    cognitiveLevel: "Analyze",
    explanation: "This question is partially covered. Slides 9 and 11 explain what stop words are and why they're removed. However, the critical thinking aspect about when removal might be problematic is not discussed.",
    quizRequires: "Definition of stop words, reason for removal, critical thinking about edge cases",
    slidesSupport: "Clear definition and typical reasons for removal, no discussion of exceptions",
    slideExcerpts: [
      "Stop words are common words like 'the', 'is', 'at' that carry little meaning",
      "Removing them reduces noise and computational cost"
    ],
    recommendation: "Study Slides 9 and 11 for the basics. For the problematic scenario part, think about tasks where word order or small words matter (hint: sentiment analysis with phrases like 'not good')."
  }
];

// Summary statistics
export const summaryStats = {
  totalQuestions: 8,
  fullyCovered: 3,
  partiallyCovered: 4,
  notCovered: 1,
  alignmentScore: 73
};

// Concept distribution data
export const conceptDistribution = [
  { concept: "TF-IDF", quizCount: 2, slideCount: 3, coverage: 85 },
  { concept: "Cosine Similarity", quizCount: 1, slideCount: 2, coverage: 75 },
  { concept: "Text Preprocessing", quizCount: 3, slideCount: 4, coverage: 80 },
  { concept: "Classification vs Clustering", quizCount: 1, slideCount: 2, coverage: 70 },
  { concept: "Feature Extraction", quizCount: 1, slideCount: 2, coverage: 90 },
  { concept: "Similarity Metrics", quizCount: 1, slideCount: 1, coverage: 45 }
];

// Chart data
export const coverageChartData = [
  { name: "Fully Covered", value: 3, color: "#10b981" },
  { name: "Partially Covered", value: 4, color: "#f59e0b" },
  { name: "Not Covered", value: 1, color: "#ef4444" }
];

// Cognitive level data
export const cognitiveLevelData = [
  { level: "Remember", quiz: 1, slides: 2 },
  { level: "Understand", quiz: 2, slides: 3 },
  { level: "Apply", quiz: 1, slides: 0 },
  { level: "Analyze", quiz: 4, slides: 2 }
];

// Key recommendations
export const keyRecommendations = [
  {
    id: 1,
    type: "Add Content",
    severity: "high",
    title: "Jaccard Similarity Not Covered",
    description: "Question 5 asks students to implement Jaccard similarity, but this topic is not covered in the slides. Consider adding a slide explaining Jaccard coefficient with formula and examples.",
    affectedQuestions: [5]
  },
  {
    id: 2,
    type: "Deepen Explanation",
    severity: "medium",
    title: "Cosine Similarity Lacks Comparison",
    description: "Question 2 asks why cosine similarity is preferred over Euclidean distance. While the formula is covered, the comparative reasoning is missing. Add explanation of when and why to use cosine similarity.",
    affectedQuestions: [2]
  },
  {
    id: 3,
    type: "Add Examples",
    severity: "medium",
    title: "Application-Based Scenarios Missing",
    description: "Several questions (Q4, Q7, Q8) ask students to apply concepts to specific scenarios or suggest when to use certain methods. The slides focus on definitions but lack practical application guidance.",
    affectedQuestions: [4, 7, 8]
  },
  {
    id: 4,
    type: "Good Alignment",
    severity: "low",
    title: "Strong Coverage of Fundamentals",
    description: "Questions 1, 3, and 6 are well-aligned with the slides. The fundamental concepts of TF-IDF, preprocessing steps, and feature extraction are thoroughly covered.",
    affectedQuestions: [1, 3, 6]
  }
];

export const overrepresentedTopics = [
  {
    topic: "Basic Definitions",
    slideCount: 8,
    quizCount: 2,
    note: "Slides provide extensive definitional content, but quiz emphasizes application"
  }
];

export const underrepresentedTopics = [
  {
    topic: "Similarity Metrics (Beyond Cosine)",
    slideCount: 1,
    quizCount: 2,
    note: "Quiz asks about Jaccard and other metrics, but slides only cover cosine similarity in depth"
  },
  {
    topic: "Practical Application Scenarios",
    slideCount: 2,
    quizCount: 4,
    note: "Multiple quiz questions require scenario-based reasoning not covered in slides"
  }
];
