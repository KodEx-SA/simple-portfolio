const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navItem = document.querySelectorAll(".nav__item"),
      header = document.getElementById("header"),
      navLinks = document.querySelectorAll(".nav__link"),
      typewriterElement = document.getElementById("typewriter"),
      themeToggle = document.getElementById("theme-toggle"),
      backToTop = document.querySelector(".back-to-top");

const typewriterTexts = [
    "Web Development",
    "Software Engineering",
    "Full Stack Development",
    "AI Development & Integration",
    "Creative Problem Solving",
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

// Page loader
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("page-loaded");
  }, 800);
});

// Toggle mobile menu
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("nav__menu--open");
        const isOpen = navMenu.classList.contains("nav__menu--open");
        navToggle.innerHTML = isOpen ? '<i class="ri-close-line" aria-hidden="true"></i>' : '<i class="ri-menu-3-line" aria-hidden="true"></i>';
        navToggle.setAttribute("aria-expanded", isOpen);
    });
}

// Close menu on link click
navItem.forEach((item) => {
    item.addEventListener("click", () => {
        if (navMenu && navMenu.classList.contains("nav__menu--open")) {
            navMenu.classList.remove("nav__menu--open");
            if (navToggle) {
                navToggle.innerHTML = '<i class="ri-menu-3-line" aria-hidden="true"></i>';
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

window.addEventListener("scroll", debounce(setActiveLink, 50));

// Typewriter effect
function typeEffect() {
    if (!typewriterElement) return;

    const currentText = typewriterTexts[currentTextIndex];
    typewriterElement.textContent = "I'm a " + currentText.slice(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            setTimeout(typeEffect, 300);
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// Header scroll and back-to-top
window.addEventListener("scroll", debounce(() => {
    if (header) {
        header.classList.toggle("header--scroll", window.scrollY > 50);
    }
    if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 200);
    }
}, 50));

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
        themeToggle.innerHTML = theme === "light" ? '<i class="ri-moon-line" aria-hidden="true"></i>' : '<i class="ri-sun-line" aria-hidden="true"></i>';
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
        duration: 1000,
        distance: "50px",
        delay: 200,
        reset: false,
    });

    sr.reveal(".hero__content, .about__content, .contact__content", { origin: "left" });
    sr.reveal(".hero__image-wrapper, .contact__form-wrapper", { origin: "right" });
    sr.reveal(".hero__info-wrapper, .hero__social-list, .skills__content, .qualification__item, .service__card, .project__content, .footer__content, .blog__description", {
        interval: 100,
        origin: "bottom"
    });
}

// Update footer year
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// particles.js configuration
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('particles-js') && typeof particlesJS !== "undefined") {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#8b5cf6" },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" }
                },
                "opacity": {
                    "value": 0.7,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": { "enable": true, "speed": 2, "size_min": 1, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 120,
                    "color": "#8b5cf6",
                    "opacity": 0.6,
                    "width": 1.5
                },
                "move": {
                    "enable": true,
                    "speed": 2.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab",
                        "parallax": { "enable": true, "force": 60, "smooth": 10 }
                    },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
        console.log("particles.js loaded successfully");
    } else {
        console.warn("particles.js not loaded or #particles-js element missing. Falling back to static background.");
        document.getElementById("particles-js").style.background = "linear-gradient(135deg, #1a1a1a, #242424)";
    }
});