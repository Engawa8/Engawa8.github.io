/**
 * Gallery Module
 * Handles illustration gallery with lightbox functionality
 */

const Gallery = (function () {
    let illustrationsData = [];
    let currentIndex = 0;

    // Load illustrations data from JSON
    async function loadIllustrations() {
        try {
            const response = await fetch('data/illustrations.json');
            const data = await response.json();
            illustrationsData = data.illustrations || [];
            renderGallery();
        } catch (error) {
            console.error('Failed to load illustrations data:', error);
            const grid = document.getElementById('gallery-grid');
            if (grid) {
                grid.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">イラストを読み込み中...</p>';
            }
        }
    }

    // Render gallery grid
    function renderGallery() {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;

        grid.innerHTML = illustrationsData.map((item, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${item.thumbnail || item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </div>
            </div>
        `).join('');

        // Add click handlers
        grid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                openLightbox(index);
            });
        });
    }

    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        const lightbox = document.getElementById('lightbox');
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update lightbox image
    function updateLightboxImage() {
        const image = document.getElementById('lightbox-image');
        const caption = document.getElementById('lightbox-caption');
        const item = illustrationsData[currentIndex];

        image.src = item.image;
        image.alt = item.title;
        caption.textContent = item.title || '';
    }

    // Navigate lightbox
    function nextImage() {
        currentIndex = (currentIndex + 1) % illustrationsData.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + illustrationsData.length) % illustrationsData.length;
        updateLightboxImage();
    }

    // Initialize
    function init() {
        loadIllustrations();

        const lightbox = document.getElementById('lightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        }
    }

    return { init };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Gallery.init);
} else {
    Gallery.init();
}
