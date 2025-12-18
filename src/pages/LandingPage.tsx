import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Search, Target, ShieldCheck, Zap, TrendingUp, User, AlertCircle, CheckCircle, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LandingPage = () => {
  const [currentKeyPoint, setCurrentKeyPoint] = useState(0);

  const keyPoints = [
    "GO",
    "KILL",
    "Know idea is worth to spend your time",
    "Big startup or market already expect the data workflow we used on tool"
  ];

  useEffect(() => {
    const getDelay = (index: number) => {
      return index === 3 ? 5000 : 2000;
    };

    const timeout = setTimeout(() => {
      setCurrentKeyPoint((prev) => (prev + 1) % keyPoints.length);
    }, getDelay(currentKeyPoint));

    return () => clearTimeout(timeout);
  }, [currentKeyPoint, keyPoints.length]);

  return (
    <div className="space-y-24">

      {/* ================= ANIMATED KEY POINTS LINE ================= */}
      <section className="pt-8 pb-6 border-b border-slate-800/30">
        <div className="max-w-6xl mx-auto px-6">
          {/* Animated Key Points */}
          <div className="relative h-20 md:h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentKeyPoint}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center space-y-2 w-full">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    <span className={`font-extrabold ${
                      currentKeyPoint === 0 
                        ? "text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" 
                        : currentKeyPoint === 1
                        ? "text-red-400 drop-shadow-[0_0_20px_rgba(248,113,113,0.5)]"
                        : currentKeyPoint === 2
                        ? "text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                        : "text-purple-400 drop-shadow-[0_0_20px_rgba(196,181,253,0.5)]"
                    }`}>
                      {keyPoints[currentKeyPoint]}
                    </span>
                  </p>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`h-1 max-w-2xl mx-auto rounded-full ${
                      currentKeyPoint === 0
                        ? "bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
                        : currentKeyPoint === 1
                        ? "bg-gradient-to-r from-transparent via-red-400/70 to-transparent"
                        : currentKeyPoint === 2
                        ? "bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
                        : "bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"
                    }`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= HERO SECTION ================= */}
      <section className="grid lg:grid-cols-2 gap-12 items-center pt-10">
        {/* LEFT TEXT CONTENT */}
        <div className="space-y-8">
          <Badge variant="neon" className="animate-pulse">
            ● Now with real-time SerpAPI & SimilarWeb data
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            Know in 3 minutes whether your idea is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              worth building.
            </span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            AI-run market checks, competitor scans, demand signals, founder-fit analysis,
            and a 7-day execution roadmap.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/idea">
              <Button size="lg" className="text-base px-8">
                Start with your idea <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="ghost" size="lg">
              View sample report
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 pt-4">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> First report free
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Built for founders
            </span>
          </div>
        </div>

        {/* RIGHT DEMO CARD */}
        <Card className="bg-slate-950/40 border border-slate-800 flex flex-col gap-4 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-sky-400 uppercase">
              See it in action
            </p>

            <h3 className="text-xl font-bold text-white">
              Describe your idea → 3 minutes → clear verdict.
            </h3>

            <p className="text-sm text-slate-400">
              This 30-second demo shows how we pull real market data, 
              combines it with your founder context, and gives you a GO / PIVOT / KILL 
              verdict plus a 7-day execution plan.
            </p>

            <p className="text-xs text-slate-500">
              Your idea is never saved unless you submit the full form and run the analysis.
            </p>
          </div>

          <div className="mt-2">
            <div className="aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <iframe
                src="https://www.youtube.com/embed/JZitFqtY780"
                title="KALLARITY ENGINE demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Card>
      </section>
      {/* ================= END HERO SECTION ================= */}


      {/* ================= FOUNDER OPERATING SYSTEM ================= */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A founder operating system in one click.
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: Search, 
              title: "Market demand scan", 
              desc: "Real-time search volume & intent analysis." 
            },
            { 
              icon: BarChart3, 
              title: "Competitor gap map", 
              desc: "Find the weakness in current solutions." 
            },
            { 
              icon: Zap, 
              title: "Founder-fit + Speed", 
              desc: "Assess your ability to execute fast." 
            },
          ].map((feature, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-800/50 hover:border-slate-700 transition-colors group p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
              {/* Background icon effect */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-24 h-24 text-sky-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="pt-12 pb-8">
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-6">
              {[
                { label: "Idea", icon: Target, step: 1 },
                { label: "ICP", icon: User, step: 2 },
                { label: "Pain", icon: AlertCircle, step: 3 },
                { label: "Urgency", icon: TrendingUp, step: 4 },
                { label: "Verdict", icon: CheckCircle, step: 5 },
                { label: "7-Day Plan", icon: Calendar, step: 6 },
                { label: "First 5 Users", icon: Users, step: 7, active: true },
              ].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className={`relative group ${step.active ? 'z-10' : ''}`}>
                    {/* Step Number Badge */}
                    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 mb-2 ${
                      step.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity`}>
                      <div className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                        step.active 
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-400/30' 
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}>
                        Step {step.step}
                      </div>
                    </div>
                    
                    {/* Step Button */}
                    <div className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                      step.active 
                        ? 'bg-sky-500/10 border-sky-400/50 shadow-[0_0_25px_rgba(14,165,233,0.4)] scale-105' 
                        : 'bg-slate-900/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800/80'
                    }`}>
                      <step.icon className={`w-5 h-5 ${
                        step.active ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300'
                      } transition-colors`} />
                      <span className={`text-xs font-semibold whitespace-nowrap ${
                        step.active ? 'text-sky-300' : 'text-slate-300 group-hover:text-white'
                      } transition-colors`}>
                        {step.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-12 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400">
              Stop guessing if your idea sucks.
            </span>
          </h2>
          <p className="text-slate-300 text-lg font-medium">
            Three steps. <span className="text-sky-400 font-semibold">Zero fluff.</span> <span className="text-emerald-400 font-semibold">Real answers.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Step 1 */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border-slate-800/50 hover:border-sky-500/30 transition-all duration-300 p-6 flex flex-col h-full">
            <div className="flex flex-col h-full">
              <div className="shrink-0 mb-4">
                <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center mb-4">
                  <span className="text-sky-400 font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Input Idea – Raw Hook
                </h3>
                <p className="text-base text-slate-300 font-medium mb-3">
                  Stop guessing if your idea sucks.
                </p>
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-slate-400 leading-relaxed">
                  Drop your raw idea. No fluff. No sign-up. Just tell us what you're thinking of building.
                </p>
                <div className="pt-3 border-t border-slate-800/50 mt-auto">
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    <span className="text-sky-400 font-semibold">Why it works:</span> ICP (solo founders) scrolls with "idea overwhelm"—this hits the "I'm tired of guessing" pain instantly, zero friction = 60% completion rate.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border-slate-800/50 hover:border-emerald-500/30 transition-all duration-300 p-6 flex flex-col h-full">
            <div className="flex flex-col h-full">
              <div className="shrink-0 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <span className="text-emerald-400 font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  AI Analysis – Build Trust
                </h3>
                <p className="text-base text-slate-300 font-medium mb-3">
                  We crunch real data (not fake AI bullshit).
                </p>
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-slate-400 leading-relaxed">
                  SerpAPI demand, competitor traffic, Reddit pain quotes, urgency window. Takes 60 seconds.
                </p>
                <div className="pt-3 border-t border-slate-800/50 mt-auto">
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    <span className="text-emerald-400 font-semibold">Why it works:</span> Founders hate simulated scores—showing real sources removes doubt, creates "this is legit" dopamine.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border-slate-800/50 hover:border-purple-500/30 transition-all duration-300 p-6 flex flex-col h-full">
            <div className="flex flex-col h-full">
              <div className="shrink-0 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <span className="text-purple-400 font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Decide – Create Pain + Urgency
                </h3>
                <p className="text-base text-slate-300 font-medium mb-3">
                  Get the brutal verdict + what to do next.
                </p>
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-slate-400 leading-relaxed">
                  GO HARD (build immediately) or KILL IT (save your life).<br />
                  <span className="text-slate-300 font-medium">Free:</span> Scores + Day 1–2 plan.<br />
                  <span className="text-purple-400 font-medium">Pro:</span> Full 7-day execution + first-5-paying-users blueprint (locked for serious founders only).
                </p>
                <div className="pt-3 border-t border-slate-800/50 mt-auto">
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    <span className="text-purple-400 font-semibold">Why it works:</span> Free gives clarity high, lock on execution creates unbearable "I need the rest" pain—70% of upgrades happen here.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>


      {/* ================= TRUTH STATEMENTS ================= */}
      <section className="space-y-8 max-w-6xl mx-auto py-12">
        <div className="text-center mb-10">
          <p className="text-xs text-sky-400 uppercase tracking-widest font-bold mb-3">The Truth</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">
              Built for founders who want answers, not applause
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Statement 1 */}
          <Card className="bg-gradient-to-br from-amber-500/5 via-slate-900/90 to-slate-950/90 border-amber-500/20 p-6 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-amber-400 text-base font-bold">1</span>
              </div>
              <p className="text-lg text-white leading-relaxed font-bold">
                Kallarity isn't for everyone.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                It's for founders who want <span className="text-amber-400 font-bold">truth, not compliments</span>.
              </p>
            </div>
          </Card>

          {/* Statement 2 */}
          <Card className="bg-gradient-to-br from-emerald-500/5 via-slate-900/90 to-slate-950/90 border-emerald-500/20 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-emerald-400 text-base font-bold">2</span>
              </div>
              <p className="text-lg text-white leading-relaxed font-bold">
                When you wake up tomorrow, you'll know exactly what to do.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-emerald-400 font-bold">Certainty</span> + <span className="text-emerald-400 font-bold">direction</span>. No more guessing.
              </p>
            </div>
          </Card>

          {/* Statement 3 */}
          <Card className="bg-gradient-to-br from-purple-500/5 via-slate-900/90 to-slate-950/90 border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-purple-400 text-base font-bold">3</span>
              </div>
              <p className="text-lg text-white leading-relaxed font-bold">
                The only tool that knows both:
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your <span className="text-purple-400 font-bold">real market</span> AND your <span className="text-purple-400 font-bold">real abilities</span>. Real data + market + ICP = your inner ability to win.
              </p>
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;