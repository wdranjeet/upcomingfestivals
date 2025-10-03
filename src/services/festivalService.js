// Festival API Service
// This service provides methods to fetch festival data from various sources

/**
 * Fetch festivals from Nager.Date API (No API key required)
 * Free API for public holidays
 */
export const fetchFromNagerDateAPI = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/IN`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Nager.Date API');
    }
    
    const data = await response.json();
    
    // Transform API data to our festival format
    return data.map(holiday => ({
      name: holiday.name || holiday.localName,
      date: holiday.date,
      type: 'National', // Nager.Date doesn't categorize by religion
      emoji: getEmojiForFestival(holiday.name),
      description: `Public holiday in India - ${holiday.localName || holiday.name}`,
      source: 'api'
    }));
  } catch (error) {
    console.error('Error fetching from Nager.Date API:', error);
    return [];
  }
};

/**
 * Fetch festivals from local JSON file
 */
export const fetchFromLocalJSON = async () => {
  try {
    const response = await fetch('/festivals.json');
    if (!response.ok) {
      throw new Error('Failed to fetch local festivals.json');
    }
    const data = await response.json();
    return data.map(festival => ({ ...festival, source: 'local' }));
  } catch (error) {
    console.error('Error fetching local festivals:', error);
    return [];
  }
};

/**
 * Hybrid approach - fetch from API and merge with local JSON
 * This is the recommended approach for production
 */
export const fetchFestivals = async (useAPI = false) => {
  try {
    let festivals = [];
    
    if (useAPI) {
      // Try to fetch from API first
      const apiFestivals = await fetchFromNagerDateAPI();
      festivals = [...apiFestivals];
    }
    
    // Always fetch local festivals
    const localFestivals = await fetchFromLocalJSON();
    
    // Merge both sources
    const allFestivals = [...festivals, ...localFestivals];
    
    // Remove duplicates based on name and date
    const uniqueFestivals = allFestivals.filter((festival, index, self) =>
      index === self.findIndex(f => 
        f.name === festival.name && f.date === festival.date
      )
    );
    
    return uniqueFestivals;
  } catch (error) {
    console.error('Error in hybrid fetch, using fallback:', error);
    // Fallback to local JSON only
    return await fetchFromLocalJSON();
  }
};

/**
 * Helper function to get emoji for a festival based on its name
 */
function getEmojiForFestival(name) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('diwali') || lowerName.includes('deepavali')) return '🪔';
  if (lowerName.includes('holi')) return '🎨';
  if (lowerName.includes('eid')) return '☪️';
  if (lowerName.includes('christmas')) return '🎄';
  if (lowerName.includes('republic') || lowerName.includes('independence')) return '🇮🇳';
  if (lowerName.includes('gandhi')) return '🕊️';
  if (lowerName.includes('ganesh')) return '🐘';
  if (lowerName.includes('durga') || lowerName.includes('navratri')) return '🔱';
  if (lowerName.includes('krishna')) return '🦚';
  if (lowerName.includes('ram')) return '🏹';
  if (lowerName.includes('mahavir')) return '🙏';
  if (lowerName.includes('buddha')) return '☸️';
  if (lowerName.includes('guru nanak')) return '🕉️';
  
  return '🎉'; // Default emoji
}

const festivalService = {
  fetchFestivals,
  fetchFromNagerDateAPI,
  fetchFromLocalJSON
};

export default festivalService;
