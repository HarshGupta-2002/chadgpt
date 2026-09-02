// Signals that a query needs live/current data. Matched as substrings
// against the lowercased query.
const LIVE_DATA_KEYWORDS = [
  'today',
  "today's",
  'tonight',
  'right now',
  'currently',
  'current',
  'latest',
  'up to date',
  'up-to-date',
  'recent',
  'recently',
  'this week',
  'this month',
  'this year',
  'this weekend',
  'this morning',
  'this afternoon',
  'this evening',
  'breaking news',
  'news',
  'headline',
  'headlines',
  'score',
  'scores',
  'standings',
  'weather',
  'forecast',
  'temperature',
  'stock price',
  'share price',
  'exchange rate',
  'crypto price',
  'market cap',
  'live',
  'who is the current',
  "who's the current",
  'who is currently',
  'what is the current',
  "what's the current",
  'as of today',
] as const;

// A near-present year mentioned in the query (this year or next) is a strong
// recency signal on its own, independent of the keyword list above.
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_PATTERN = new RegExp(
  `\\b(${CURRENT_YEAR - 1}|${CURRENT_YEAR}|${CURRENT_YEAR + 1})\\b`
);

// Detects recency intent in the query upfront, before any model is called.
// Sole trigger for routing to MODELS.ONLINE instead of MODELS.BASE.
export function needsLiveData(query: string): boolean {
  if (!query || typeof query !== 'string') {
    return false;
  }

  const normalizedQuery = query.toLowerCase();

  if (LIVE_DATA_KEYWORDS.some(keyword => normalizedQuery.includes(keyword))) {
    return true;
  }

  return YEAR_PATTERN.test(normalizedQuery);
}

