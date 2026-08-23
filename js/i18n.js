/**
 * i18n (Internationalization) Module
 * Handles Japanese/English language switching
 */

const I18n = (function () {
    let currentLang = 'ja';

    // Translation dictionary for static text
    const translations = {
        ja: {
            // Nav
            'nav.games': 'Games',
            'nav.illustrations': 'Illustrations',
            'nav.contact': 'Contact',
            // Hero
            'hero.subtitle': 'Indie Game Developer',
            'hero.catchphrase': '「こんなゲームあったらいいな」を作ってます。',
            'hero.scroll': '下へスクロール',
            // Games
            'games.title': 'Games',
            'games.viewDetail': '詳細を見る',
            // Modal labels
            'modal.engine': 'エンジン',
            'modal.genre': 'ジャンル',
            'modal.status': '状態',
            'modal.period': '開発期間',
            // Illustrations
            'illustrations.title': 'Illustrations',
            // Contact
            'contact.title': 'Contact',
            // Footer
            'footer.tagline': 'Indie Game Developer',
            'footer.policy': 'ポリシー・注意書き',
            // Loading
            'gallery.loading': 'イラストを読み込み中...',
            'games.loading': '作品を読み込み中...',
        },
        en: {
            // Nav
            'nav.games': 'Games',
            'nav.illustrations': 'Illustrations',
            'nav.contact': 'Contact',
            // Hero
            'hero.subtitle': 'Indie Game Developer',
            'hero.catchphrase': 'Creating games I wish existed.',
            'hero.scroll': 'Scroll down',
            // Games
            'games.title': 'Games',
            'games.viewDetail': 'View Details',
            // Modal labels
            'modal.engine': 'Engine',
            'modal.genre': 'Genre',
            'modal.status': 'Status',
            'modal.period': 'Dev Period',
            // Illustrations
            'illustrations.title': 'Illustrations',
            // Contact
            'contact.title': 'Contact',
            // Footer
            'footer.tagline': 'Indie Game Developer',
            'footer.policy': 'Policy & Notices',
            // Loading
            'gallery.loading': 'Loading illustrations...',
            'games.loading': 'Loading works...',
        }
    };

    // Get translation for a key
    function t(key) {
        return (translations[currentLang] && translations[currentLang][key]) || key;
    }

    // Get localized field from game data
    function localizeField(obj, field) {
        if (currentLang === 'en') {
            return obj[field + '_en'] || obj[field];
        }
        return obj[field];
    }

    // Get current language
    function getLang() {
        return currentLang;
    }

    // Initialize
    function init() {
        // Restore language from localStorage
        const savedLang = localStorage.getItem('lang');
        if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
            currentLang = savedLang;
        }

        // Set up toggle button
        const btn = document.getElementById('lang-toggle');
        if (btn) {
            updateButton(btn);
            btn.addEventListener('click', () => {
                currentLang = currentLang === 'ja' ? 'en' : 'ja';
                localStorage.setItem('lang', currentLang);
                updateButton(btn);
                applyTranslations();
                // Notify other modules to re-render
                document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: currentLang } }));
            });
        }

        // Apply immediately
        applyTranslations();
    }

    // Update button text
    function updateButton(btn) {
        // Show the language you can switch TO
        btn.textContent = currentLang === 'ja' ? 'EN' : 'JP';
        btn.setAttribute('aria-label', currentLang === 'ja' ? 'Switch to English' : '日本語に切り替え');
    }

    // Apply translations to static HTML elements
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = t(key);
            if (text.includes('\n')) {
                el.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                el.textContent = text;
            }
        });
    }

    return { init, t, localizeField, getLang };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', I18n.init);
} else {
    I18n.init();
}
