/**
 * Normalizes a string by converting to lowercase and removing accents
 * @param {string} s 
 * @returns {string} 
 */
export const normalizeName = (s) => {
  if (!s) return '';
  
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Checks if two strings match with fuzzy logic (allowing 1 edit)
 * @param {string} query - The search query
 * @param {string} text - The text to search in
 * @returns {boolean} - True if fuzzy match found
 */
export const isFuzzyMatch = (query, text) => {
  if (!query || !text) return false;
  
  const normalizedQuery = normalizeName(query);
  const normalizedText = normalizeName(text);
  
  // Exact match
  if (normalizedQuery === normalizedText) return true;
  
  // Check if query is a substring of text
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Check if text is a substring of query
  if (normalizedQuery.includes(normalizedText)) return true;
  
  // Fuzzy match with 1 edit distance
  return levenshteinDistance(normalizedQuery, normalizedText) <= 1;
};

/**
 * Calculates the Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Edit distance
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  // Initialize matrix
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill matrix
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};
