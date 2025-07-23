document.addEventListener('DOMContentLoaded', () => {
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