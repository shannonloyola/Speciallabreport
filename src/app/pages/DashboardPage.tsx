import { useMemo, useState } from "react";
import { Link } from "react-router";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Search, Filter, TrendingUp, Brain, Lightbulb } from "lucide-react";
import { useAnalysis, getDemoAnalysis } from "../context/AnalysisContext";
import { StatusBadge } from "../components/ui/status-badge";

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { analysisResult, demoMode } = useAnalysis();

  const activeData = useMemo(() => {
    if (demoMode || !analysisResult || !analysisResult.questions.length) {
      return getDemoAnalysis();
    }
    return analysisResult;
  }, [analysisResult, demoMode]);

  const filteredQuestions = activeData.questions.filter((q) => {
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.concept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.coverageStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });



  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analysis Dashboard</h1>
          <p className="text-slate-600">
            Overview of quiz-to-slide alignment and coverage analysis
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Total Questions</div>
            <div className="text-3xl font-bold text-slate-900">{activeData.summary.totalQuestions}</div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="text-sm text-green-700 mb-1">Fully Covered</div>
            <div className="text-3xl font-bold text-green-900">{activeData.summary.fullyCovered}</div>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <div className="text-sm text-amber-700 mb-1">Partially Covered</div>
            <div className="text-3xl font-bold text-amber-900">{activeData.summary.partiallyCovered}</div>
          </div>

          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <div className="text-sm text-red-700 mb-1">Not Covered</div>
            <div className="text-3xl font-bold text-red-900">{activeData.summary.notCovered}</div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">Alignment Score</div>
            <div className="text-3xl font-bold text-blue-900">{activeData.summary.alignmentScore}%</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Coverage Distribution */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Coverage Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={activeData.coverageChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activeData.coverageChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Concept Coverage */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Concept Coverage
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activeData.conceptDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="concept" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="coverage" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Key Finding</h4>
                <p className="text-sm text-slate-700">
                  {activeData.summary.fullyCovered} questions are fully covered, {activeData.summary.partiallyCovered} partially.
                  Focus on under-covered concepts in recommendations for better alignment.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Cognitive Mismatch</h4>
                <p className="text-sm text-slate-700">
                  {activeData.summary.notCovered} questions are not covered, often due to cognitive mismatch.
                  Add examples and compare scenarios to support higher-level demand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Analysis Table */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Question Analysis</h3>
            
            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search questions or concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Filter className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="Fully Covered">Fully Covered</option>
                  <option value="Partially Covered">Partially Covered</option>
                  <option value="Not Covered">Not Covered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Question No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Detected Concept
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Best Matching Slide
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Coverage Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-slate-900">Q{question.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                        {question.concept}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{question.bestMatchingSlide}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={question.coverageStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-16">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${question.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {Math.round(question.confidence * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/question/${question.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
