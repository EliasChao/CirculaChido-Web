document.addEventListener('DOMContentLoaded', () => {
    // Launch countdown functionality
    initLaunchCountdown();
    
    // Animation functionality
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

    if (sectionsToAnimate.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Triggers when 10% of the element is visible
        });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // Download functionality for Media Kit
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            
            // Only intercept placeholder downloads (zip files and other media kit resources)
            if (href && (href.endsWith('.zip') || href.includes('recursos') || href.includes('logos') || href.includes('screenshots'))) {
                e.preventDefault();
                showDownloadDialog(button.textContent, href);
            }
        });
    });

    // Image loading states
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading state
        img.classList.add('loading');
        
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            img.classList.remove('loading');
            img.classList.add('error');
            // Fallback to placeholder or retry
            if (!img.dataset.fallback) {
                img.dataset.fallback = 'true';
                img.src = 'placeholder-screenshot-main.png'; // Use existing placeholder
            }
        });
    });

    // FAQ accordion enhancement
    const faqItems = document.querySelectorAll('details.faq-item');
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        summary.addEventListener('click', (e) => {
            // Add smooth scroll to opened item
            setTimeout(() => {
                if (item.open) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        });
    });
});

// Download dialog function
function showDownloadDialog(buttonText, filename) {
    const dialog = document.createElement('div');
    dialog.className = 'download-dialog';
    dialog.innerHTML = `
        <div class="download-dialog-content">
            <h3>Descarga Próximamente Disponible</h3>
            <p>El archivo <strong>${filename}</strong> estará disponible para descarga muy pronto.</p>
            <p>Mientras tanto, puedes:</p>
            <ul>
                <li>Contactar a <a href="mailto:prensa@circulachido.com">prensa@circulachido.com</a> para solicitar los recursos</li>
                <li>Usar las imágenes disponibles en el sitio (clic derecho → Guardar imagen)</li>
            </ul>
            <button class="close-dialog">Cerrar</button>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Close dialog functionality
    const closeBtn = dialog.querySelector('.close-dialog');
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.remove();
        }
    });
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(dialog)) {
            dialog.remove();
        }
    }, 10000);
}

// Launch countdown functionality
function initLaunchCountdown() {
    // Set the launch date to August 15, 2025 at midnight Mexico City time
    const launchDate = new Date('2025-08-15T00:00:00-06:00').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Check if countdown elements exist
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = launchDate - now;
        
        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Launch date has passed
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            
            // Hide countdown and show launch message
            const countdownContainer = document.querySelector('.launch-countdown');
            const countdownLabel = document.querySelector('.countdown-label');
            if (countdownContainer && countdownLabel) {
                countdownLabel.textContent = '¡Ya está disponible!';
                countdownLabel.style.color = 'var(--brand-primary)';
                countdownLabel.style.fontSize = '1.3rem';
                
                // Enable store links
                const storeLinks = document.querySelectorAll('.store-link.disabled');
                storeLinks.forEach(link => {
                    link.classList.remove('disabled');
                    const overlay = link.querySelector('.disabled-overlay');
                    if (overlay) {
                        overlay.remove();
                    }
                    
                    // Convert div back to anchor tag with actual URLs
                    if (link.classList.contains('play-store-link')) {
                        link.onclick = () => window.open('https://play.google.com/store/apps/details?id=com.eliaschao.circulachido', '_blank');
                    } else {
                        link.onclick = () => window.open('https://apps.apple.com/app/circulachido/id6738284104', '_blank');
                    }
                    link.style.cursor = 'pointer';
                });
                
                // Stop the countdown
                clearInterval(countdownInterval);
            }
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}