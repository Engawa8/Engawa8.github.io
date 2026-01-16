/**
 * Works/Games Module
 * Handles loading and displaying game works from JSON
 */

const Works = (function () {
    let gamesData = [];
    let currentSlideIndex = 0;
    let currentGameData = null;

    // Load games data from JSON
    async function loadGames() {
        try {
            const response = await fetch('data/games.json');
            const data = await response.json();
            gamesData = data.games || [];
            renderGames();
        } catch (error) {
            console.error('Failed to load games data:', error);
            // Show fallback message
            const grid = document.getElementById('games-grid');
            if (grid) {
                grid.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">作品を読み込み中...</p>';
            }
        }
    }

    // Render games grid
    function renderGames() {
        const grid = document.getElementById('games-grid');
        if (!grid) return;

        grid.innerHTML = gamesData.map((game, index) => `
            <article class="game-card" data-game-index="${index}">
                <div class="game-card-image">
                    <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
                    <div class="game-card-overlay">
                        <span>詳細を見る</span>
                    </div>
                </div>
                <div class="game-card-content">
                    <h3 class="game-card-title">${game.title}</h3>
                    <div class="game-card-meta">
                        <span class="game-card-tag">${game.engine}</span>
                        <span class="game-card-status">${game.status}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // Add click handlers
        grid.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.gameIndex);
                openModal(gamesData[index]);
            });
        });
    }

    // Open modal with game details
    function openModal(game) {
        currentGameData = game;
        currentSlideIndex = 0;

        const modal = document.getElementById('game-modal');
        const slider = document.getElementById('modal-slider');
        const title = document.getElementById('modal-title');
        const description = document.getElementById('modal-description');
        const meta = document.getElementById('modal-meta');
        const links = document.getElementById('modal-links');

        // Set slider images
        const screenshots = game.screenshots && game.screenshots.length > 0
            ? game.screenshots
            : [game.thumbnail];

        slider.innerHTML = screenshots.map(src =>
            `<img src="${src}" alt="${game.title} screenshot" loading="lazy">`
        ).join('');

        updateSlider();

        // Set title and description
        title.textContent = game.title;
        description.textContent = game.fullDescription || game.description;

        // Set meta info
        meta.innerHTML = `
            <div class="modal-meta-item">
                <span class="modal-meta-label">エンジン</span>
                <span class="modal-meta-value">${game.engine}</span>
            </div>
            <div class="modal-meta-item">
                <span class="modal-meta-label">ジャンル</span>
                <span class="modal-meta-value">${game.genre}</span>
            </div>
            <div class="modal-meta-item">
                <span class="modal-meta-label">状態</span>
                <span class="modal-meta-value">${game.status}</span>
            </div>
        `;

        // Set links
        const linkButtons = [];
        if (game.links) {
            if (game.links.steam) {
                linkButtons.push(`<a href="${game.links.steam}" target="_blank" rel="noopener noreferrer" class="modal-link">Steam</a>`);
            }
            if (game.links.unityroom) {
                linkButtons.push(`<a href="${game.links.unityroom}" target="_blank" rel="noopener noreferrer" class="modal-link">UnityRoom</a>`);
            }
            if (game.links.itchio) {
                linkButtons.push(`<a href="${game.links.itchio}" target="_blank" rel="noopener noreferrer" class="modal-link">itch.io</a>`);
            }
            if (game.links.googleplay) {
                linkButtons.push(`<a href="${game.links.googleplay}" target="_blank" rel="noopener noreferrer" class="modal-link">Google Play</a>`);
            }
            if (game.links.youtube) {
                linkButtons.push(`<a href="${game.links.youtube}" target="_blank" rel="noopener noreferrer" class="modal-link secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                </a>`);
            }
        }
        links.innerHTML = linkButtons.join('');

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('game-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentGameData = null;
    }

    // Update slider position
    function updateSlider() {
        const slider = document.getElementById('modal-slider');
        const images = slider.querySelectorAll('img');
        images.forEach((img, index) => {
            img.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        });
    }

    // Navigate slider
    function nextSlide() {
        if (!currentGameData) return;
        const screenshots = currentGameData.screenshots || [currentGameData.thumbnail];
        currentSlideIndex = (currentSlideIndex + 1) % screenshots.length;
        updateSlider();
    }

    function prevSlide() {
        if (!currentGameData) return;
        const screenshots = currentGameData.screenshots || [currentGameData.thumbnail];
        currentSlideIndex = (currentSlideIndex - 1 + screenshots.length) % screenshots.length;
        updateSlider();
    }

    // Initialize
    function init() {
        loadGames();

        // Modal event listeners
        const modal = document.getElementById('game-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const prevBtn = modal.querySelector('.slider-prev');
        const nextBtn = modal.querySelector('.slider-next');

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;

            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    return { init };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Works.init);
} else {
    Works.init();
}
