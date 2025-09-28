const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navItem = document.querySelectorAll(".nav__item"),
    header = document.getElementById("header"),
    navLinks = document.querySelectorAll(".nav__link");

// Open and close menu
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav__menu--open");
    changeIcon();
});

// Close the menu when the user clicks the nav links
navItem.forEach((item) => {
    item.addEventListener("click", () => {
        if (navMenu.classList.contains("nav__menu--open")) {
            navMenu.classList.remove("nav__menu--open");
            changeIcon();
        }
    });
});

// Change nav toggle icon
function changeIcon() {
    if (navMenu.classList.contains("nav__menu--open")) {
        navToggle.classList.replace("ri-menu-3-line", "ri-close-line");
    } else {
        navToggle.classList.replace("ri-close-line", "ri-menu-3-line");
    }
}

// Active tab on scroll
function setActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", setActiveLink);

// Typewriter effect
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
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
    const currentText = typewriterTexts[currentTextIndex];

    if (!isDeleting) {
        typewriterElement.textContent = currentText.slice(0, charIndex);
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typewriterElement.textContent = currentText.slice(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start the typewriter effect
typeEffect();

// Header scroll animation
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("header--scroll");
    } else {
        header.classList.remove("header--scroll");
    }
});

// ScrollReveal animations
const sr = ScrollReveal({
    duration: 2000,
    distance: "100px",
    delay: 400,
    reset: false,
});

sr.reveal(".hero__content, .about__content");
sr.reveal(".hero__img", { origin: "top" });

sr.reveal(
    ".hero__info-wrapper, .hero__social-list, .skills__title, .skills__content, .qualification__name, .qualification__item, .service__card, .project__content, .footer__content",
    {
        delay: 500,
        interval: 100,
    }
);

sr.reveal(".qualification__footer-text, .contact__content", {
    origin: "left",
});

sr.reveal(".qualification__footer .btn, .contact__btn", { origin: "right" });

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.footer__copyright');
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('{currentYear}', currentYear);
});