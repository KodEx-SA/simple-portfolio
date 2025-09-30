const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navItem = document.querySelectorAll(".nav__item"),
      header = document.getElementById("header"),
      navLinks = document.querySelectorAll(".nav__link"),
      typewriterElement = document.getElementById("typewriter"),
      themeToggle = document.getElementById("theme-toggle"),
      backToTop = document.querySelector(".back-to-top");

const typewriterTexts = [
    "Frontend Web Developer",
    "Software Engineer",
    "Full Stack Developer",
    "AI Developer",
    "Creative Problem Solver",
];

let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Toggle mobile menu
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("nav__menu--open");
        const isOpen = navMenu.classList.contains("nav__menu--open");
        navToggle.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-3-line"></i>';
        navToggle.setAttribute("aria-expanded", isOpen);
    });
} else {
    console.warn('Navigation menu or toggle not found');
}

// Close menu on link click
navItem.forEach((item) => {
    item.addEventListener("click", () => {
        if (navMenu && navMenu.classList.contains("nav__menu--open")) {
            navMenu.classList.remove("nav__menu--open");
            if (navToggle) {
                navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
                navToggle.setAttribute("aria-expanded", false);
            }
        }
    });
});

// Active link on scroll
function setActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                    link.setAttribute("aria-current", "page");
                }
            });
        }
    });
}

window.addEventListener("scroll", debounce(setActiveLink, 100));

// Typewriter effect
function typeEffect() {
    if (!typewriterElement) {
        console.warn('Typewriter element not found');
        return;
    }

    const currentText = typewriterTexts[currentTextIndex];
    typewriterElement.textContent = "I'm a " + currentText.slice(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }

    requestAnimationFrame(typeEffect);
}
typeEffect();

// Header scroll effect and back-to-top
window.addEventListener("scroll", debounce(() => {
    if (header) {
        header.classList.toggle("header--scroll", window.scrollY > 40);
    }
    if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 300);
    }
}, 100));

// Back-to-top click
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Theme toggle
if (themeToggle) {
    const body = document.body;
    function setTheme(theme) {
        body.classList.toggle("light-theme", theme === "light");
        themeToggle.innerHTML = theme === "light" ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
        localStorage.setItem("theme", theme);
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = body.classList.contains("light-theme") ? "dark" : "light";
        setTheme(newTheme);
    });
}

// ScrollReveal animations
if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        duration: 1500,
        distance: "80px",
        delay: 300,
        reset: false,
    });

    sr.reveal(".hero__content, .about__content, .contact__content", { origin: "left" });
    sr.reveal(".hero__img, .contact__form-wrapper", { origin: "right" });
    sr.reveal(".hero__info-wrapper, .hero__social-list, .skills__content, .qualification__item, .service__card, .project__content, .footer__content, .blog__description", {
        interval: 100,
        origin: "bottom"
    });
}

// Update footer year
function updateYear(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = new Date().getFullYear();
    }
}
document.addEventListener("DOMContentLoaded", () => updateYear("current-year"));

// tsParticles configuration
if (typeof tsParticles !== "undefined") {
    tsParticles.load("particles-js", {
        particles: {
            number: { value: window.innerWidth < 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#25ab75", "#1e90ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#25ab75", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
} else {
    console.warn("tsParticles not loaded");
}