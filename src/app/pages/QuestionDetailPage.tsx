import { useParams, Link } from "react-router";
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle, FileText, Lightbulb, Brain } from "lucide-react";
import { useAnalysis, getDemoAnalysis } from "../context/AnalysisContext";
import { StatusBadge } from "../components/ui/status-badge";

export function QuestionDetailPage() {
  const { id } = useParams();
  const { analysisResult, demoMode } = useAnalysis();
  const source = demoMode || !analysisResult.questions.length ? getDemoAnalysis() : analysisResult;
  const question = source.questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Question Not Found</h1>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Question Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">Q{question.id}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Question {question.id}</h1>
                <p className="text-slate-600">Detailed analysis and recommendations</p>
              </div>
            </div>
            <StatusBadge status={question.coverageStatus} />
          </div>

          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <p className="text-slate-900 leading-relaxed">{question.questionText}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
              <Brain className="w-4 h-4" />
              {question.concept}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
              Cognitive Level: {question.cognitiveLevel}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
              Confidence: {Math.round(question.confidence * 100)}%
            </span>
          </div>
        </div>

        {/* Matching Slides */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Best Matching Slide</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-medium text-blue-900">{question.bestMatchingSlide}</p>
              <p className="text-sm text-blue-700 mt-2">
                This slide provides the primary content relevant to this question.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-slate-900">Supporting Slide</h3>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="font-medium text-purple-900">{question.secondBestSlide}</p>
              <p className="text-sm text-purple-700 mt-2">
                Additional context and information can be found here.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Explanation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">Why This Coverage Status?</h3>
          <p className="text-slate-700 leading-relaxed">{question.explanation}</p>
        </div>

        {/* Supporting Evidence */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">Evidence from Slides</h3>
          <div className="space-y-3">
            {question.slideExcerpts.map((excerpt, index) => (
              <div key={index} className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                <p className="text-slate-800 italic">"{excerpt}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Quiz Requires</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{question.quizRequires}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Slides Provide</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{question.slidesSupport}</p>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Study Recommendation</h3>
              <p className="text-slate-700 leading-relaxed">{question.recommendation}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {question.id > 1 ? (
            <Link
              to={`/question/${question.id - 1}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Question
            </Link>
          ) : (
            <div />
          )}
          {question.id < source.questions.length && (
            <Link
              to={`/question/${question.id + 1}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Next Question
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
