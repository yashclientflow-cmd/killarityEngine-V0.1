import type { Report } from "./reportSchema";

export interface SavedReport {
  id: string;
  report: Report;
  savedAt: string;
  idea: string;
}

const STORAGE_KEY = "kallarity_saved_reports";

export const saveReport = (report: Report, reportId: string): void => {
  try {
    const savedReports = getSavedReports();
    
    const savedReport: SavedReport = {
      id: reportId,
      report,
      savedAt: new Date().toISOString(),
      idea: report.meta.idea,
    };

    const existingIndex = savedReports.findIndex((r) => r.id === reportId);
    
    if (existingIndex >= 0) {
      savedReports[existingIndex] = savedReport;
    } else {
      savedReports.unshift(savedReport);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReports));
  } catch (error) {
    console.error("Error saving report:", error);
    throw new Error("Failed to save report");
  }
};

export const getSavedReports = (): SavedReport[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading saved reports:", error);
    return [];
  }
};

export const getSavedReport = (id: string): SavedReport | null => {
  const savedReports = getSavedReports();
  return savedReports.find((r) => r.id === id) || null;
};

export const deleteSavedReport = (id: string): void => {
  try {
    const savedReports = getSavedReports();
    const filtered = savedReports.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting report:", error);
    throw new Error("Failed to delete report");
  }
};

export const isReportSaved = (id: string): boolean => {
  const savedReports = getSavedReports();
  return savedReports.some((r) => r.id === id);
};

