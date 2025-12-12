import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Search, Target, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24">

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
              This 30-second demo shows how KillarityEngine pulls real market data, 
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
                title="KillarityEngine demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Card>
      </section>
      {/* ================= END HERO SECTION ================= */}


      {/* ================= FEATURE ROW ================= */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Search, title: "Market Scan", desc: "Real-time search volume & trends." },
          { icon: Target, title: "Competitor Spy", desc: "Traffic sources & keyword gaps." },
          { icon: BarChart3, title: "Execution Plan", desc: "Day-by-day roadmap to launch." },
        ].map((feature, i) => (
          <Card key={i} className="hover:bg-slate-800/50 transition-colors group p-6">
            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-sky-500/10 transition-colors">
              <feature.icon className="w-6 h-6 text-slate-400 group-hover:text-sky-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.desc}</p>
          </Card>
        ))}
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="text-center space-y-12 py-12">
        <h2 className="text-3xl font-bold text-white">Stop building in the dark.</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-slate-800 -z-10" />

          {[
            { step: "1", title: "Input Idea", desc: "Tell us what you're thinking." },
            { step: "2", title: "AI Analysis", desc: "We crunch millions of data points." },
            { step: "3", title: "Decide", desc: "Get a clear GO / NO-GO verdict." },
          ].map((item, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-64">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-950 font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ================= TESTIMONIAL ================= */}
      <section className="max-w-3xl mx-auto">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-900/50 border-slate-800 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-slate-700 overflow-hidden shrink-0">
              <img
                src="https://youtube.com/shorts/JZitFqtY780?si=zXtW9wfEelP0Gcqi"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-lg text-slate-300 italic">
                "I spent 6 months building an app nobody downloaded. KALLARITY ENGINE would
                have saved that time for $0. It's brutally honest, and that's exactly what
                I needed."
              </p>
              <div>
                <p className="text-white font-semibold">Alex Chen</p>
                <p className="text-sm text-slate-500">Indie Hacker & Full-stack Dev</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
};

export default LandingPage;