import { useState } from "react";
import First5Blueprint from "./First5Blueprint";
import {
  Download,
  Search,
  TrendingUp,
  UserCheck,
  Timer,
  Zap,
  Target,
  Brain,
  ShieldAlert,
  Flame,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  Lock,
  ExternalLink,
  FileText,
  MousePointerClick,
  Copy,
  Clock,
  CheckSquare,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useUser } from "../context/UserContext";
import { UpgradeModal } from "../components/modals/UpgradeModal";
import type { ReportDay } from "../lib/reportSchema";

// 👉 USING MOCK DATA ONLY
import { mockReport } from "../data/mockReport";

export default function ReportPage() {
  const report = mockReport;
  return <ReportViewer report={report} id="demo" />;
}

export const ReportViewer = ({ report, id }: { report: any; id?: string }) => {
  const { userPlan } = useUser();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});

  const handlePdfClick = () => {
    if (!userPlan || userPlan === "free") {
      setIsUpgradeModalOpen(true);
    } else {
      alert("Downloading PDF…");
    }
  };

  const ScoreCard = ({ title, score }: { title: string; score: number }) => (
    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
      <div className="flex justify-between items-end mb-2">
        <span className="text-slate-400 text-sm">{title}</span>
        <span
          className={`text-xl font-bold ${
            score > 80
              ? "text-emerald-400"
              : score > 50
              ? "text-amber-400"
              : "text-red-400"
          }`}
        >
          {score}
        </span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            score > 80
              ? "bg-emerald-500"
              : score > 50
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  const finalVerdict = (() => {
    const label = report.verdict?.label || "";

    if (label === "GO HARD") {
      return {
        word: "GO",
        points: [
          "Strong real demand + rising interest.",
          "Fast execution with low complexity.",
          "Main risk: moving too slow, not building."
        ]
      };
    }

    if (label === "PIVOT") {
      return {
        word: "PIVOT",
        points: [
          "Some signal, but angle / ICP mismatch.",
          "Refine positioning or target ICP.",
          "Test a sharper wedge before committing."
        ]
      };
    }

    if (label === "KILL IT") {
      return {
        word: "KILL",
        points: [
          "Weak demand or heavy competition.",
          "High chance of wasting 6–12 months.",
          "Drop fast and test a stronger idea."
        ]
      };
    }

    return {
      word: "GO",
      points: [
        "Good enough signal for a fast test.",
        "You have execution advantage.",
        "Act now and gather real-world feedback."
      ]
    };
  })();

  const verdictColor =
    finalVerdict.word === "GO"
      ? "text-emerald-400"
      : finalVerdict.word === "PIVOT"
      ? "text-sky-400"
      : "text-red-500";

  return (
    <div className="space-y-10 md:space-y-16 pb-24">
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      {/* ========================= SECTION 1 — HEADER ========================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
  <div>
    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
      <span>Report #{id}</span>
      <span>•</span>
      <span>{new Date(report.meta.created_at).toLocaleDateString()}</span>
    </div>
    <h1 className="text-2xl font-bold text-white">{report.meta.idea}</h1>
  </div>

  {/* RIGHT SIDE BUTTON GROUP */}
  <div className="flex items-center gap-3">
    
    {/* Market Window + Trend Link */}
    <div>
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        ⚠ MARKET WINDOW CLOSING
      </div>
      <a
        href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(report.meta.idea)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-slate-400 hover:text-slate-300 mt-1 block"
      >
        Why is interest rising?
      </a>
    </div>

    {/* Share Button */}
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        const url = window.location.href;

        if (navigator.share) {
          await navigator.share({
            title: "KALLARITY ENGINE Report",
            text: "Check out this idea validation report",
            url,
          });
        } else {
          await navigator.clipboard.writeText(url);
          alert("Link copied!");
        }
      }}
    >
      <Share2 className="w-4 h-4" />
    </Button>

    {/* PDF Button */}
    <Button
      variant="outline"
      size="sm"
      onClick={handlePdfClick}
    >
      <Download className="w-4 h-4 mr-2" />
      PDF
    </Button>
  </div>
</div>

      {/* ========================= SECTION 2 — VERDICT HERO ========================= */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/50">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="shrink-0 text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto md:mx-0 mb-3 overflow-hidden">
                {report.icp.avatar_url ? (
                  <img
                    src={report.icp.avatar_url}
                    alt={report.icp.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {report.icp.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="font-bold text-white">{report.icp.name}</p>
              <p className="text-xs text-slate-400">
                {report.icp.demographics}
              </p>
              <div className="mt-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <p className="text-sm text-slate-300 italic">"{report.icp.quote}"</p>
              </div>
              <div className="mt-2 p-2 bg-sky-500/10 border border-sky-500/20 rounded text-xs text-sky-400">
                💡 Focus on this exact persona for your first 50 users
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <Badge
                variant={
                  report.verdict.label === "GO HARD" ? "success" : "warning"
                }
              >
                VERDICT: {report.verdict.label}
              </Badge>

              <h2 className="text-3xl font-bold text-white">
                {report.verdict.headline}
              </h2>

              <p className="text-slate-300 leading-relaxed">
                {report.verdict.reason}
              </p>

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={() =>
                    document
                      .getElementById("roadmap")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Start 7-Day Launch
                </Button>
                <Button variant="ghost">View full details</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* ========================= SECTION 3 — 4 SCORE CARDS (GRID) ========================= */}
        <div className="grid grid-cols-2 gap-4">
          <ScoreCard title="Demand" score={report.scores.demand} />
          <ScoreCard title="Competition" score={report.scores.competition} />
          <ScoreCard title="Monetization" score={report.scores.monetization} />
          <ScoreCard title="Founder Fit" score={report.scores.founder_fit} />
        </div>
      </div>

      {/* ========================= SECTION 4 — FOUNDER FIT / SPEED TO VALIDATION / GROWTH PATH ========================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <UserCheck className="w-5 h-5" />
            <span className="font-bold">Founder Profile Fit</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Skills Match</span>
                <span className="text-emerald-400 font-bold">90%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "90%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Distribution Match</span>
                <span className="text-amber-400 font-bold">45%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: "45%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Monetization Match</span>
                <span className="text-emerald-400 font-bold">80%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4 text-sky-400">
            <Timer className="w-5 h-5" />
            <span className="font-bold">Speed to Validation</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-white mb-1">48–72 hours</div>
              <div className="text-xs text-slate-400">Time to Signal</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">7 days</div>
              <div className="text-xs text-slate-400">Time to Paying</div>
            </div>
            <div>
              <Badge variant="success">Low Complexity</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold">Growth Path Prediction</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-slate-950/50 rounded border border-slate-800">
              <span className="text-emerald-400 font-semibold">Outreach:</span>{" "}
              <span className="text-slate-300">High. Easy to DM.</span>
            </div>
            <div className="p-2 bg-slate-950/50 rounded border border-slate-800">
              <span className="text-amber-400 font-semibold">Community:</span>{" "}
              <span className="text-slate-300">Medium. Hard to self-promote.</span>
            </div>
            <div className="p-2 bg-slate-950/50 rounded border border-slate-800">
              <span className="text-red-400 font-semibold">Paid:</span>{" "}
              <span className="text-slate-300">Low. High CPC.</span>
            </div>
          </div>
        </Card>
      </div>

      {/* ========================= SECTION 5 — MARKET SIGNALS ========================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white">Market Signals</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-2 mb-4 text-sky-400">
              <Search className="w-5 h-5" />
              <span className="font-bold">Search Demand</span>
            </div>

            <div className="text-3xl font-bold text-white mb-1">
              {report.market.search_volume.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mb-4">via SerpAPI</p>

            <div className="space-y-2">
              {report.market.top_queries.map((q: string, i: number) => (
                <a
                  key={i}
                  href={`https://www.google.com/search?q=${encodeURIComponent(q)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950/50 px-3 py-2 rounded text-sm text-slate-300 border border-slate-800 block hover:border-slate-600 transition-colors"
                >
                  "{q}"
                </a>
              ))}
            </div>
          </Card>

          <div className="relative group">
            <Card>
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">Interest Trend</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-end gap-1 h-24">
                  {[40, 45, 30, 50, 65, 55, 80, 90].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold text-emerald-400">
                  {report.market.trend_direction === "rising" ? "+" : "-"}
                  {report.market.trend_pct}% {report.market.trend_direction === "rising" ? "Rising" : "Falling"}
                </div>
                <a
                  href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(report.meta.idea)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-300 mt-2 block"
                >
                  View Trend Source →
                </a>
              </div>
            </Card>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="bg-slate-900 text-slate-200 text-xs px-2 py-1 rounded shadow-lg border border-slate-700 whitespace-nowrap">
                {report.market.trend_pct > 0
                  ? `Rising: +${report.market.trend_pct}% this month`
                  : report.market.trend_pct < 0
                  ? `Dropping: ${report.market.trend_pct}% this month`
                  : "Flat: no momentum change"}
              </div>
            </div>
          </div>

          <Card className="relative">
            <div className="flex items-center gap-2 mb-4 text-red-400">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-bold">Competitors</span>
            </div>
            <div className="space-y-2">
              {report.competition.top_competitors.map((comp: any, i: number) => (
                <a
                  key={i}
                  href={comp.url || `https://${comp.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950/50 px-3 py-2 rounded text-sm border border-slate-800 cursor-pointer hover:border-slate-600 transition-colors block"
                >
                  <div className="text-white font-semibold">{comp.domain}</div>
                  <div className={`text-xs text-slate-400 ${userPlan === "free" ? "blur-sm" : ""}`}>
                    Traffic: {comp.traffic || "450k/mo"} • Strength: {(comp.strength * 100).toFixed(0)}%
                  </div>
                </a>
              ))}
            </div>
            {userPlan === "free" && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-700 pointer-events-auto">
                  <Lock className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Upgrade to Pro</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ========================= SECTION 6 — WEDGE + ICP PSYCHOLOGY ========================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Target className="w-5 h-5" />
            <span className="font-bold">Your Wedge to Win</span>
          </div>
          <ul className="space-y-2">
            {[
              "Micro ICP: Focus ONLY on React/Node devs first",
              "Faster TTV: Show code compatibility score immediately",
              "Simpler UX: No 'business plan' uploads, just GitHub link",
              "Manual concierge: Hand-match the first 50 pairs",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4 text-blue-400">
            <Brain className="w-5 h-5" />
            <span className="font-bold">ICP Psychology</span>
          </div>
          <ul className="space-y-2">
            {[
              "They are impatient and judge tools by their UI speed",
              "Willing to post build updates publicly daily",
              "Value code quality over marketing fluff",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ========================= SECTION 7 — FAILURE MODES + REALITY CHECK ========================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <Flame className="w-5 h-5" />
            <span className="font-bold">Where This Idea Dies</span>
          </div>
          <ul className="space-y-2">
            {report.risks.map((risk: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <ShieldAlert className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4 text-amber-400">
            <Target className="w-5 h-5" />
            <span className="font-bold">Founder Reality Check</span>
          </div>
          <ul className="space-y-2">
            {[
              "Your strength: fast execution and direct outreach clarity.",
              "Your weakness: long technical builds—avoid them.",
              "Your leverage: You can run 7-day tests faster than 95% founders.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ========================= SECTION 8 — EXECUTION ROADMAP ========================= */}
      {/* Execution Roadmap (start) */}
      <section id="roadmap" className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white">Execution Roadmap</h3>
          <p className="text-slate-400 text-sm">7 Days</p>
        </div>

        <div className="space-y-4">
          {/* Day 1 - Special Card */}
          {report.roadmap.days[0] && (() => {
            const day1Tasks = [
              "List 3 painful outcomes your user cares about.",
              "Find 5 subreddits where they hang out.",
              "Draft your \"Hated Competitor\" narrative.",
            ];
            const coldDmScript = "Hey [name], I'm testing a tiny tool that helps [ICP] avoid [pain]. Not selling anything, just want to see if I'm crazy. Mind if I send a 30s demo?";

            return (
              <Card className="bg-slate-900/70 border-slate-700/60">
                <div className="space-y-4">
                  <ul className="space-y-3">
                    {day1Tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckSquare className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-300">{task}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-3">COLD DM SCRIPT</h4>
                    <div className="relative">
                      <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                        <p className="text-sm text-slate-300 leading-relaxed">{coldDmScript}</p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(coldDmScript);
                        }}
                        className="absolute top-2 right-2 p-2 hover:bg-slate-800 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })()}

          {/* Days 2-7 */}
          {report.roadmap.days.slice(1).map((day: ReportDay) => {
            const isLocked = day.locked && userPlan === "free";
            const isExpanded = expandedDay === day.day;
            const categoryMap: { [key: number]: string } = {
              2: "Offer Validation",
              3: "Outreach",
              4: "User Interviews",
              5: "Manual Fulfillment",
              6: "Pre-sale",
              7: "Review & Decide",
            };
            const durationMap: { [key: number]: string } = {
              2: "90 min",
              3: "120 min",
              4: "60 min",
              5: "180 min",
              6: "60 min",
              7: "30 min",
            };
            const dayTasks = day.tasks && day.tasks.length > 0 ? day.tasks : [
              day.day === 2 ? "Build a 1-page Carrd or Framer site." : "",
              day.day === 2 ? "Add a 'Join Waitlist' form." : "",
              day.day === 2 ? "Connect to a simple email auto-responder." : "",
              day.day === 3 ? "Post on 3 selected subreddits." : "",
              day.day === 3 ? "Send 20 cold DMs using the script." : "",
              day.day === 3 ? "Launch $50 ad test." : "",
              day.day === 4 ? "Conduct 5 user interviews." : "",
              day.day === 4 ? "Document key pain points." : "",
              day.day === 4 ? "Identify top 3 feature requests." : "",
              day.day === 5 ? "Manually deliver value to first signups." : "",
              day.day === 5 ? "Track time spent per user." : "",
              day.day === 5 ? "Collect testimonials." : "",
              day.day === 6 ? "Ask for upfront payment." : "",
              day.day === 6 ? "Offer early-bird pricing." : "",
              day.day === 6 ? "Create urgency with limited spots." : "",
              day.day === 7 ? "Review all feedback and decide: pivot or double down." : "",
              day.day === 7 ? "Calculate unit economics." : "",
              day.day === 7 ? "Plan next 30 days." : "",
            ].filter(Boolean);

            return (
              <div key={day.day} className="relative">
                <Card className={`${isLocked ? "blur-sm" : ""}`}>
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() =>
                      !isLocked && setExpandedDay(isExpanded ? null : day.day)
                    }
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-white">{day.day}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-bold">{day.title}</h4>
                      </div>
                      <div className="text-xs text-slate-400">{categoryMap[day.day]}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>{durationMap[day.day]}</span>
                      </div>
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-slate-500" />
                      ) : (
                        <Button variant="ghost" size="sm" className="shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {isLocked && (
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-amber-400">
                          Pro Feature: Unlock scripts & checklists for Day {day.day}.
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsUpgradeModalOpen(true)}
                      >
                        Unlock
                      </Button>
                    </div>
                  )}

                  {!isLocked && isExpanded && dayTasks.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <ul className="space-y-2">
                        {dayTasks.map((task: string, i: number) => {
                          const taskKey = `day-${day.day}-task-${i}`;
                          return (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <input
                                type="checkbox"
                                checked={checkedTasks[taskKey] || false}
                                onChange={(e) => {
                                  setCheckedTasks((prev) => ({
                                    ...prev,
                                    [taskKey]: e.target.checked,
                                  }));
                                }}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                              />
                              <span>{task}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </section>
      {/* Execution Roadmap (end) */}

      {/* ========================= SECTION 9 — FIRST 5 PAYING USERS BLUEPRINT ========================= */}
      <section>
        <h3 className="text-xl font-bold text-white">
          First 5 Paying Users Blueprint
        </h3>

        {userPlan === "free" ? (
          <div className="relative blur-sm">
            <Card>
              <div className="p-8 text-center">
                <Lock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">
                  {report.blueprint.first_five_users.summary}
                </p>
                <Button onClick={() => setIsUpgradeModalOpen(true)}>
                  Unlock Pro
                </Button>
              </div>
            </Card>
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-slate-900/90 px-6 py-4 rounded-lg border border-slate-700 pointer-events-auto">
                <p className="text-sm font-bold text-white mb-2">Upgrade to Pro</p>
                <p className="text-xs text-slate-400 mb-3">
                  Unlock the complete blueprint
                </p>
                <Button size="sm" onClick={() => setIsUpgradeModalOpen(true)}>
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-3">Priority Channels</h4>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950/50 rounded border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <MousePointerClick className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-semibold text-white">Direct Outreach</span>
                    </div>
                    <p className="text-xs text-slate-400">High reply rate</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 rounded border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-white">Community Posts</span>
                    </div>
                    <p className="text-xs text-slate-400">Medium engagement</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 rounded border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-semibold text-white">SEO / Long-tail</span>
                    </div>
                    <p className="text-xs text-slate-400">Medium volume</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">High-Reply Scripts</h4>
                <div className="p-4 bg-slate-950/50 rounded border border-slate-800">
                  <p className="text-sm text-slate-300">
                    "Hey [Name], saw your post about [Topic]. I'm building a tool to solve [Problem] without [Pain]. Mind if I ask how you currently handle X?"
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">Pricing Sweet Spot</h4>
                <div className="p-4 bg-slate-950/50 rounded border border-slate-800">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">$29/mo</div>
                  <p className="text-sm text-slate-400">Entry point for early adopters</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">ICP CSV</h4>
                <div className="p-4 bg-slate-950/50 rounded border border-slate-800 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-sky-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Download ICP List</p>
                    <p className="text-xs text-slate-400">500+ qualified leads</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">Competitor Weaknesses</h4>
                <ul className="space-y-2">
                  {["Slow onboarding", "Complex pricing", "Poor mobile UX"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Target className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">ICP Targets</h4>
                <div className="space-y-2">
                  {[
                    "React/Node developers (primary)",
                    "Indie hackers building SaaS",
                    "Technical founders seeking co-founders",
                  ].map((item, i) => (
                    <div key={i} className="p-2 bg-slate-950/50 rounded border border-slate-800">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-sky-400" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* ========================= SECTION 10 — RISKS + UPSIDE ========================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-bold">Biggest Risks</span>
          </div>
          <ul className="space-y-2">
            {report.risks.map((risk: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <ShieldAlert className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold">Potential Upside</span>
          </div>
          <ul className="space-y-2">
            {report.upside.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <TrendingUp className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

    {/* ========================= FINAL VERDICT SUMMARY (SMALL) ========================= */}
<section className="mt-16">
  <div className="max-w-xl mx-auto text-center space-y-3">
    <h3 className={`text-3xl font-extrabold ${verdictColor}`}>
      {finalVerdict.word}
    </h3>
    <ul className="space-y-2">
      {finalVerdict.points.map((p, i) => (
        <li key={i} className={`text-sm md:text-base ${verdictColor}`}>
          {p}
        </li>
      ))}
    </ul>
  </div>
</section>


      {/* ========================= SECTION 11 — FOOTER ========================= */}
      <section className="pt-8 border-t border-slate-800">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-900/50">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Unlock unlimited ideas
            </h3>
            <p className="text-slate-400">
              Get full access to all reports, blueprints, and founder tools.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = "/pricing"}>
                View Pricing
              </Button>
              <Button onClick={() => setIsUpgradeModalOpen(true)}>
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </Card>
      </section>
     
      <First5Blueprint isPro={userPlan !== "free"} />
    </div>

  );
};
