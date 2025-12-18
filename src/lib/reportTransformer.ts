// src/lib/reportTransformer.ts
// Transforms n8n webhook JSON response to match Report schema

import type { Report, ReportDay } from "./reportSchema";

export interface N8nReportResponse {
  demand_score?: number;
  competition_score?: number;
  monetization_score?: number;
  founder_fit_score?: number;
  verdict?: string;
  headline?: string;
  reason?: string;
  wedge_to_win?: string | string[];
  where_this_dies?: string;
  ICP_psychology_list?: string[];
  founder_profile?: string[];
  founder_profile_fit?: {
    skills_match?: number;
    distribution_match?: number;
    monetization_match?: number;
  };
  speed_to_validation?: {
    time_to_signal?: string;
    time_to_paying?: string;
    complexity?: string;
  };
  growth_path?: {
    outreach?: { level?: string; description?: string };
    community?: { level?: string; description?: string };
    paid?: { level?: string; description?: string };
  };
  founder_reality_check?: string[];
  blueprint_pro_features?: {
    priority_channels?: Array<{ name?: string; description?: string }>;
    high_reply_scripts?: string[];
    pricing_sweet_spot?: { amount?: string; description?: string };
    icp_csv_info?: { title?: string; count?: string };
    competitor_weaknesses?: string[];
    icp_targets?: string[];
  };
  "7-day_execution_plan"?: {
    [key: string]: {
      tasks?: string[];
      scripts?: string[];
      time_estimate_hours?: number;
    };
  };
  "5_paying_user_blueprint"?: string[];
  pricing_model?: string;
  competitor_weaknesses?: string[];
  distribution_channels?: string[];
  scripts?: string[];
  final_verdict_summary?: string;
  // Additional fields that might come from n8n
  idea?: string;
  ideaTitle?: string;
  id?: string;
  report_id?: string;
  created_at?: string;
  date?: string;
  meta?: {
    idea?: string;
    created_at?: string;
    report_id?: string;
  };
  market?: {
    search_volume?: number;
    searchVolume?: number;
    top_queries?: string[];
    queries?: string[];
    trend_pct?: number;
    trend_direction?: string;
    trend?: string;
  };
  competition?: {
    top_competitors?: Array<{ domain?: string; strength?: number; url?: string; traffic?: string }>;
  };
  icp?: {
    name?: string;
    avatar_url?: string;
    avatarUrl?: string;
    demographics?: string;
    quote?: string;
    summary?: string;
  };
  urgency?: {
    type?: string;
    message?: string;
  };
  risks?: string[];
  upside?: string[];
  failureModes?: string[];
  roadmap?: {
    days?: ReportDay[];
  };
  blueprint?: {
    first_five_users?: {
      locked?: boolean;
      steps?: string[];
      summary?: string;
    };
  };
  finalVerdict?: {
    word?: string;
    points?: string[];
  };
}

/**
 * Transforms n8n webhook response to match Report schema
 * Also handles already-transformed data (idempotent)
 */
export function transformN8nReportToReport(
  n8nData: N8nReportResponse | N8nReportResponse[] | Report,
  idea?: string,
  reportId?: string
): Report {
  // Handle array response (n8n might return array)
  const data = Array.isArray(n8nData) ? n8nData[0] : n8nData;

  // Check if data is already in Report format (has meta.scores structure)
  if (data && typeof data === "object" && "meta" in data && "scores" in data) {
    // Already transformed, just ensure it's valid
    return data as Report;
  }

  // Normalize verdict label
  const normalizeVerdictLabel = (verdict?: string): string => {
    if (!verdict) return "UNKNOWN";
    const upper = verdict.toUpperCase();
    if (upper.includes("KILL")) return "KILL IT";
    if (upper.includes("GO") || upper.includes("HARD")) return "GO HARD";
    if (upper.includes("PIVOT")) return "PIVOT";
    return verdict;
  };

  // Transform 7-day execution plan to roadmap days
  const transformRoadmap = (plan?: N8nReportResponse["7-day_execution_plan"]): ReportDay[] => {
    if (!plan) return [];

    const days: ReportDay[] = [];
    const dayKeys = Object.keys(plan).sort((a, b) => {
      // Handle "Day 1", "Day 2", etc. format
      const dayA = parseInt(a.replace(/Day\s*/i, "")) || 0;
      const dayB = parseInt(b.replace(/Day\s*/i, "")) || 0;
      return dayA - dayB;
    });

    dayKeys.forEach((dayKey) => {
      const dayData = plan[dayKey];
      // Extract day number from key (e.g., "Day 1" -> 1)
      const dayNumber = parseInt(dayKey.replace(/Day\s*/i, "")) || days.length + 1;
      
      // Determine if day should be locked (days 3-7 are locked for free tier)
      const locked = dayNumber >= 3;

      // Create title from first task or use default
      let title = `Day ${dayNumber}`;
      if (dayData.tasks && dayData.tasks.length > 0) {
        const firstTask = dayData.tasks[0];
        // Extract title from task (remove trailing period, limit length)
        title = firstTask.split(".")[0].trim();
        if (title.length > 50) title = title.substring(0, 47) + "...";
      }

      days.push({
        day: dayNumber,
        title,
        locked,
        tasks: dayData.tasks || [],
        scripts: dayData.scripts || [],
      });
    });

    // Ensure we have 7 days, fill missing days
    for (let i = 1; i <= 7; i++) {
      if (!days.find((d) => d.day === i)) {
        days.push({
          day: i,
          title: `Day ${i}`,
          locked: i >= 3,
          tasks: [],
          scripts: [],
        });
      }
    }

    // Sort by day number
    return days.sort((a, b) => a.day - b.day);
  };

  // Extract final verdict from summary
  const extractFinalVerdict = (summary?: string): { word: string; points: string[] } => {
    if (!summary) {
      return {
        word: "GO",
        points: ["Analysis complete"],
      };
    }

    // Try to extract verdict word
    const upper = summary.toUpperCase();
    let word = "GO";
    if (upper.includes("KILL")) word = "KILL";
    else if (upper.includes("PIVOT")) word = "PIVOT";
    else if (upper.includes("GO") || upper.includes("HARD")) word = "GO";

    // Split summary into points (by sentences)
    const sentences = summary
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10);

    return {
      word,
      points: sentences.length > 0 ? sentences : [summary],
    };
  };

  // Transform risks
  const transformRisks = (whereThisDies?: string, risks?: string[]): string[] => {
    const result: string[] = [];
    if (whereThisDies) result.push(whereThisDies);
    if (risks && Array.isArray(risks)) result.push(...risks);
    return result.length > 0 ? result : ["No specific risks identified."];
  };

  // Transform upside (from founder_profile or other positive signals)
  const transformUpside = (founderProfile?: string[], upside?: string[]): string[] => {
    const result: string[] = [];
    if (upside && Array.isArray(upside)) {
      result.push(...upside);
    } else if (founderProfile && Array.isArray(founderProfile)) {
      // Extract positive aspects from founder profile
      const positive = founderProfile.filter((p) => 
        !p.toLowerCase().includes("limited") && 
        !p.toLowerCase().includes("needs") &&
        !p.toLowerCase().includes("without")
      );
      if (positive.length > 0) result.push(...positive);
    }
    return result.length > 0 ? result : ["Potential for growth with proper execution."];
  };

  // Build the transformed report
  const transformedReport: Report = {
    meta: {
      idea: idea || data.idea || data.ideaTitle || data.meta?.idea || "Unknown Idea",
      created_at: data.created_at || data.date || data.meta?.created_at || new Date().toISOString(),
      report_id: reportId || data.report_id || data.id || data.meta?.report_id || `rep_${Date.now()}`,
    },

    scores: {
      demand: data.demand_score ?? (data as any).scores?.demand ?? 0,
      competition: data.competition_score ?? (data as any).scores?.competition ?? 0,
      monetization: data.monetization_score ?? (data as any).scores?.monetization ?? 0,
      founder_fit: data.founder_fit_score ?? (data as any).scores?.founder_fit ?? (data as any).scores?.founderFit ?? 0,
    },

    market: {
      search_volume: data.market?.search_volume ?? data.market?.searchVolume ?? 0,
      top_queries: data.market?.top_queries ?? data.market?.queries ?? [],
      trend_pct: data.market?.trend_pct ?? 0,
      trend_direction: data.market?.trend_direction ?? data.market?.trend ?? "stable",
    },

    competition: {
      top_competitors: (data.competition?.top_competitors ?? []).map(comp => ({
        domain: comp.domain || "",
        strength: comp.strength ?? 0,
      })),
    },

    verdict: data.verdict && typeof data.verdict === "object" && "label" in data.verdict
      ? data.verdict as Report["verdict"]
      : {
          label: normalizeVerdictLabel(data.verdict as string),
          headline: data.headline || "Analysis complete",
          reason: data.reason || "Report generated",
        },

    icp: {
      avatar_url: data.icp?.avatar_url ?? data.icp?.avatarUrl ?? "",
      name: data.icp?.name || "Unknown ICP",
      demographics: data.icp?.demographics ?? data.icp?.summary ?? "Unknown",
      quote: data.icp?.quote || "",
    },

    urgency: {
      type: data.urgency?.type || "stable",
      message: data.urgency?.message || "Report generated",
    },

    roadmap: {
      days: data.roadmap && Array.isArray(data.roadmap.days)
        ? data.roadmap.days
        : transformRoadmap(data["7-day_execution_plan"]) || [],
    },

    blueprint: {
      first_five_users: data.blueprint?.first_five_users ? {
        locked: data.blueprint.first_five_users.locked ?? true,
        steps: data.blueprint.first_five_users.steps ?? [],
        summary: data.blueprint.first_five_users.summary || "Blueprint to get your first 5 paying users in 14 days.",
      } : {
        locked: true,
        steps: data["5_paying_user_blueprint"] ?? [],
        summary: "Blueprint to get your first 5 paying users in 14 days.",
      },
    },

    risks: Array.isArray(data.risks) && data.risks.length > 0
      ? data.risks
      : transformRisks(data.where_this_dies, data.failureModes),

    upside: Array.isArray(data.upside) && data.upside.length > 0
      ? data.upside
      : transformUpside(data.founder_profile),

    finalVerdict: data.finalVerdict && typeof data.finalVerdict === "object" && "word" in data.finalVerdict
      ? {
          word: data.finalVerdict.word || "GO",
          points: data.finalVerdict.points || [],
        }
      : extractFinalVerdict(data.final_verdict_summary),

    // New fields from n8n
    founder_profile_fit: data.founder_profile_fit ? {
      skills_match: data.founder_profile_fit.skills_match ?? 0,
      distribution_match: data.founder_profile_fit.distribution_match ?? 0,
      monetization_match: data.founder_profile_fit.monetization_match ?? 0,
    } : undefined,
    speed_to_validation: data.speed_to_validation ? {
      time_to_signal: data.speed_to_validation.time_to_signal || "",
      time_to_paying: data.speed_to_validation.time_to_paying || "",
      complexity: data.speed_to_validation.complexity || "",
    } : undefined,
    growth_path: data.growth_path ? {
      outreach: {
        level: data.growth_path.outreach?.level || "",
        description: data.growth_path.outreach?.description || "",
      },
      community: {
        level: data.growth_path.community?.level || "",
        description: data.growth_path.community?.description || "",
      },
      paid: {
        level: data.growth_path.paid?.level || "",
        description: data.growth_path.paid?.description || "",
      },
    } : undefined,
    wedge_to_win: Array.isArray(data.wedge_to_win) 
      ? data.wedge_to_win 
      : data.wedge_to_win 
        ? [data.wedge_to_win] 
        : undefined,
    ICP_psychology_list: Array.isArray(data.ICP_psychology_list) ? data.ICP_psychology_list : undefined,
    founder_reality_check: Array.isArray(data.founder_reality_check) ? data.founder_reality_check : undefined,
    blueprint_pro_features: data.blueprint_pro_features ? {
      priority_channels: data.blueprint_pro_features.priority_channels?.map(ch => ({
        name: ch.name || "",
        description: ch.description || "",
      })),
      high_reply_scripts: data.blueprint_pro_features.high_reply_scripts || [],
      pricing_sweet_spot: data.blueprint_pro_features.pricing_sweet_spot ? {
        amount: data.blueprint_pro_features.pricing_sweet_spot.amount || "",
        description: data.blueprint_pro_features.pricing_sweet_spot.description || "",
      } : undefined,
      icp_csv_info: data.blueprint_pro_features.icp_csv_info ? {
        title: data.blueprint_pro_features.icp_csv_info.title || "",
        count: data.blueprint_pro_features.icp_csv_info.count || "",
      } : undefined,
      competitor_weaknesses: data.blueprint_pro_features.competitor_weaknesses || [],
      icp_targets: data.blueprint_pro_features.icp_targets || [],
    } : undefined,
  };

  return transformedReport;
}

