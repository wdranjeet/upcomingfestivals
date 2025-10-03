GitHub Copilot Prompt – Festival Countdown Web Application

Build a Festival Countdown Web Application using Vanilla JavaScript, HTML5, and Tailwind CSS.

Requirements
🎊 Core Features

Display a list of major upcoming Indian festivals (Diwali, Holi, Eid, Raksha Bandhan, Christmas, Independence Day, etc.).

Each festival card should show:

Festival name with emoji/icon.

Festival date (formatted nicely).

Live countdown timer (Days, Hours, Minutes, Seconds) updating every second.

If the festival is today, display “🎉 Happening Today!”.

Festivals should be stored in a data.js file as an array of objects with fields: name, date, type.

Sort festivals automatically by upcoming date.

🔍 Optional Features

Search bar to find a festival by name.

Filter festivals by religion/category (Hindu, Muslim, Christian, Sikh, National).

Festival details page with description, cultural significance, and images.

Dark/Light mode toggle with Tailwind’s dark: classes (preference saved in localStorage).

Local notifications/reminders (optional, as PWA).

🎨 UI/UX Requirements

Clean and responsive design using Tailwind CSS.

Use grid layout for displaying multiple festival cards.

Each card must include: name, date, countdown, and category badge.

Colorful, festive theme with emojis (🪔, 🎨, 🎄, 🪅, ☪️, ✝️, 🕉️).

📊 Technical Details

Use setInterval() for updating countdown timers.

Use JavaScript Date API to calculate time remaining.

Keep all logic client-side only (no backend required).

Deploy-ready for GitHub Pages or Netlify.

📂 File Structure
/festival-countdown-app
  ├── index.html        # Main page (festival list + countdowns)
  ├── festival.html     # Festival details page (optional)
  ├── style.css         # Tailwind CSS (via CDN or compiled)
  ├── app.js            # Main JS logic (timers, UI updates)
  ├── data.js           # JSON/Array of festivals with dates
  └── assets/           # Icons/images

✅ Deliverables

Fully functional web app showing Indian festival countdowns.

Responsive grid-based UI styled with Tailwind.

Sorted list of upcoming festivals with live countdowns.

Optional filters/search/dark mode.

Ready for deployment to Netlify/GitHub Pages.

⚡ With this one prompt, Copilot should generate:

index.html with Tailwind + structure.

data.js containing festival JSON.

app.js with countdown logic.
