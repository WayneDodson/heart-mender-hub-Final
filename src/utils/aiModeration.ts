// AI Content Moderation using OpenAI API
// This runs client-side using the OpenAI API key stored in environment

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface ModerationResult {
  approved: boolean;
  score: number; // 0-1, higher = more problematic
  reason: string;
  categories: string[];
}

export async function moderateContent(content: string, title?: string): Promise<ModerationResult> {
  // If no API key, auto-approve (fallback for development)
  if (!OPENAI_API_KEY) {
    return { approved: true, score: 0, reason: 'Auto-approved (no moderation key)', categories: [] };
  }

  try {
    // Use OpenAI moderation endpoint
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: `${title ? title + '\n\n' : ''}${content}`,
      }),
    });

    if (!response.ok) {
      console.warn('Moderation API error, auto-approving');
      return { approved: true, score: 0, reason: 'Moderation service unavailable', categories: [] };
    }

    const data = await response.json();
    const result = data.results?.[0];

    if (!result) {
      return { approved: true, score: 0, reason: 'No moderation result', categories: [] };
    }

    const flaggedCategories = Object.entries(result.categories || {})
      .filter(([, flagged]) => flagged)
      .map(([category]) => category);

    const maxScore = Math.max(...Object.values(result.category_scores || {}).map(Number));

    return {
      approved: !result.flagged,
      score: maxScore,
      reason: result.flagged
        ? `Content flagged for: ${flaggedCategories.join(', ')}`
        : 'Content approved',
      categories: flaggedCategories,
    };
  } catch (error) {
    console.warn('Moderation error:', error);
    // On error, send to pending review rather than auto-approve
    return { approved: false, score: 0.5, reason: 'Pending manual review', categories: [] };
  }
}

// Sanitise user input to prevent XSS
export function sanitiseInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Rate limiting using localStorage
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(action: string, maxPerMinute = 5): boolean {
  const now = Date.now();
  const key = `ratelimit_${action}`;
  const stored = localStorage.getItem(key);
  const timestamps: number[] = stored ? JSON.parse(stored) : [];

  // Remove timestamps older than 1 minute
  const recent = timestamps.filter(t => now - t < 60000);

  if (recent.length >= maxPerMinute) {
    return false; // Rate limited
  }

  recent.push(now);
  localStorage.setItem(key, JSON.stringify(recent));
  return true; // Allowed
}
