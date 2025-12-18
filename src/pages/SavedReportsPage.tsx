import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkCheck, Trash2, Calendar, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { getSavedReports, deleteSavedReport, type SavedReport } from "../lib/savedReports";

export default function SavedReportsPage() {
  const navigate = useNavigate();
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const reports = getSavedReports();
    setSavedReports(reports);
    setIsLoading(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this saved report?")) {
      deleteSavedReport(id);
      loadReports();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="text-slate-400">Loading saved reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Saved Reports</h1>
          <p className="text-slate-400 mt-2">
            Access your saved validation reports anytime
          </p>
        </div>
      </div>

      {savedReports.length === 0 ? (
        <Card className="p-12 text-center">
          <BookmarkCheck className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No Saved Reports</h2>
          <p className="text-slate-400 mb-6">
            Save reports from the report page to access them here later
          </p>
          <Button onClick={() => navigate("/idea")}>
            Generate New Report
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedReports.map((savedReport) => (
            <Card
              key={savedReport.id}
              className="cursor-pointer hover:border-sky-500/50 transition-colors group"
              onClick={() => navigate(`/report/${savedReport.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge variant="success" className="text-xs">
                  <BookmarkCheck className="w-3 h-3 mr-1" />
                  Saved
                </Badge>
                <button
                  onClick={(e) => handleDelete(savedReport.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/10 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {savedReport.idea}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(savedReport.savedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Report ID:</span>
                  <code className="text-sky-400">{savedReport.id}</code>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <Badge
                  variant={
                    savedReport.report.verdict.label === "GO HARD"
                      ? "success"
                      : savedReport.report.verdict.label === "KILL IT"
                      ? "danger"
                      : "warning"
                  }
                  className="text-xs"
                >
                  {savedReport.report.verdict.label}
                </Badge>
                <div className="flex-1"></div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

