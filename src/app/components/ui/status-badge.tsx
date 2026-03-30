import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

type CoverageStatus = "Fully Covered" | "Partially Covered" | "Not Covered";

interface StatusBadgeProps {
  status: CoverageStatus | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "Fully Covered":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "Partially Covered":
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case "Not Covered":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getBadgeClass = () => {
    switch (status) {
      case "Fully Covered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Partially Covered":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Not Covered":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-sm font-medium ${getBadgeClass()}`}>
      {getStatusIcon()}
      {status}
    </span>
  );
}
