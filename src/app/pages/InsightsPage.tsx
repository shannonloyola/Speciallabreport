import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, PieChart, Pie } from "recharts";
import { TrendingUp, Brain, Activity } from "lucide-react";
import { useAnalysis, getDemoAnalysis } from "../context/AnalysisContext";

export function InsightsPage() {
  const { analysisResult, demoMode } = useAnalysis();
  const activeData = demoMode || !analysisResult.questions.length ? getDemoAnalysis() : analysisResult;

  const mappingData = activeData.questions.map((q) => ({
    question: `Q${q.id}`,
    slide: Number((q.bestMatchingSlide.match(/\d+/)?.[0] ?? 0)),
    strength: Math.round(q.confidence * 100),
  }));

  const topicBalanceData = activeData.conceptDistribution.map((entry) => ({
    topic: entry.concept,
    value: entry.coverage,
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Visual Insights</h1>
          <p className="text-slate-600">
            Detailed analytics and visualizations of quiz-slide alignment
          </p>
        </div>

        {/* Top Row - Coverage and Cognitive Level */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Coverage Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Coverage Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={activeData.coverageChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activeData.coverageChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Insight:</strong> 37.5% of questions are fully covered, while 50% need additional study materials for complete understanding.
              </p>
            </div>
          </div>

          {/* Cognitive Level Comparison */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-slate-900">Cognitive Level Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={activeData.cognitiveLevelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quiz" fill="#6366f1" name="Quiz Questions" radius={[8, 8, 0, 0]} />
                <Bar dataKey="slides" fill="#a855f7" name="Slide Coverage" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-900">
                <strong>Insight:</strong> Quiz emphasizes "Analyze" level questions, but slides focus more on "Remember" and "Understand" levels.
              </p>
            </div>
          </div>
        </div>

        {/* Concept Coverage Heatmap */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-slate-900">Concept Coverage Heatmap</h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={activeData.conceptDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="concept" type="category" width={150} tick={{ fontSize: 13 }} />
              <Tooltip />
              <Bar dataKey="coverage" radius={[0, 8, 8, 0]}>
                {conceptDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.coverage >= 80
                        ? "#10b981"
                        : entry.coverage >= 60
                        ? "#f59e0b"
                        : "#ef4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-slate-700">≥80% Coverage</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-amber-500 rounded" />
              <span className="text-slate-700">60-79% Coverage</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span className="text-slate-700">&lt;60% Coverage</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Question-to-Slide Mapping */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Question-to-Slide Mapping</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mappingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="question" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="strength" name="Match Strength (%)" radius={[8, 8, 0, 0]}>
                  {mappingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.strength >= 80
                          ? "#10b981"
                          : entry.strength >= 60
                          ? "#f59e0b"
                          : "#ef4444"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> Each bar shows how strongly a question matches its best corresponding slide. Higher values indicate better alignment.
              </p>
            </div>
          </div>

          {/* Topic Balance Radar */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Topic Balance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={topicBalanceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="topic" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Coverage %"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Analysis:</strong> Most topics show balanced coverage except "Similarity Metrics" which needs expansion.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Insights */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-semibold text-green-900 mb-2">Strong Areas</h4>
            <p className="text-sm text-green-800">
              TF-IDF, Text Preprocessing, and Feature Extraction show excellent alignment with high coverage scores.
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
            <h4 className="font-semibold text-amber-900 mb-2">Needs Attention</h4>
            <p className="text-sm text-amber-800">
              Cosine Similarity and Classification concepts need more depth to match quiz question requirements.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-6">
            <h4 className="font-semibold text-red-900 mb-2">Critical Gap</h4>
            <p className="text-sm text-red-800">
              Similarity Metrics (especially Jaccard) is significantly under-covered and requires new content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
