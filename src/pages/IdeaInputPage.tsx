import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const steps = [
  { id: 1, title: "The Idea" },
  { id: 2, title: "Founder Context" },
  { id: 3, title: "Constraints" }
];

export const IdeaInputPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showInterimOverlay, setShowInterimOverlay] = useState(false);
  const [overlayTextIndex, setOverlayTextIndex] = useState(0);

  const [formData, setFormData] = useState({
    idea: '',
    problem: '',
    icp: '',
    role: '',
    hours: '',
    budget: 500,
    skill: 50,
    audience: '0'
  });

  // -------------------------------
  //  INTERIM OVERLAY TEXT ROTATION
  // -------------------------------
  const overlayTexts = [
    "Analyzing your idea…",
    "Scanning real market data…",
    "Evaluating trend + demand signals…",
    "Estimating your 7-Day Execution Blueprint…",
    "Preparing founder-fit analysis…"
  ];

  // -------------------------------
  //  FIXED FINAL SUBMIT HANDLER
  // -------------------------------
  const handleSubmit = async () => {
    // Show interim overlay immediately
    setShowInterimOverlay(true);
    setOverlayTextIndex(0);
    setIsLoading(true);

    // Rotate overlay text
    const textInterval = setInterval(() => {
      setOverlayTextIndex(prev => (prev + 1) % overlayTexts.length);
    }, 600);

    // Ensure overlay shows for at least 1.5 seconds for better UX
    const minDisplayTime = Promise.resolve().then(() => new Promise(resolve => setTimeout(resolve, 1500)));

    try {
      // Direct call to n8n webhook (Vite doesn't support API routes like Next.js)
      const webhookURL = import.meta.env.VITE_N8N_WEBHOOK_URL || 
        "https://yashxen414.app.n8n.cloud/webhook/report-nnn";

      const fetchPromise = fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Wait for both the API call and minimum display time
      const [response] = await Promise.all([fetchPromise, minDisplayTime]);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();

      // Transform n8n response to match Report schema
      const { transformN8nReportToReport } = await import("../lib/reportTransformer");
      
      // Generate a unique report ID
      const generatedReportId = `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const transformedData = transformN8nReportToReport(
        rawData,
        formData.idea,
        generatedReportId
      );

      // Save transformed report so ReportPage can load it
      localStorage.setItem("latest_report", JSON.stringify(transformedData));

      clearInterval(textInterval);
      navigate('/loading'); // Continue the flow
    } catch (err) {
      console.error("Submit error:", err);
      clearInterval(textInterval);
      setShowInterimOverlay(false);
      alert(`Error sending data to backend: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------
  //  STEP NAVIGATION
  // -------------------------------
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      
      {/* Interim Loading Overlay */}
      <AnimatePresence>
        {showInterimOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto w-16 h-16"
              >
                <Loader2 className="w-16 h-16 text-sky-400" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={overlayTextIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-medium text-slate-200"
                >
                  {overlayTexts[overlayTextIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <motion.span 
              key={step.id}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: step.id <= currentStep ? 1 : 0.5 }}
              className={`text-sm font-medium ${step.id <= currentStep ? 'text-sky-400' : 'text-slate-600'}`}
            >
              {step.title}
            </motion.span>
          ))}
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <Card className="min-h-[400px] flex flex-col justify-between">
        <div className="space-y-6">

          {/* ------------------ STEP 1 ------------------ */}
          {currentStep === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-white"
              >
                What are you building?
              </motion.h2>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Describe your idea</label>
                <textarea 
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
                  value={formData.idea}
                  onChange={(e) => setFormData({...formData, idea: e.target.value})}
                  placeholder="AI tool that turns long voice notes into structured tasks."
                />
                <p className="mt-1.5 text-xs text-slate-500">Example: AI tool that turns long voice notes into structured tasks.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">What problem does it solve?</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                  placeholder="Teams waste 3–5 hours syncing messy client requirements."
                />
                <p className="mt-1.5 text-xs text-slate-500">Example: Teams waste 3–5 hours syncing messy client requirements.</p>
              </div>
            </motion.div>
          )}

          {/* ------------------ STEP 2 ------------------ */}
          {currentStep === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-white"
              >
                Founder Context
              </motion.h2>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Who is this for? (ICP)</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30 transition-all"
                  value={formData.icp}
                  onChange={(e) => setFormData({...formData, icp: e.target.value})}
                  placeholder="Solo founders building SaaS with limited budget."
                />
                <p className="mt-1.5 text-xs text-slate-500">Example: Solo founders building SaaS with limited budget.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Your Role</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="solo">Solo Founder</option>
                    <option value="dev">Developer</option>
                    <option value="marketer">Marketer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Hours/Week</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200"
                    value={formData.hours}
                    onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="5-10">5–10</option>
                    <option value="10-20">10–20</option>
                    <option value="20+">20+</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ------------------ STEP 3 ------------------ */}
          {currentStep === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-white"
              >
                Constraints & Assets
              </motion.h2>

              {/* Budget */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400">Monthly Budget</label>
                  <span className="text-sky-400 font-mono">${formData.budget}</span>
                </div>
                <input 
                  type="range" min="0" max="5000" step="100"
                  className="w-full"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                />
              </div>

              {/* Skill */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400">Technical Skill</label>
                  <span className="text-sky-400 font-mono">{formData.skill}</span>
                </div>

                <input 
                  type="range" min="0" max="100"
                  className="w-full"
                  value={formData.skill}
                  onChange={(e) => setFormData({...formData, skill: Number(e.target.value)})}
                />
              </div>

              {/* Audience */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current Audience</label>
                <div className="grid grid-cols-4 gap-2">
                  {['0', '<1k', '1-10k', '10k+'].map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-2 rounded-lg border text-sm transition-all ${
                        formData.audience === opt
                          ? 'bg-sky-500/20 border-sky-500 text-sky-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                      onClick={() => setFormData({...formData, audience: opt})}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-8 border-t border-slate-800/50 mt-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Button
            className="w-32"
            isLoading={isLoading}
            onClick={currentStep === 3 ? handleSubmit : handleNext}
          >
            {currentStep === 3 ? (
              <>Run Analysis <Sparkles className="w-4 h-4 ml-2" /></>
            ) : (
              <>Next <ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IdeaInputPage;