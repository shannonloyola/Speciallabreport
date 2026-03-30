import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { UploadPage } from "./pages/UploadPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestionDetailPage } from "./pages/QuestionDetailPage";
import { RecommendationsPage } from "./pages/RecommendationsPage";
import { InsightsPage } from "./pages/InsightsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "upload", Component: UploadPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "question/:id", Component: QuestionDetailPage },
      { path: "recommendations", Component: RecommendationsPage },
      { path: "insights", Component: InsightsPage },
    ],
  },
]);
