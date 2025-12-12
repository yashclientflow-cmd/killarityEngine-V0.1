export type PlanType = 'free' | 'pro' | 'lifer';

export interface Task {
  id: string;
  text: string;
}

export interface DayPlan {
  day: number;
  title: string;
  category: string;
  durationMinutes: number;
  tasks: Task[];
  scripts?: { title: string; content: string }[];
  proOnly?: boolean;
}

export interface ReportData {
  id: string;
  ideaTitle: string;
  date: string;
  verdict: 'GO_HARD' | 'PIVOT' | 'KILL';
  scores: {
    demand: number;
    competition: number;
    monetization: number;
    founderFit: number;
  };
  // New Section 1 Data
  founderFitDetail: {
    skillsMatch: number;
    distributionMatch: number;
    monetizationMatch: number;
    insights: string[];
  };
  validationSpeed: {
    score: number;
    timeToSignal: string;
    timeToPaying: string;
    complexity: string;
  };
  growthPaths: {
    outreach: string;
    community: string;
    paid: string;
    seo?: string;
  };
  // Existing Market Data
  market: {
    searchDemand: string;
    queries: string[];
    trend: 'rising' | 'stable' | 'falling';
    // explicit numeric monthly estimate
    searchVolume?: number | string;
    // weekly trend points (used by UI charts)
    interestTrend?: number[];
    competitors: { name: string; traffic: string }[];
  };
  // Ideal Customer Profile
  icp?: {
    name?: string;
    title?: string;
    avatarUrl?: string;
    summary?: string;
    demographics?: { location?: string; experience?: string; companySize?: string };
  };
  // New Section 2 Data
  wedge: string[];
  icpPsychology: string[];
  // New Section 3 Data
  failureModes: string[];
  realityCheck: string[];
  // Roadmap
  roadmap: DayPlan[];
  // Short scripts / quick snippets
  shortScripts?: string[];
  // Monetization (Enhanced)
  monetizationBlueprint: {
    channels: string[];
    scripts: { title: string; content: string }[];
    adTemplate: { headline: string; body: string; targeting: string };
    pricing: string;
    kpiSheetLink: string;
    killers: string[];
    // Pro Extras
    proExtras: {
      niches: string[];
      competitorWeaknesses: string[];
      pricing: {
        entry: string;
        core: string;
        ltv: string;
      };
      icpCsvUrl: string;
    };
  };
}

export const MOCK_REPORT: ReportData = {
  id: 'mock-2025-11-28-01',
  ideaTitle: 'Tinder for Co-founders (Dev focused)',
  date: '11/28/2025',
  verdict: 'GO_HARD',
  scores: {
    demand: 88,
    competition: 65,
    monetization: 92,
    founderFit: 75,
  },
  founderFitDetail: {
    skillsMatch: 90,
    distributionMatch: 45,
    monetizationMatch: 80,
    insights: [
      "Your strength: fast execution and direct outreach clarity.",
      "Your weakness: long technical builds—avoid them.",
      "Your leverage: You can run 7-day tests faster than 95% founders."
    ]
  },
  validationSpeed: {
    score: 9,
    timeToSignal: "48–72 hours",
    timeToPaying: "7 days",
    complexity: "Low"
  },
  growthPaths: {
    outreach: "High. Devs hang out in public (GitHub/X). Easy to DM.",
    community: "Medium. Hard to self-promote in dev subreddits without ban.",
    paid: "Low. CPC for 'developer' keywords is insanely high ($15+).",
    seo: "Medium. Long-tail 'find technical cofounder' has volume."
  },
  market: {
    searchDemand: '12.4k avg. monthly searches',
    searchVolume: 12400,
    interestTrend: [40, 45, 30, 50, 65, 55, 80, 90],
    queries: ['find technical cofounder', 'developer dating app', 'cofounder matching platform'],
    trend: 'rising',
    competitors: [
      { name: 'Y Combinator Co-founder Match', traffic: '450k/mo' },
      { name: 'IndieHackers', traffic: '1.2M/mo' },
      { name: 'CoFoundersLab', traffic: '85k/mo' },
    ],
  },
  wedge: [
    "Micro ICP: Focus ONLY on React/Node devs first",
    "Faster TTV: Show code compatibility score immediately",
    "Simpler UX: No 'business plan' uploads, just GitHub link",
    "Manual concierge: Hand-match the first 50 pairs",
    "Niche language: 'Ship faster' vs 'Find a partner'",
    "Pain clarity: Avoiding the 'idea guy' with no skills"
  ],
  icpPsychology: [
    "They are impatient and judge tools by their UI speed",
    "They respond to clear ROI (shipping speed)",
    "They hate complexity and marketing fluff",
    "They buy certainty (code quality), not promises"
  ],
  icp: {
    name: 'Sarah Jenkins',
    title: 'Developer Match Seeker',
    avatarUrl: 'https://i.pravatar.cc/150?u=Sarah-ICP',
    summary: 'Early-stage technical founder building side projects and seeking reliable developer co-founders.',
    demographics: { location: 'North America', experience: 'Senior dev (5+ yrs)', companySize: 'Solo / 2-5' }
  },
  failureModes: [
    "You build a complex matching algo before having users",
    "You allow non-technical 'idea guys' to flood the platform",
    "You try to monetize the matching instead of the connection",
    "You assume devs want to network (they want to build)",
    "You ignore the trust deficit in remote partnerships"
  ],
  realityCheck: [
    "DM 20–30 devs on X/Twitter per day",
    "Willing to kill idea in 7 days if no matches",
    "5–10 hours/week available for manual matching",
    "Comfortable with rejection from cynical devs",
    "Willing to post build updates publicly daily"
  ],
  roadmap: [
    {
      day: 1,
      title: 'Sharpen your ICP',
      category: 'Problem Definition',
      durationMinutes: 60,
      tasks: [
        { id: 't1', text: 'Define 3 painful outcomes for your target user.' },
        { id: 't2', text: 'Find 5 communities where they hang out.' },
        { id: 't3', text: 'Draft your "Hated Competitor" narrative.' },
      ],
      scripts: [
        {
          title: 'Discovery DM Script',
          content: "Hey [Name], saw your post about [Topic]. I'm building a tool to solve [Problem] without [Pain]. Mind if I ask how you currently handle X?",
        },
      ],
      proOnly: false,
    },
    {
      day: 2,
      title: 'The "Ugly" Landing Page',
      category: 'Validation',
      durationMinutes: 90,
      tasks: [
        { id: 't4', text: 'Build a 1-page Carrd or Framer site.' },
        { id: 't5', text: 'Add a "Join Waitlist" form.' },
        { id: 't6', text: 'Connect to a simple email auto-responder.' },
      ],
      proOnly: false,
    },
    {
      day: 3,
      title: 'Traffic Injection',
      category: 'Outreach',
      durationMinutes: 120,
      tasks: [
        { id: 't7', text: 'Post on 3 selected subreddits.' },
        { id: 't8', text: 'Send 20 cold DMs using the script.' },
        { id: 't9', text: 'Launch $50 ad test.' },
      ],
      proOnly: true,
    },
    {
      day: 4,
      title: 'Feedback Loop',
      category: 'Research',
      durationMinutes: 60,
      tasks: [{ id: 't10', text: 'Conduct 5 user interviews.' }],
      proOnly: true,
    },
    {
      day: 5,
      title: 'Concierge MVP',
      category: 'Product',
      durationMinutes: 180,
      tasks: [{ id: 't11', text: 'Manually deliver value to first signups.' }],
      proOnly: true,
    },
    {
      day: 6,
      title: 'Pre-sale / Commitment',
      category: 'Sales',
      durationMinutes: 60,
      tasks: [{ id: 't12', text: 'Ask for upfront payment.' }],
      proOnly: true,
    },
    {
      day: 7,
      title: 'Review & Decide',
      category: 'Strategy',
      durationMinutes: 45,
      tasks: [{ id: 't13', text: 'Analyze metrics and decide: Kill, Pivot, or Scale.' }],
      proOnly: true,
    },
  ],
  // short scripts / quick snippets used across the UI and outreach
  shortScripts: [
    'DM: Hey [Name], saw your repo—looking for a dev co-founder? Quick chat?',
    'Cold email: Subject: Quick idea—20 min? I can save you weeks of Rework.',
    'Ad tagline: Ship features, not meetings. Find a technical co-founder fast.'
  ],
  monetizationBlueprint: {
    channels: [
      'X/Twitter DMs to indie founders',
      'Reddit posts in r/SaaS & r/Entrepreneur',
      '$50 X ads targeting "startup" interests',
    ],
    scripts: [
      {
        title: 'Cold DM to Founder',
        content: "Hey [Name], big fan of [Project]. I noticed you might be struggling with [Problem]. I'm building a fix. Want early access?",
      },
      {
        title: 'Reddit Launch Post',
        content: "Title: I spent 6 months building this so you don't have to.\n\nBody: Story of the pain, the solution, and the link.",
      },
    ],
    adTemplate: {
      headline: 'Stop wasting time finding a co-founder.',
      body: 'Swipe right on code quality, not profile pics. The only matching tool for serious devs.',
      targeting: 'Interests: Y Combinator, SaaS, JavaScript, React',
    },
    pricing: '$29/mo per user',
    kpiSheetLink: '#',
    killers: [
      'Building before selling',
      'Targeting everyone instead of a niche',
      'Underpricing your value',
      'Ignoring distribution channels',
      'Waiting for "perfect" code',
    ],
    proExtras: {
      niches: [
        "Senior React Developers looking for Sales Co-founders",
        "Bootstrapped Indie Hackers ($0-$5k MRR)",
        "AI Engineers needing Frontend partners"
      ],
      competitorWeaknesses: [
        "Y Combinator Match: Too broad, low response rates",
        "IndieHackers: Not a matching tool, just a forum",
        "CoFoundersLab: Outdated UI, lots of inactive profiles"
      ],
      pricing: {
        entry: "$19/mo",
        core: "$49/mo",
        ltv: "$450"
      },
      icpCsvUrl: "#"
    }
  },
};
