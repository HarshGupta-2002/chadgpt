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

