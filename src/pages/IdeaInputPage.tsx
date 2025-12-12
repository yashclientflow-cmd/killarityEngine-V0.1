import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/loading');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <span 
              key={step.id}
              className={`text-sm font-medium ${step.id <= currentStep ? 'text-sky-400' : 'text-slate-600'}`}
            >
              {step.title}
            </span>
          ))}
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-sky-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <Card className="min-h-[400px] flex flex-col justify-between">
        <div className="space-y-6">
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h2 className="text-2xl font-bold text-white">What are you building?</h2>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Describe your idea in detail</label>
                <textarea 
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="A SaaS that helps..."
                  value={formData.idea}
                  onChange={(e) => setFormData({...formData, idea: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">What specific problem does it solve?</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="e.g. Reduces time spent on X by 50%"
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Founder Context</h2>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Who is this for? (ICP)</label>
                <input 
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="e.g. Marketing agencies with 10-50 employees"
                  value={formData.icp}
                  onChange={(e) => setFormData({...formData, icp: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Your Role</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    value={formData.hours}
                    onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="5-10">5-10 hrs</option>
                    <option value="10-20">10-20 hrs</option>
                    <option value="20+">Full time</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Constraints & Assets</h2>
              
              <div>
                <div className="flex justify-between mb-2">
                   <label className="text-sm font-medium text-slate-400">Monthly Budget</label>
                   <span className="text-sky-400 font-mono">${formData.budget}</span>
                </div>
                <input 
                  type="range" min="0" max="5000" step="100"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                   <label className="text-sm font-medium text-slate-400">Technical Skill</label>
                   <span className="text-sky-400 font-mono">{formData.skill > 70 ? 'Full Stack' : formData.skill > 30 ? 'Low Code' : 'Non-Technical'}</span>
                </div>
                <input 
                  type="range" min="0" max="100"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  value={formData.skill}
                  onChange={(e) => setFormData({...formData, skill: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current Audience Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {['0', '< 1k', '1-10k', '10k+'].map(opt => (
                    <button
                      key={opt}
                      className={`py-2 rounded-lg border text-sm ${formData.audience === opt ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                      onClick={() => setFormData({...formData, audience: opt})}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex justify-between pt-8 border-t border-slate-800/50 mt-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handleNext} className="w-32">
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
