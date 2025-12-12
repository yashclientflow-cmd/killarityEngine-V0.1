// src/lib/mockReport.ts
import type { Report } from "../lib/reportSchema";

export const mockReport: Report = {
  meta: {
    idea: "AI-Powered Plant Care Assistant",
    created_at: new Date().toISOString(),
    report_id: "rep_demo_1",
  },

  scores: {
    demand: 85,
    competition: 40,
    monetization: 75,
    founder_fit: 90,
  },

  market: {
    search_volume: 12400,
    top_queries: [
      "plant care app",
      "identify plant disease",
      "watering schedule app",
    ],
    trend_pct: 23,
    trend_direction: "rising",
  },

  competition: {
    top_competitors: [
      { domain: "planta.com", strength: 0.6 },
      { domain: "picturethisai.com", strength: 0.8 },
    ],
  },

  verdict: {
    label: "GO HARD",
    headline: "Build this immediately.",
    reason:
      "Strong search volume with rising trend and fragmented competition.",
  },

  icp: {
    avatar_url: "",
    name: "Sarah Jenkins",
    demographics: "Urban gardener, 28–35",
    quote:
      "I've killed 3 monsteras this year. I'd pay if something just told me when to water.",
  },

  urgency: {
    type: "rising",
    message: "Interest is rising – best window is next 60–90 days.",
  },

  roadmap: {
    days: [
      { day: 1, title: "Sharpen your ICP", locked: false, tasks: [] },
      { day: 2, title: "Ugly Landing Page", locked: false, tasks: [] },
      { day: 3, title: "Traffic Injection", locked: true, tasks: [] },
      { day: 4, title: "Feedback Loop", locked: true, tasks: [] },
      { day: 5, title: "Concierge MVP", locked: true, tasks: [] },
      { day: 6, title: "Pre-sale / Commitment", locked: true, tasks: [] },
      { day: 7, title: "Review & Decide", locked: true, tasks: [] },
    ],
  },

  blueprint: {
    first_five_users: {
      locked: true,
      steps: [],
      summary: "Blueprint to get your first 5 paying users in 14 days.",
    },
  },

  risks: [
    "High churn risk for casual gardeners.",
    "Reliance on 3rd-party plant databases.",
  ],

  upside: [
    "Potential B2B deals with nurseries.",
    "High viral potential on TikTok/Instagram.",
  ],
};

