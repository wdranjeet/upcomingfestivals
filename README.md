# 🎊 Upcoming Festivals Countdown Web Application

A modern, responsive web application built with React.js and Bootstrap 5 that displays upcoming Indian festivals with live countdown timers.

![Festival App](https://github.com/user-attachments/assets/7616ab7e-16f7-47d2-9020-8d17fc73897a)

## ✨ Features

### Core Features
- **20+ Major Festivals**: Includes Diwali, Holi, Eid, Christmas, Ganesh Chaturthi, Durga Puja, Navratri, and more
- **Real-time Countdown Timers**: Live countdown showing Days, Hours, Minutes, and Seconds for each festival using `setInterval`
- **Animated Timers**: Smooth flip animations and fade-in effects when numbers update
- **Fullscreen Background Image**: Vibrant festive background with dark overlay for better readability
- **Search Functionality**: Quickly find festivals by name with instant search
- **Category Filters**: Filter festivals by religion/type (Hindu, Muslim, Christian, Sikh, Jain, Buddhist, National)
- **Dark/Light Mode**: Toggle between themes with preference saved in localStorage
- **Responsive Design**: Mobile-friendly layout using Bootstrap 5 Grid system
- **Auto-Sorting**: Festivals automatically sorted by nearest upcoming date
- **Bootstrap 5 UI**: Modern Card components, Buttons, Modals, and Navbar
- **"Remind Me" CTA**: Large call-to-action button that opens modal with Google Calendar integration

### 🎉 NEW Features
- **🎵 Background Festive Music Toggle**: Play/pause background music with volume control and localStorage persistence
- **📱 Social Sharing Buttons**: Share festivals on Facebook, Twitter, WhatsApp, and LinkedIn with one click
- **🌐 Multi-Language Support**: Switch between English and Hindi with full UI translation including festival descriptions
- **🔄 Live Festival API Integration**: Toggle between live API data and local JSON with hybrid fallback approach

### Technical Highlights
- **Frontend**: React.js with Functional Components and Hooks (useState, useEffect)
- **UI Framework**: Bootstrap 5 with react-bootstrap components
- **Responsive Grid**: Bootstrap Grid system for mobile-first design
- **API Handling**: Fetch API with async/await for loading festival data
- **Countdown Logic**: JavaScript Date Object with real-time updates
- **Animations**: CSS transitions and animations for smooth effects
- **No Backend Required**: Runs entirely in the browser with static JSON data

## 📂 File Structure

```
/upcomingfestivals
  ├── public/
  │   ├── index.html           # Main HTML template
  │   ├── festivals.json       # Festival data (fallback dataset)
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── Countdown.js     # Timer logic and UI
  │   │   ├── FestivalCard.js  # Card UI for festival info
  │   │   ├── FestivalDetail.js # Detailed festival view
  │   │   ├── Header.js        # Navbar component
  │   │   ├── MusicPlayer.js   # Background music player (NEW)
  │   │   └── SocialShare.js   # Social sharing component (NEW)
  │   ├── contexts/
  │   │   └── LanguageContext.js # Language management context (NEW)
  │   ├── services/
  │   │   └── festivalService.js # API integration service (NEW)
  │   ├── App.js               # Main layout with background + sections
  │   ├── App.css              # Custom styles and animations
  │   ├── translations.js      # English/Hindi translations (NEW)
  │   └── index.js             # React app entry point
  ├── netlify.toml             # Netlify deployment configuration
  ├── package.json             # Dependencies and scripts
  ├── .gitignore               # Git ignore rules
  ├── API_CONFIGURATION.md     # Comprehensive API setup guide
  └── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/wdranjeet/upcomingfestivals.git
   cd upcomingfestivals
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Netlify

#### Option 1: Git Integration (Recommended)
1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Netlify will automatically detect the settings from `netlify.toml`
6. Click "Deploy site"

#### Option 2: Netlify Drop
1. Run `npm run build` locally
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `build` folder
4. Your site is live! ✨

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

## 🎨 Customization

### Adding New Festivals
Edit `public/festivals.json` and add a new festival object:

```javascript
{
  "name": "Your Festival",
  "date": "2025-MM-DD",
  "type": "Category",
  "emoji": "🎉",
  "description": "Festival description"
}
```

**Important:** Dates must be in `YYYY-MM-DD` format and should be future dates for the countdown to work.

### API Configuration

The app currently uses a static JSON file (`public/festivals.json`) as its data source. To integrate external APIs for automatic festival updates:

**📖 See the comprehensive [API Configuration Guide](./API_CONFIGURATION.md)** for:
- Setting up Nager.Date API (no API key required)
- Configuring Calendarific API
- Using AbstractAPI Holidays
- Implementing hybrid API + JSON fallback
- Troubleshooting common issues

**Quick Start with API:**
1. Check the [API_CONFIGURATION.md](./API_CONFIGURATION.md) file
2. Choose your preferred API provider
3. Follow the step-by-step integration guide
4. Test with fallback to ensure reliability

### Changing Colors/Themes
The app uses Bootstrap 5 and custom CSS. Modify the styles in `src/App.css` or update Bootstrap variables.

**Countdown Timer Colors:**
The countdown boxes use vibrant gradients defined in `src/App.css`:
- Days: Pink gradient (`#f093fb` to `#f5576c`)
- Hours: Cyan gradient (`#4facfe` to `#00f2fe`)
- Minutes: Green gradient (`#43e97b` to `#38f9d7`)
- Seconds: Orange gradient (`#fa709a` to `#fee140`)

### Changing Background Image
In `src/App.css`, update the `.hero-section` background-image URL:

```css
.hero-section {
  background-image: 
    url('YOUR_IMAGE_URL'),
    linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Usage

### Basic Features
1. **Browse Festivals**: Scroll through the list of upcoming festivals
2. **Search**: Type in the search box to find specific festivals
3. **Filter**: Use the dropdown to filter by religion/category
4. **Watch Countdown**: Timers update every second automatically
5. **Learn More**: Click the "Learn More" button on any festival card
6. **Add to Calendar**: Click "Add to Google Calendar" in the detail page

### New Features
7. **🎵 Background Music**: Click the music icon (🎵) in the header to play/pause festive background music
8. **🌐 Language Toggle**: Click "हिं" or "EN" in the header to switch between Hindi and English
9. **🌙 Dark Mode**: Click the moon/sun icon to toggle dark mode
10. **📱 Social Sharing**: Click the share buttons (📘 🐦 💬) on festival cards to share on social media
11. **🔄 Live API Data**: Toggle the "Use Live API Data" switch to fetch festivals from a live API source

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Bootstrap 5** - UI framework
- **react-bootstrap** - Bootstrap components for React
- **React Router** - Client-side routing
- **React Context API** - State management for language
- **CSS3** - Animations and custom styling
- **Fetch API** - Data loading and API integration
- **LocalStorage** - Persisting user preferences (dark mode, language, music, API source)
- **Nager.Date API** - Live festival/holiday data integration

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

Made with ❤️ for celebrating Indian culture and traditions.

## 🐛 Known Issues

None at the moment. Please report any issues on GitHub.

### Recent Fixes
- ✅ **Fixed:** Countdown timer gradient colors now display correctly (Oct 2025)
  - Issue: Countdown boxes were showing with transparent backgrounds
  - Solution: Updated CSS selectors in `App.css` to properly target countdown boxes

### Recent Enhancements (Latest Update)
- ✅ **Added:** Background festive music toggle with play/pause controls
  - Feature: Music player in header with 🎵/🔇 icon
  - Volume: Set to 30% for comfortable listening
  - Persistence: Saves preference to localStorage
  
- ✅ **Added:** Social sharing functionality
  - Platforms: Facebook, Twitter, WhatsApp, LinkedIn
  - Integration: Compact buttons on cards, full section on detail pages
  - Mobile: Native share API support
  
- ✅ **Added:** Multi-language support (English/Hindi)
  - Toggle: हिं/EN button in header
  - Coverage: Complete UI translation including festival descriptions
  - Persistence: Language preference saved to localStorage
  
- ✅ **Added:** Live festival API integration
  - Source: Nager.Date API (no API key required)
  - Toggle: Switch between API and local JSON data
  - Fallback: Hybrid approach ensures data availability
  - Persistence: API preference saved to localStorage

## 🚧 Future Enhancements

- [x] Background festive music toggle ✅ **COMPLETED**
- [x] Social sharing buttons ✅ **COMPLETED**
- [x] Multi-language support ✅ **COMPLETED**
- [x] Integration with live festival API ✅ **COMPLETED**
- [ ] Push notifications for upcoming festivals
- [ ] User authentication to save favorite festivals
- [ ] Additional language support (Spanish, French, etc.)
- [ ] Custom music upload feature
