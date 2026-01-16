/**
 * Theme Toggle Functionality
 * Handles dark/light theme switching with localStorage persistence
 */

(function() {
    const THEME_KEY = 'portfolio-theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    // Get saved theme or default to dark
    function getSavedTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }
        return DARK_THEME; // Default to dark
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    // Toggle between themes
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        applyTheme(newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        const theme = getSavedTheme();
        applyTheme(theme);

        // Add click handler to toggle button
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    }

    // Apply theme immediately to prevent flash
    applyTheme(getSavedTheme());

    // Wait for DOM to attach event listeners
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
