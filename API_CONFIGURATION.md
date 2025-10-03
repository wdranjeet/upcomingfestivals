# 🔧 API Configuration Guide

This guide explains how to configure external APIs or use the fallback JSON dataset for the Upcoming Festivals Countdown Web Application.

## 📋 Table of Contents

1. [Current Configuration (Static JSON)](#current-configuration-static-json)
2. [Integrating External APIs](#integrating-external-apis)
3. [Recommended Public APIs](#recommended-public-apis)
4. [Configuration Steps](#configuration-steps)
5. [Troubleshooting](#troubleshooting)

## 🎯 Current Configuration (Static JSON)

Currently, the application uses a **static JSON file** (`public/festivals.json`) as its data source. This is a reliable fallback that doesn't require API keys or external dependencies.

### How It Works

The app fetches festival data from `/festivals.json` in the `useEffect` hook:

```javascript
// src/App.js
useEffect(() => {
  fetch('/festivals.json')
    .then(response => response.json())
    .then(data => {
      setFestivals(data);
      filterFestivals(data, 'all', '');
    })
    .catch(error => console.error('Error loading festivals:', error));
}, []);
```

### Festival Data Format

Each festival in `public/festivals.json` follows this structure:

```json
{
  "name": "Diwali",
  "date": "2025-10-20",
  "type": "Hindu",
  "emoji": "🪔",
  "description": "Festival of Lights, celebrating the victory of light over darkness."
}
```

**Required Fields:**
- `name` (string): Festival name
- `date` (string): ISO format date (YYYY-MM-DD)
- `type` (string): Category - Hindu, Muslim, Christian, Sikh, Jain, Buddhist, or National
- `emoji` (string): Festival emoji icon
- `description` (string): Brief description

## 🌐 Integrating External APIs

### Why Use External APIs?

- **Automatic Updates**: Get current year festival dates without manual updates
- **Dynamic Data**: Access real-time holiday information
- **Extended Coverage**: Include global holidays and festivals
- **Accuracy**: Official holiday data from government sources

### Recommended Public APIs

#### 1. **Nager.Date API** (Free, No API Key Required)

**Best for:** Global public holidays

**Endpoint:** `https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}`

**Example for India:**
```javascript
fetch('https://date.nager.at/api/v3/PublicHolidays/2025/IN')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Response Format:**
```json
[
  {
    "date": "2025-01-26",
    "localName": "Republic Day",
    "name": "Republic Day",
    "countryCode": "IN",
    "fixed": true,
    "global": true,
    "launchYear": null,
    "types": ["Public"]
  }
]
```

**Documentation:** https://date.nager.at/

---

#### 2. **Calendarific API** (Free Tier: 1000 requests/month)

**Best for:** Detailed holiday information with descriptions

**Endpoint:** `https://calendarific.com/api/v2/holidays`

**Parameters:**
- `api_key`: Your API key (required)
- `country`: Country code (e.g., IN for India)
- `year`: Year (e.g., 2025)

**Example Request:**
```javascript
const API_KEY = 'your_api_key_here';
const year = 2025;
const country = 'IN';

fetch(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

**Get API Key:** https://calendarific.com/api-documentation

---

#### 3. **AbstractAPI Holidays API** (Free Tier: 1000 requests/month)

**Best for:** Holiday data with flexible filtering

**Endpoint:** `https://holidays.abstractapi.com/v1/`

**Parameters:**
- `api_key`: Your API key (required)
- `country`: Country code (e.g., IN)
- `year`: Year
- `month`: Optional month filter
- `day`: Optional day filter

**Example Request:**
```javascript
const API_KEY = 'your_api_key_here';

fetch(`https://holidays.abstractapi.com/v1/?api_key=${API_KEY}&country=IN&year=2025`)
  .then(response => response.json())
  .then(data => console.log(data));
```

**Get API Key:** https://www.abstractapi.com/holidays-api

---

#### 4. **Holiday API** (Free for personal use)

**Best for:** Indian festivals and holidays

**Endpoint:** `https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events`

**Note:** Requires Google Calendar API key

**Get API Key:** https://console.cloud.google.com/

## 🔧 Configuration Steps

### Option 1: Using Nager.Date API (No API Key)

**Step 1:** Create a new service file `src/services/festivalService.js`:

```javascript
// Map Nager.Date API response to app format
const mapNagerDateToFestival = (holiday) => ({
  name: holiday.localName || holiday.name,
  date: holiday.date,
  type: 'National', // Default type
  emoji: getEmojiForHoliday(holiday.name),
  description: `${holiday.name} - National holiday in ${holiday.countryCode}`
});

const getEmojiForHoliday = (name) => {
  const emojiMap = {
    'Republic Day': '🇮🇳',
    'Independence Day': '🇮🇳',
    'Diwali': '🪔',
    'Holi': '🎨',
    // Add more mappings
  };
  return emojiMap[name] || '🎉';
};

export const fetchFestivalsFromNagerDate = async (year = new Date().getFullYear()) => {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`);
    const data = await response.json();
    return data.map(mapNagerDateToFestival);
  } catch (error) {
    console.error('Error fetching from Nager.Date API:', error);
    throw error;
  }
};
```

**Step 2:** Update `src/App.js` to use the API:

```javascript
import { fetchFestivalsFromNagerDate } from './services/festivalService';

useEffect(() => {
  // Try API first, fallback to JSON
  fetchFestivalsFromNagerDate()
    .then(data => {
      setFestivals(data);
      filterFestivals(data, 'all', '');
    })
    .catch(error => {
      console.error('API failed, using fallback JSON:', error);
      // Fallback to JSON
      fetch('/festivals.json')
        .then(response => response.json())
        .then(data => {
          setFestivals(data);
          filterFestivals(data, 'all', '');
        });
    });
}, []);
```

---

### Option 2: Using Calendarific API (With API Key)

**Step 1:** Get your API key from https://calendarific.com/

**Step 2:** Create environment variables file `.env` in project root:

```env
REACT_APP_CALENDARIFIC_API_KEY=your_api_key_here
```

**Step 3:** Create service file `src/services/festivalService.js`:

```javascript
const API_KEY = process.env.REACT_APP_CALENDARIFIC_API_KEY;

const mapCalendarificToFestival = (holiday) => ({
  name: holiday.name,
  date: holiday.date.iso,
  type: holiday.type[0] || 'National',
  emoji: getEmojiForHoliday(holiday.name),
  description: holiday.description || holiday.name
});

const getEmojiForHoliday = (name) => {
  // Same as above
};

export const fetchFestivalsFromCalendarific = async (year = new Date().getFullYear()) => {
  try {
    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=IN&year=${year}`
    );
    const result = await response.json();
    
    if (result.meta.code !== 200) {
      throw new Error(result.meta.error_detail);
    }
    
    return result.response.holidays.map(mapCalendarificToFestival);
  } catch (error) {
    console.error('Error fetching from Calendarific:', error);
    throw error;
  }
};
```

**Step 4:** Update `src/App.js` as shown in Option 1

---

### Option 3: Hybrid Approach (API + JSON Fallback)

This is the **recommended approach** for production:

```javascript
// src/services/festivalService.js
export const fetchFestivals = async () => {
  try {
    // Try API first
    const apiData = await fetchFestivalsFromNagerDate();
    
    // Merge with local JSON for Indian festivals
    const localResponse = await fetch('/festivals.json');
    const localData = await localResponse.json();
    
    // Combine and remove duplicates
    const combined = [...apiData, ...localData];
    const unique = combined.filter((festival, index, self) =>
      index === self.findIndex(f => f.name === festival.name && f.date === festival.date)
    );
    
    return unique;
  } catch (error) {
    console.error('Error in hybrid fetch, using fallback:', error);
    // Fallback to local JSON only
    const response = await fetch('/festivals.json');
    return await response.json();
  }
};
```

## 🐛 Troubleshooting

### Issue: "No festivals found"

**Possible Causes:**
1. JSON file not found in `public/` folder
2. JSON syntax error
3. All festivals are in the past

**Solution:**
- Check browser console for errors
- Verify `public/festivals.json` exists
- Update festival dates to future dates
- Check filtering logic in `App.js`

### Issue: API requests blocked by CORS

**Solution:**
Some APIs may have CORS restrictions. Use a proxy or serverless function:

```javascript
// Netlify Function example: netlify/functions/festivals.js
exports.handler = async (event, context) => {
  const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2025/IN');
  const data = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

Then fetch from your function:
```javascript
fetch('/.netlify/functions/festivals')
  .then(response => response.json())
  .then(data => setFestivals(data));
```

### Issue: API rate limit exceeded

**Solution:**
- Implement caching with localStorage:

```javascript
const CACHE_KEY = 'festivals_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const fetchFestivalsWithCache = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  const data = await fetchFestivals();
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
  
  return data;
};
```

### Issue: Countdown not appearing

**Solution:**
1. Verify date format is `YYYY-MM-DD`
2. Check that dates are in the future
3. Inspect browser console for JavaScript errors
4. Verify Countdown component is rendering

## 📚 Additional Resources

- **Nager.Date Documentation**: https://date.nager.at/
- **Calendarific API Docs**: https://calendarific.com/api-documentation
- **AbstractAPI Docs**: https://www.abstractapi.com/holidays-api
- **React Environment Variables**: https://create-react-app.dev/docs/adding-custom-environment-variables/

## 🤝 Contributing

If you've successfully integrated a different API, please share your configuration by opening a pull request!

---

**Last Updated:** October 2025  
**Maintained by:** Festival Countdown Team
