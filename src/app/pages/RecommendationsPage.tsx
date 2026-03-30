import { Download, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import { useAnalysis, getDemoAnalysis } from "../context/AnalysisContext";

export function RecommendationsPage() {
  const { analysisResult, demoMode } = useAnalysis();
  const data = demoMode || !analysisResult.keyRecommendations.length ? getDemoAnalysis() : analysisResult;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "low":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Recommendations</h1>
            <p className="text-slate-600">
              Actionable insights to improve quiz-slide alignment
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Download className="w-4 h-4" />
              Export Summary
            </button>
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Key Findings</h2>
              <div className="space-y-2 text-slate-700">
                <p>
                  ✓ <strong>Overall Alignment Score: 73%</strong> - Your quiz has good coverage but there's room for improvement
                </p>
                <p>
                  ✓ <strong>3 out of 8 questions</strong> are fully covered by the slides
                </p>
                <p>
                  ⚠️ <strong>Critical Gap:</strong> Jaccard similarity is tested but not taught in the slides
                </p>
                <p>
                  ⚠️ <strong>Cognitive Mismatch:</strong> Quiz requires more higher-order thinking than slides prepare for
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Improvement Recommendations</h2>
          <div className="space-y-4">
            {data.keyRecommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getSeverityIcon(rec.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{rec.title}</h3>
                      <span className={`inline-flex px-2.5 py-1 border rounded-md text-xs font-semibold uppercase tracking-wide ${getSeverityColor(rec.severity)}`}>
                        {rec.severity}
                      </span>
                      <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-3">{rec.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="font-medium">Affects Questions:</span>
                      <div className="flex gap-2">
                        {rec.affectedQuestions.map((qNum) => (
                          <span key={qNum} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-medium">
                            Q{qNum}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Balance Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Overrepresented */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Overrepresented Topics</h3>
            </div>
            <div className="space-y-3">
              {data.overrepresentedTopics.map((topic, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-slate-900">{topic.topic}</h4>
                    <div className="text-right text-xs text-slate-600">
                      <div>Slides: {topic.slideCount}</div>
                      <div>Quiz: {topic.quizCount}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{topic.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Underrepresented */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-slate-900">Underrepresented Topics</h3>
            </div>
            <div className="space-y-3">
              {data.underrepresentedTopics.map((topic, index) => (
                <div key={index} className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-slate-900">{topic.topic}</h4>
                    <div className="text-right text-xs text-slate-700">
                      <div>Slides: {topic.slideCount}</div>
                      <div>Quiz: {topic.quizCount}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">{topic.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cognitive-Level Insights */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-4">Cognitive-Level Mismatch Insights</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-amber-400 bg-amber-50 p-4 rounded-r-lg">
              <h4 className="font-medium text-amber-900 mb-2">Analysis & Application Questions</h4>
              <p className="text-sm text-amber-800">
                The quiz contains 4 questions requiring "Analyze" level thinking (Q2, Q4, Q7, Q8), 
                but the slides primarily present information at the "Remember" and "Understand" levels. 
                Students may struggle to answer these questions without additional practice or examples.
              </p>
            </div>
            <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
              <h4 className="font-medium text-red-900 mb-2">Application Practice Missing</h4>
              <p className="text-sm text-red-800">
                Question 5 requires students to implement code, but the slides don't include 
                implementation examples or practical exercises. Consider adding worked examples 
                or practice problems to the slides.
              </p>
            </div>
            <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
              <h4 className="font-medium text-green-900 mb-2">Well-Aligned Foundational Content</h4>
              <p className="text-sm text-green-800">
                Questions 1, 3, and 6 are well-matched with slide content. These test foundational 
                understanding that is thoroughly covered in the presentation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Items Summary */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4">Recommended Action Items</h3>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white text-slate-800 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <span>Add a slide covering Jaccard similarity with formula and examples</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white text-slate-800 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <span>Include comparison explanations (e.g., why cosine similarity vs Euclidean distance)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white text-slate-800 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <span>Add worked examples and application scenarios to existing slides</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white text-slate-800 rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              <span>Consider including practice problems that match the quiz's cognitive level</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
