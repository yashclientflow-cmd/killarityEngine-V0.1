import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Search, Globe, BrainCircuit } from 'lucide-react';
import { Card } from '../components/ui/Card';

const steps = [
  { id: 1, text: "Deconstructing your idea...", icon: BrainCircuit },
  { id: 2, text: "Querying SerpAPI for search volume...", icon: Search },
  { id: 3, text: "Analyzing interest trends...", icon: Globe },
  { id: 4, text: "Spying on competitor traffic (SimilarWeb)...", icon: Globe },
  { id: 5, text: "Synthesizing brutal verdict...", icon: CheckCircle2 },
];

export const LoadingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [reportId, setReportId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get report ID from localStorage
    try {
      const reportData = localStorage.getItem("latest_report");
      if (reportData) {
        const parsed = JSON.parse(reportData);
        const id = parsed?.meta?.report_id || parsed?.id || "unknown";
        setReportId(id);
      }
    } catch (err) {
      console.error("Error reading report from localStorage:", err);
    }

    // Simulate steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    // Simulate logs
    const logMessages = [
      "Initializing KALLARITY ENGINE v2.1...",
      "Connection established to SerpAPI...",
      "Found 12.4k avg monthly searches for 'cofounder match'...",
      "Detected 3 serious competitors...",
      "Analyzing SimilarWeb traffic data...",
      "Calculating Founder-Market Fit score...",
      "Generating 7-day execution plan...",
      reportId ? `Finalizing report #${reportId}...` : "Finalizing report..."
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs(prev => [...prev, logMessages[logIndex]]);
        logIndex++;
      }
    }, 400);

    // Redirect
    const timeout = setTimeout(() => {
      const finalReportId = reportId || "unknown";
      navigate(`/report/${finalReportId}`);
    }, 4500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(logInterval);
      clearTimeout(timeout);
    };
  }, [navigate, reportId]);

  return (
    <div className="max-w-2xl mx-auto py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Analyzing Market Viability</h1>
        <p className="text-slate-400">Crunching real-time data points...</p>
      </div>

      <Card className="p-8 space-y-8">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-sky-500"
             initial={{ width: '0%' }}
             animate={{ width: '100%' }}
             transition={{ duration: 4.5, ease: "linear" }}
           />
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`w-6 h-6 flex items-center justify-center rounded-full ${idx < currentStep ? 'bg-green-500/20 text-green-500' : idx === currentStep ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-600'}`}>
                {idx < currentStep ? <CheckCircle2 className="w-4 h-4" /> : idx === currentStep ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <span className={`${idx === currentStep ? 'text-sky-400 font-medium' : idx < currentStep ? 'text-slate-300' : 'text-slate-600'}`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Terminal Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs h-48 overflow-hidden flex flex-col">
        <div className="text-slate-500 mb-2 border-b border-slate-800 pb-2 flex justify-between">
           <span>&gt; system_log.txt</span>
           <span className="animate-pulse">●</span>
        </div>
        <div className="flex-1 flex flex-col justify-end gap-1">
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-slate-300">
              <span className="text-sky-500 mr-2">&gt;</span>{log}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
