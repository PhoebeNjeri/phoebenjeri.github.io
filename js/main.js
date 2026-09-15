const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');

function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    backTop.classList.toggle('visible', window.scrollY > 500);
}

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', onScroll);

// Typed hero effect
const roles = ['Software Developer', 'Web Developer', 'Web Designer', 'Problem Solver'];
const typedEl = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const word = roles[roleIndex];
    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    typedEl.textContent = word.slice(0, charIndex);
    const speed = deleting ? 45 : 110;
    if (!deleting && charIndex === word.length) {
        setTimeout(() => { deleting = true; type(); }, 1600);
        return;
    }
    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, speed);
}

type();

// Animated counters
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// Animated skill bars
function animateBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(fill => {
        const width = fill.dataset.width;
        fill.style.width = width + '%';
    });
    document.querySelectorAll('.skill-percent').forEach(percent => {
        const target = parseInt(percent.dataset.target, 10);
        const start = performance.now();
        const duration = 1500;

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            percent.textContent = Math.round(eased * target) + '%';
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// Scroll reveal via IntersectionObserver
function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // Group reveal elements so stats/bars animate only when scrolled into view
    const heroStats = document.querySelector('.hero-stats');
    const skillsBars = document.querySelector('.skills-bars');
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateCounters();
        });
    }, { threshold: 0.4 });
    if (heroStats) statsObserver.observe(heroStats);

    const barsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateBars();
        });
    }, { threshold: 0.3 });
    if (skillsBars) barsObserver.observe(skillsBars);

    elements.forEach(el => observer.observe(el));
}

// Hero reveal on load
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 150 * i);
    });
    initReveal();
    onScroll();
});