document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });

            document.getElementById('mobile-menu').classList.add('hidden');
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function initPortfolio() {
    setTimeout(() => {
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('opacity-0', 'translate-y-4');
                item.classList.add('opacity-100', 'translate-y-0');
            }, index * 100);
        });
    }, 300);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        filterBtns.forEach(b => {
            b.classList.remove('bg-white', 'shadow-sm');
            b.classList.add('text-gray-700');
            
            b.classList.remove('bg-[#81dbdf]', 'text-white');
            b.classList.add('bg-white', 'text-[#0c1213]');
        });
        
        if (window.innerWidth >= 768) {
            this.classList.add('bg-white', 'shadow-sm');
        } else {
            this.classList.remove('bg-white', 'text-[#0c1213]');
            this.classList.add('bg-[#81dbdf]', 'text-white');
        }
    
        portfolioItems.forEach((item, index) => {
            item.classList.add('opacity-0', 'translate-y-4');
            
            setTimeout(() => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('opacity-0', 'translate-y-4');
                        item.classList.add('opacity-100', 'translate-y-0');
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 150);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('#about .fade-in').forEach(el => {
    aboutObserver.observe(el);
});

document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', function() {
        if (this.open) {
            this.querySelector('summary').classList.add('font-bold');
        } else {
            this.querySelector('summary').classList.remove('font-bold');
        }
    });
});

function typewriterEffect() {
    const phrases = [
        'Welcome to my website!',
        "I'm Morgan Lee.",
        'Model & Actress.',
        'Creative Entrepreneur.'
    ];
    
    const typewriterElement = document.getElementById('typewriter');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    typewriterEffect();
});