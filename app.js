// Main Application Logic
class FestivalCountdownApp {
    constructor() {
        this.festivals = festivals;
        this.filteredFestivals = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.timers = [];
        
        this.init();
    }

    init() {
        // Initialize dark mode
        this.initDarkMode();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial render
        this.filterAndRenderFestivals();
        
        // Start countdown updates
        this.startCountdownUpdates();
    }

    initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const htmlElement = document.documentElement;
        
        // Check for saved preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark');
        }
        
        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const newTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const filterSelect = document.getElementById('filterSelect');
        
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterAndRenderFestivals();
        });
        
        filterSelect.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.filterAndRenderFestivals();
        });
    }

    filterAndRenderFestivals() {
        // Get current date
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        
        // Filter festivals
        this.filteredFestivals = this.festivals.filter(festival => {
            const festivalDate = new Date(festival.date);
            festivalDate.setHours(0, 0, 0, 0);
            
            // Only show upcoming or current festivals
            if (festivalDate < now) {
                return false;
            }
            
            // Apply type filter
            if (this.currentFilter !== 'all' && festival.type !== this.currentFilter) {
                return false;
            }
            
            // Apply search filter
            if (this.searchQuery && !festival.name.toLowerCase().includes(this.searchQuery)) {
                return false;
            }
            
            return true;
        });
        
        // Sort by date (nearest first)
        this.filteredFestivals.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        
        // Render festivals
        this.renderFestivals();
        
        // Update count
        document.getElementById('festivalCount').textContent = this.filteredFestivals.length;
    }

    renderFestivals() {
        const container = document.getElementById('festivalsContainer');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredFestivals.length === 0) {
            container.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        container.innerHTML = this.filteredFestivals.map((festival, index) => 
            this.createFestivalCard(festival, index)
        ).join('');
    }

    createFestivalCard(festival, index) {
        const typeColors = {
            'Hindu': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'Muslim': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'Christian': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'Sikh': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'National': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'Jain': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Buddhist': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
        };
        
        const typeColor = typeColors[festival.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        const formattedDate = this.formatDate(festival.date);
        
        return `
            <div class="festival-card bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden" style="animation-delay: ${index * 0.1}s">
                <div class="p-6">
                    <!-- Festival Header -->
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <span class="text-4xl">${festival.emoji}</span>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">${festival.name}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">${formattedDate}</p>
                            </div>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${typeColor}">
                            ${festival.type}
                        </span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${festival.description}</p>
                    
                    <!-- Countdown -->
                    <div id="countdown-${index}" class="countdown-container">
                        <!-- Countdown will be inserted here -->
                    </div>
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-IN', options);
    }

    calculateCountdown(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);
        const diff = target - now;
        
        if (diff <= 0) {
            return null;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }

    updateCountdowns() {
        this.filteredFestivals.forEach((festival, index) => {
            const countdownElement = document.getElementById(`countdown-${index}`);
            if (!countdownElement) return;
            
            const countdown = this.calculateCountdown(festival.date);
            
            if (countdown === null) {
                countdownElement.innerHTML = `
                    <div class="text-center py-4">
                        <p class="text-2xl font-bold text-green-600 dark:text-green-400">🎉 Happening Today! 🎉</p>
                    </div>
                `;
            } else {
                countdownElement.innerHTML = `
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div class="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-lg p-3">
                            <div class="countdown-digit">${countdown.days}</div>
                            <div class="countdown-label">Days</div>
                        </div>
                        <div class="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 rounded-lg p-3">
                            <div class="countdown-digit">${countdown.hours}</div>
                            <div class="countdown-label">Hours</div>
                        </div>
                        <div class="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg p-3">
                            <div class="countdown-digit">${countdown.minutes}</div>
                            <div class="countdown-label">Minutes</div>
                        </div>
                        <div class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg p-3">
                            <div class="countdown-digit">${countdown.seconds}</div>
                            <div class="countdown-label">Seconds</div>
                        </div>
                    </div>
                `;
            }
        });
    }

    startCountdownUpdates() {
        // Clear any existing timers
        this.timers.forEach(timer => clearInterval(timer));
        this.timers = [];
        
        // Update immediately
        this.updateCountdowns();
        
        // Update every second
        const timer = setInterval(() => {
            this.updateCountdowns();
        }, 1000);
        
        this.timers.push(timer);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FestivalCountdownApp();
});
