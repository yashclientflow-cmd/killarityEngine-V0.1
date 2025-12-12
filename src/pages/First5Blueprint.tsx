import React from "react";

type Props = {
  isPro?: boolean; // pass true if the current user/report is Pro-unlocked
};

const First5Blueprint: React.FC<Props> = ({ isPro = false }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">
      {/* Pro blur wrapper */}
      <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur p-8 mt-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          First 5 Paying Users — Blueprint (PRO)
        </h2>

        <p className="text-slate-400 mb-6">
          A compact, no-fluff system to get your first paying customers in
          7–14 days. Includes channels, high-reply scripts, ICP CSV and an ad
          play.
        </p>

        {/* Priority Channels */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">3 Priority Channels</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Direct DMs to ICP founders (highest signal)</li>
            <li>• Reddit posts in growth / entrepreneur niches</li>
            <li>• $50 targeted X ads toward “startup builders”</li>
          </ul>
        </div>

        {/* High-Reply Scripts */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">High-Reply Scripts</h3>

          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <pre className="whitespace-pre-wrap text-cyan-300 text-sm font-mono">
{`Hey [name], I noticed you might be struggling with [problem].
I’m testing a tiny tool that solves this fast. Want early access?`}
            </pre>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 mt-4">
            <pre className="whitespace-pre-wrap text-cyan-300 text-sm font-mono">
{`Reddit post title:
"I spent 6 months building this so you don't have to."
Body: Short story of pain → what you made → link`}
            </pre>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">Pricing Sweet Spot</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Entry Price: $19–49</li>
            <li>• Core Plan: $29–59</li>
            <li>• LTV Potential: $200–600</li>
          </ul>
        </div>

        {/* Competitor Weaknesses */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">Competitor Weaknesses</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Slow onboarding and bloated features</li>
            <li>• No personalized founder-fit guidance</li>
            <li>• High friction to first value</li>
          </ul>
        </div>

        {/* ICP CSV export */}
        <div className="mb-2">
          <h3 className="text-xl font-bold text-white mb-3">20 ICP Targets (CSV)</h3>

          {/* If user is Pro show the real button, otherwise show upgrade CTA */}
          {isPro ? (
            <a
              href="/icp-sample.csv"
              download
              className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-lg font-semibold"
            >
              Download ICP List (.csv)
            </a>
          ) : (
            <a
              href="/pricing"
              className="inline-flex items-center bg-gradient-to-r from-slate-800/40 to-slate-800/10 text-cyan-300 px-5 py-2 rounded-lg border border-slate-700"
            >
              Unlock Pro → View pricing
            </a>
          )}
        </div>

        {/* Locked overlay for free users (nice visual) */}
        {!isPro && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center z-10"
            style={{ pointerEvents: "none" }}
          >
            <div className="text-center px-6">
              <div className="text-red-400 font-semibold mb-2">🔒 Pro Feature</div>
              <div className="text-slate-200 mb-4">
                Unlock the full First-5 Blueprint for ready-to-run scripts, CSVs,
                and the $50 ad play.
              </div>
              <a
                href="/pricing"
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-bold"
                style={{ pointerEvents: "auto" }}
              >
                Unlock Pro →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default First5Blueprint;