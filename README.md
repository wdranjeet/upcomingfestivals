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
  │   │   └── Header.js        # Navbar component
  │   ├── App.js               # Main layout with background + sections
  │   ├── App.css              # Custom styles and animations
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

1. **Browse Festivals**: Scroll through the list of upcoming festivals
2. **Search**: Type in the search box to find specific festivals
3. **Filter**: Use the dropdown to filter by religion/category
4. **Dark Mode**: Click the moon/sun icon to toggle dark mode
5. **Watch Countdown**: Timers update every second automatically
6. **Learn More**: Click the "Learn More" button on any festival card
7. **Add to Calendar**: Click "Add to Google Calendar" in the modal

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Bootstrap 5** - UI framework
- **react-bootstrap** - Bootstrap components for React
- **CSS3** - Animations and custom styling
- **Fetch API** - Data loading
- **LocalStorage** - Dark mode preference

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

## 🚧 Future Enhancements

- [ ] Background festive music toggle
- [ ] Social sharing buttons
- [ ] Multi-language support
- [ ] Integration with live festival API
- [ ] Push notifications for upcoming festivals
- [ ] User authentication to save favorite festivals
