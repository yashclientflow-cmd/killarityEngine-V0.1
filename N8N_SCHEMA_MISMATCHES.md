# N8N Webhook Schema Mismatches & Transformation Guide

## Overview
This document details all mismatches between the n8n webhook JSON response and the expected `Report` schema used by the frontend.

## Complete Field Mapping

### ✅ Scores Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| `demand_score` (number) | `scores.demand` | Direct mapping |
| `competition_score` (number) | `scores.competition` | Direct mapping |
| `monetization_score` (number) | `scores.monetization` | Direct mapping |
| `founder_fit_score` (number) | `scores.founder_fit` | Direct mapping |

**Issue**: n8n uses flat structure, schema expects nested `scores` object.

---

### ✅ Verdict Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| `verdict` (string: "KILL") | `verdict.label` (string: "KILL IT") | Normalize: "KILL" → "KILL IT", "GO" → "GO HARD" |
| `headline` (string, root level) | `verdict.headline` | Move to nested structure |
| `reason` (string, root level) | `verdict.reason` | Move to nested structure |

**Issues**:
1. Verdict label format differs ("KILL" vs "KILL IT")
2. Verdict fields are at root level, not nested

---

### ❌ Market Section
| n8n Field | Expected Schema | Status |
|-----------|----------------|--------|
| *Missing* | `market.search_volume` | **NOT PROVIDED** - defaults to 0 |
| *Missing* | `market.top_queries[]` | **NOT PROVIDED** - defaults to [] |
| *Missing* | `market.trend_pct` | **NOT PROVIDED** - defaults to 0 |
| *Missing* | `market.trend_direction` | **NOT PROVIDED** - defaults to "stable" |

**Issue**: n8n doesn't provide market data. These fields will be empty/default.

---

### ❌ Competition Section
| n8n Field | Expected Schema | Status |
|-----------|----------------|--------|
| *Missing* | `competition.top_competitors[]` | **NOT PROVIDED** - defaults to [] |

**Issue**: n8n doesn't provide competition data.

---

### ✅ Risks Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| `where_this_dies` (string) | `risks[]` (array) | Convert string to array: `[where_this_dies]` |
| *Also accepts* `risks[]` or `failureModes[]` | `risks[]` | Direct mapping if array provided |

**Issue**: n8n provides single string, schema expects array.

---

### ✅ Upside Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| *Missing* | `upside[]` | Extract from `founder_profile` (positive items) or default |

**Issue**: n8n doesn't provide upside directly. Extracted from founder_profile.

---

### ✅ Roadmap Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| `7-day_execution_plan` (object with "Day 1", "Day 2" keys) | `roadmap.days[]` (array of ReportDay) | Transform object to array, extract day numbers, create ReportDay objects |

**Structure Mismatch**:
- **n8n**: `{ "Day 1": { tasks: [], scripts: [], time_estimate_hours: 4 }, ... }`
- **Expected**: `{ days: [{ day: 1, title: "...", locked: false, tasks: [] }, ...] }`

**Transformation Logic**:
1. Extract day number from keys ("Day 1" → 1)
2. Create ReportDay objects with:
   - `day`: extracted number
   - `title`: from first task or default
   - `locked`: true for days 3-7, false for days 1-2
   - `tasks`: from dayData.tasks

---

### ✅ Blueprint Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| `5_paying_user_blueprint` (array) | `blueprint.first_five_users.steps[]` | Direct mapping |
| *Missing* | `blueprint.first_five_users.locked` | Default: `true` |
| *Missing* | `blueprint.first_five_users.summary` | Default: "Blueprint to get your first 5 paying users in 14 days." |

**Issue**: n8n provides array at root, schema expects nested structure.

---

### ✅ Final Verdict Section
| n8n Field | Expected Schema | Transformation |
|-----------|----------------|---------------|
| `final_verdict_summary` (string) | `finalVerdict.points[]` (array) | Split string into sentences, extract verdict word |

**Transformation Logic**:
1. Extract verdict word from summary ("KILL", "PIVOT", "GO")
2. Split summary into sentences
3. Create `{ word: "...", points: [...] }`

---

### ❌ Missing Required Fields
These fields are **required** by the schema but **not provided** by n8n:

1. **`meta`** object:
   - `idea`: Extracted from form data or defaults
   - `created_at`: Generated timestamp
   - `report_id`: Generated ID

2. **`icp`** object:
   - `avatar_url`: Defaults to ""
   - `name`: Defaults to "Unknown ICP"
   - `demographics`: Defaults to "Unknown"
   - `quote`: Defaults to ""

3. **`urgency`** object:
   - `type`: Defaults to "stable"
   - `message`: Defaults to "Report generated"

4. **`market`** object: (all fields default to 0/empty)

5. **`competition`** object: (defaults to empty array)

---

### ⚠️ Extra Fields (Not in Schema)
n8n provides these fields that are **not used** by the current schema:

1. `wedge_to_win` (string) - Could map to a `wedge` array if schema is extended
2. `ICP_psychology_list` (array) - Could map to `icpPsychology` if schema is extended
3. `founder_profile` (array) - Used to extract upside, but not directly stored
4. `pricing_model` (string) - Not in schema
5. `competitor_weaknesses` (array) - Not in schema
6. `distribution_channels` (array) - Not in schema
7. `scripts` (array) - Not in schema

**Recommendation**: These could be added to the schema if needed for future features.

---

## Transformation Flow

```
n8n JSON Response
    ↓
transformN8nReportToReport()
    ↓
Check if already transformed (idempotent)
    ↓
Transform each section:
  - Scores: flat → nested
  - Verdict: normalize label, nest fields
  - Roadmap: object → array
  - Blueprint: array → nested object
  - Final Verdict: string → object with word + points
  - Risks: string → array
  - Upside: extract from founder_profile
  - Add defaults for missing fields
    ↓
Valid Report Object
```

## Implementation

The transformation is implemented in:
- **File**: `src/lib/reportTransformer.ts`
- **Function**: `transformN8nReportToReport()`
- **Used in**: 
  - `src/pages/IdeaInputPage.tsx` (after webhook response)
  - `src/pages/ReportPage.tsx` (when loading from localStorage)

## Schema Validation

The transformer ensures:
1. ✅ All required fields are present
2. ✅ Data types match schema expectations
3. ✅ Arrays are always arrays (never null/undefined)
4. ✅ Nested structures are properly formed
5. ✅ Defaults are provided for missing data

## Testing Recommendations

1. Test with full n8n response
2. Test with partial n8n response (missing fields)
3. Test with already-transformed data (idempotency)
4. Test with empty/null values
5. Verify all UI components render correctly with transformed data

