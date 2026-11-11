document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Navbar glass effect on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 3, 3, 0.8)';
            navbar.style.backdropFilter = 'blur(16px)';
            navbar.style.webkitBackdropFilter = 'blur(16px)';
        } else {
            navbar.style.background = 'rgba(3, 3, 3, 0.4)';
            navbar.style.backdropFilter = 'blur(8px)';
            navbar.style.webkitBackdropFilter = 'blur(8px)';
        }
    });

    // Initial trigger for elements already in view on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});
