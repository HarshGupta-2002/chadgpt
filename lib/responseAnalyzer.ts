// Phrases indicating the model lacks real-time data
const FALLBACK_PHRASES = [
  'as of my knowledge cutoff',
  'my knowledge cutoff',
  'knowledge cutoff',
  "i don't have real-time information",
  "i don't have access to real-time",
  "i cannot access real-time",
  "i can't provide real-time",
  'my training data only goes up to',
  'my training data ends',
  'my last update was',
  "i don't have access to current",
  "i don't have information beyond",
  'as of my last training',
  'my training only extends to',
  "i can't browse the internet",
  "i cannot browse the internet",
  "i don't have browsing capabilities",
] as const;

export function containsFallbackPhrase(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const normalizedText = text.toLowerCase();

  return FALLBACK_PHRASES.some(phrase =>
    normalizedText.includes(phrase)
  );
}

// Keyword/phrase signals that a user's query is asking about something that
// changes over time — the answer can only be correct if it's looked up live.
// Matched as whole words/phrases against the lowercased query so we don't
// trip on substrings buried inside unrelated words.
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

/**
 * Detects recency intent in the user's own query, before the base model is
 * ever called. This is the primary trigger for routing to MODELS.ONLINE:
 * the base model frequently answers time-sensitive questions with a
 * confident but stale guess rather than admitting ignorance, so
 * containsFallbackPhrase() (a response-side safety net) never fires for
 * those cases. Keyword matching on the query catches them upfront instead.
 */
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

