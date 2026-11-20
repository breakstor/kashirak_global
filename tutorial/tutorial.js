// =========================================================
// KASHIERK TUTORIAL PAGE INTERACTIONS & I18N SUPPORT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    function getLessonToggleText(isExpanded) {
        const lang = document.documentElement.lang || 'ar';
        if (lang === 'en') {
            return isExpanded ? 'Hide Step-by-Step Guide' : 'Show Step-by-Step Guide';
        }
        return isExpanded ? 'إخفاء خطوات الشرح' : 'عرض خطوات الشرح';
    }

    // =====================================================
    // TOGGLE LESSON CONTENT
    // =====================================================
    const toggleButtons = document.querySelectorAll('.lesson-toggle');

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const lessonContent = button.nextElementSibling;
            const isActive = lessonContent.classList.contains('active');

            // Close all other lessons
            document.querySelectorAll('.lesson-content').forEach((content) => {
                content.classList.remove('active');
            });

            document.querySelectorAll('.lesson-toggle').forEach((btn) => {
                btn.textContent = getLessonToggleText(false);
            });

            // Open or close current lesson
            if (!isActive) {
                lessonContent.classList.add('active');
                button.textContent = getLessonToggleText(true);
            }
        });
    });

    // Update toggle buttons when language changes
    window.addEventListener('kashirak_lang_changed', () => {
        document.querySelectorAll('.lesson-toggle').forEach((btn) => {
            const isExpanded = btn.nextElementSibling && btn.nextElementSibling.classList.contains('active');
            btn.textContent = getLessonToggleText(isExpanded);
        });
    });

    // =====================================================
    // SCROLL ANIMATION
    // =====================================================
    const cards = document.querySelectorAll('.video-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // =====================================================
    // HEADER SHADOW ON SCROLL
    // =====================================================
    const header = document.querySelector('.tutorial-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }
});
