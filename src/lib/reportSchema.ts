// src/lib/reportSchema.ts

export type ReportDay = {
  day: number;
  title: string;
  locked: boolean;
  tasks: string[];
  scripts?: string[]; // Scripts for this day (especially Day 1)
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

  // New fields from n8n
  founder_profile_fit?: {
    skills_match: number;
    distribution_match: number;
    monetization_match: number;
  };

  speed_to_validation?: {
    time_to_signal: string;
    time_to_paying: string;
    complexity: string;
  };

  growth_path?: {
    outreach: { level: string; description: string };
    community: { level: string; description: string };
    paid: { level: string; description: string };
  };

  wedge_to_win?: string[];
  ICP_psychology_list?: string[];
  founder_reality_check?: string[];

  blueprint_pro_features?: {
    priority_channels?: Array<{ name: string; description: string }>;
    high_reply_scripts?: string[];
    pricing_sweet_spot?: { amount: string; description: string };
    icp_csv_info?: { title: string; count: string };
    competitor_weaknesses?: string[];
    icp_targets?: string[];
  };
};
