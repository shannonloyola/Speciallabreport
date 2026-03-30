import { Outlet, Link, useLocation } from "react-router";
import { Home, Upload, LayoutDashboard, FileSearch, Lightbulb, BarChart3 } from "lucide-react";

export function Layout() {
  const location = useLocation();
  
  const navigation = [
    { name: "Home", path: "/", icon: Home },
    { name: "Upload", path: "/upload", icon: Upload },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Question Analysis", path: "/question/1", icon: FileSearch },
    { name: "Recommendations", path: "/recommendations", icon: Lightbulb },
    { name: "Insights", path: "/insights", icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/question/1") return location.pathname.startsWith("/question");
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="font-semibold text-xl text-slate-900">QuizAssess Sync</h1>
            <p className="text-sm text-slate-500 mt-1">Concept Alignment Tool</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                SM
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Student Mode</p>
                <p className="text-xs text-slate-500">Learning Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        <Outlet />
      </main>
    </div>
  );
}
