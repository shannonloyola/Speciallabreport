import { useRef } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, Presentation, CheckCircle2, Settings, Play, AlertTriangle } from "lucide-react";
import { useAnalysis } from "../context/AnalysisContext";

export function UploadPage() {
  const navigate = useNavigate();
  const quizRef = useRef<HTMLInputElement>(null);
  const slideRef = useRef<HTMLInputElement>(null);
  const { quizFile, slideFile, setQuizFile, setSlideFile, runAnalysis, isAnalyzing, error } = useAnalysis();

  const onQuizFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setQuizFile(file);
  };

  const onSlideFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSlideFile(file);
  };

  const handleRunAnalysis = async () => {
    const success = await runAnalysis();
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Your Files</h1>
          <p className="text-slate-600">
            Upload your quiz and presentation files to start analyzing concept alignment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quiz Upload */}
            <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Quiz File</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Upload your quiz questions (PDF, DOCX, TXT)
                </p>
                <input
                  ref={quizRef}
                  type="file"
                  accept=".txt,.docx,.pdf"
                  onChange={onQuizFileChanged}
                  className="hidden"
                />
                <button
                  onClick={() => quizRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>
              </div>

              {quizFile && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900">{quizFile.name}</p>
                    <p className="text-xs text-green-700">{(quizFile.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                  </div>
                </div>
              )}
            </div>

            {/* Slides Upload */}
            <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8 hover:border-purple-400 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Presentation className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Presentation File</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Upload your lesson slides (PPTX, PDF, TXT)
                </p>
                <input
                  ref={slideRef}
                  type="file"
                  accept=".pptx,.pdf,.txt"
                  onChange={onSlideFileChanged}
                  className="hidden"
                />
                <button
                  onClick={() => slideRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>
              </div>

              {slideFile && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900">{slideFile.name}</p>
                    <p className="text-xs text-green-700">{(slideFile.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                  </div>
                </div>
              )}
            </div>

            {/* Error / Run Analysis Button */}
            {error && (
              <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}
            {quizFile && slideFile && (
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Analysis
                  </>
                )}
              </button>
            )}
          </div>

          {/* Configuration Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Analysis Settings</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Analysis Mode
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Standard</option>
                  <option>Deep Analysis</option>
                  <option>Quick Scan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Matching Depth
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>High Precision</option>
                  <option>Balanced</option>
                  <option>High Recall</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Coverage Sensitivity
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Lenient</span>
                  <span>Strict</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Enable Cognitive-Level Check
                    </p>
                    <p className="text-xs text-slate-500">
                      Compare thinking levels required
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-900">
                <strong>Tip:</strong> Standard mode works great for most quizzes. 
                Use Deep Analysis if you want more detailed explanations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
