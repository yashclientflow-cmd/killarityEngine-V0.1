import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useUser } from '../context/UserContext';

interface RealityCheckAnswers {
  has_interest: boolean | null;
  right_people: boolean | null;
  paying_users: boolean | null;
}

export const RealityCheckPage = () => {
  const navigate = useNavigate();
  const { formData, reportPayload, setFormData } = useUser();
  const [answers, setAnswers] = useState<RealityCheckAnswers>({
    has_interest: null,
    right_people: null,
    paying_users: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    {
      key: 'has_interest' as const,
      text: 'Have any strangers (not friends) shown interest in this idea?',
    },
    {
      key: 'right_people' as const,
      text: 'Are those people the same ones who would actually pay?',
    },
    {
      key: 'paying_users' as const,
      text: 'Has anyone paid or used it consistently for 30+ days?',
    },
  ];

  const handleAnswer = (key: keyof RealityCheckAnswers, value: boolean) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const isComplete = Object.values(answers).every(v => v !== null);

  const handleContinue = async () => {
    if (!isComplete || !formData) return;
    
    setIsLoading(true);
    try {
      // Combine original form data (8 fields) with reality check answers (3 fields)
      const submitData = {
        ...formData,
        has_interest: answers.has_interest,
        right_people: answers.right_people,
        paying_users: answers.paying_users,
      };

      // Call the n8n webhook with all 11 fields
      const webhookURL = import.meta.env.VITE_N8N_WEBHOOK_URL || 
        "https://yashufo.app.n8n.cloud/webhook/report-nbn";

      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();

      // Generate a unique report ID
      const generatedReportId = `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Transform n8n response to match Report schema
      const { transformN8nReportToReport } = await import("../lib/reportTransformer");
      const transformedData = transformN8nReportToReport(
        rawData,
        formData.idea,
        generatedReportId
      );

      // Save transformed report to localStorage
      localStorage.setItem("latest_report", JSON.stringify(transformedData));

      // Store reality check answers in localStorage for display in report
      localStorage.setItem("reality_check_answers", JSON.stringify({
        has_interest: answers.has_interest,
        right_people: answers.right_people,
        paying_users: answers.paying_users,
      }));

      // Clear temporary data from context
      setFormData(null);

      // Navigate to report page with the ID
      navigate(`/report/${generatedReportId}`);
    } catch (err) {
      console.error("Error processing reality check:", err);
      setIsLoading(false);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="space-y-8 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <h2 className="text-3xl font-bold text-white">Reality Check</h2>
          <p className="text-slate-400">
            Let's validate your idea with real market signals.
          </p>
        </motion.div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <motion.div
              key={question.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="text-lg font-semibold text-slate-300 mt-1">
                  {index + 1}.
                </div>
                <p className="text-lg text-slate-200 pt-1">{question.text}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAnswer(question.key, true)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    answers[question.key] === true
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {answers[question.key] === true && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    Yes
                  </span>
                </button>

                <button
                  onClick={() => handleAnswer(question.key, false)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    answers[question.key] === false
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {answers[question.key] === false && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    No
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Helper Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-sm text-slate-500"
        >
          Your honest answers help us provide more accurate insights about your
          idea's market fit.
        </motion.p>

        {/* Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-800/50">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!isComplete}
            isLoading={isLoading}
            className="w-40"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4 ml-2" /></>}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RealityCheckPage;
