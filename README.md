# 🎊 Indian Festival Countdown Web Application

A beautiful, responsive web application that displays upcoming Indian festivals with live countdown timers.

![Festival App](https://github.com/user-attachments/assets/7616ab7e-16f7-47d2-9020-8d17fc73897a)

## ✨ Features

### Core Features
- **20+ Major Festivals**: Includes Diwali, Holi, Eid, Christmas, Ganesh Chaturthi, Durga Puja, Navratri, and more
- **Live Countdown Timers**: Real-time countdown showing Days, Hours, Minutes, and Seconds for each festival
- **Search Functionality**: Quickly find festivals by name with instant search
- **Category Filters**: Filter festivals by religion/type (Hindu, Muslim, Christian, Sikh, Jain, Buddhist, National)
- **Dark/Light Mode**: Toggle between themes with preference saved in localStorage
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Auto-Sorting**: Festivals automatically sorted by nearest upcoming date
- **Festive UI**: Colorful cards with emojis and gradient countdown timers

### Technical Highlights
- **Pure Client-Side**: No backend required, runs entirely in the browser
- **Vanilla JavaScript**: No frameworks, just clean ES6+ JavaScript
- **Tailwind CSS**: Modern utility-first CSS via CDN
- **Optimized Performance**: Efficient countdown updates using setInterval()

## 📂 File Structure

```
/upcomingfestivals
  ├── index.html        # Main page with festival list and countdowns
  ├── app.js            # Main application logic (timers, filters, search)
  ├── data.js           # Festival data with dates and descriptions
  ├── netlify.toml      # Netlify deployment configuration
  ├── .gitignore        # Git ignore rules
  └── README.md         # This file
```

## 🚀 Quick Start

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/wdranjeet/upcomingfestivals.git
   cd upcomingfestivals
   ```

2. Open `index.html` in your browser or serve with a local server:
   ```bash
   # Using Python
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8080` in your browser

### Deploy to Netlify

#### Option 1: Netlify Drop (Easiest)
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire project folder
3. Your site is live! ✨

#### Option 2: Git Integration
1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Netlify will automatically detect the settings from `netlify.toml`
6. Click "Deploy site"

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🎨 Customization

### Adding New Festivals
Edit `data.js` and add a new festival object:

```javascript
{
  name: "Your Festival",
  date: "2025-MM-DD",
  type: "Category",
  emoji: "🎉",
  description: "Festival description"
}
```

### Changing Colors/Themes
The app uses Tailwind CSS. Modify the classes in `index.html` or update the Tailwind config in the `<script>` tag.

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

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

Made with ❤️ for celebrating Indian culture and traditions.
