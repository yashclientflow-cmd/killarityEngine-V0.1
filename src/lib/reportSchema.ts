// src/lib/reportSchema.ts

export type ReportDay = {
  day: number;
  title: string;
  locked: boolean;
  tasks: string[];
};

export type FirstFiveUsersBlueprint = {
  locked: boolean;   // true for free tier
  steps: string[];   // concrete actions
  summary: string;   // 1–2 line description
};

export type Report = {
  meta: {
    idea: string;
    created_at: string;
    report_id: string;
  };

  scores: {
    demand: number;
    competition: number;
    monetization: number;
    founder_fit: number;
  };

  market: {
    search_volume: number;
    top_queries: string[];
    trend_pct: number;
    trend_direction: string;
  };

  competition: {
    top_competitors: { domain: string; strength: number }[];
  };

  verdict: {
    label: string;     // "GO HARD" / "KILL IT"
    headline: string;  // big text
    reason: string;    // short explanation
  };

  finalVerdict: {
    word: string;
    points: string[];
  };
  
  icp: {
    avatar_url: string;
    name: string;
    demographics: string;
    quote: string;
  };

  urgency: {
    type: string;      // "rising" / "flat" / "falling"
    message: string;
  };

  roadmap: {
    days: ReportDay[];
  };

  blueprint: {
    first_five_users: FirstFiveUsersBlueprint;
  };

  risks: string[];
  upside: string[];
};
