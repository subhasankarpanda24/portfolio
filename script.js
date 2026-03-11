// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// ── Typing effect ──
const lines = [
    "Building RAG-powered AI agents...",
    "Developing Smart Attendance analytics...",
    "Designing scalable Flask & MongoDB systems...",
    "Automating workflows with Python & n8n...",
    "Architecting intelligent system logic..."
];

let idx = 0, txtIdx = 0, isDeleting = false;
const typingEl = document.getElementById('heroTyping');

function typeWriter() {
    const currentTxt = lines[idx % lines.length];
    typingEl.textContent = currentTxt.substring(0, txtIdx);

    if (!isDeleting && txtIdx < currentTxt.length) {
        txtIdx++;
        setTimeout(typeWriter, 75);
    } else if (!isDeleting && txtIdx === currentTxt.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1800);
    } else if (isDeleting && txtIdx > 0) {
        txtIdx--;
        setTimeout(typeWriter, 38);
    } else {
        isDeleting = false;
        idx++;
        setTimeout(typeWriter, 400);
    }
}

typeWriter();

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.hidden');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Staggered skill animation ──
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('.skill');
            skills.forEach((skill, i) => {
                skill.style.opacity = '0';
                skill.style.transform = 'translateY(12px)';
                setTimeout(() => {
                    skill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }, i * 60);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-categories').forEach(el => skillObserver.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent)';
        }
    });
});
