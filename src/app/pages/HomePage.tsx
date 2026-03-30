import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Brain, Search, BarChart3, Sparkles } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            QuizAssess Sync
          </h1>
          <p className="text-xl text-slate-600 mb-3">
            Concept Alignment and Coverage Analyzer
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            Check whether your quiz questions are truly aligned with what was taught in your lesson slides. 
            Our system uses semantic analysis, concept matching, and intelligent recommendations to help you study smarter.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-lg font-medium border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Upload Quiz and Slides
              </h3>
              <p className="text-slate-600">
                Upload your quiz questions and PowerPoint presentation files in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Analyze Alignment
              </h3>
              <p className="text-slate-600">
                Our AI matches each question to slides and detects coverage gaps
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Review Insights and Recommendations
              </h3>
              <p className="text-slate-600">
                Get clear guidance on what to study and where to focus your time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Semantic Matching
              </h3>
              <p className="text-sm text-slate-600">
                Smart AI finds which slides relate to each question, even if wording differs
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Concept Detection
              </h3>
              <p className="text-sm text-slate-600">
                Automatically identifies the key topics and concepts being tested
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Coverage Analysis
              </h3>
              <p className="text-sm text-slate-600">
                See which questions are fully, partially, or not covered by your slides
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Smart Recommendations
              </h3>
              <p className="text-sm text-slate-600">
                Get personalized study tips and guidance for each question
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Understand Your Quiz Better?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start analyzing your quiz alignment in minutes. No technical knowledge required.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
