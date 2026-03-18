document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // --- Hero Carousel ---
    const track = document.querySelector('.carousel-track');
    const slides = track ? track.querySelectorAll('.mockup-img') : [];
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (track && slides.length > 1) {
        let current = 0;
        let autoSlideInterval;
        const AUTO_SLIDE_DELAY = 5000;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Imagen ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            current = index;
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${current * 100}%)`;
            });
            // Update dots
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
            resetAutoSlide();
        }

        function next() {
            goTo((current + 1) % slides.length);
        }

        function prev() {
            goTo((current - 1 + slides.length) % slides.length);
        }

        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);

        // Auto-slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(next, AUTO_SLIDE_DELAY);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', startAutoSlide);
    }
});
