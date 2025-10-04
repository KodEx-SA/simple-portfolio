const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navItem = document.querySelectorAll(".nav__item"),
    header = document.getElementById("header"),
    navLinks = document.querySelectorAll(".nav__link"),
    typewriterElement = document.getElementById("typewriter"),
    themeToggle = document.getElementById("theme-toggle"),
    backToTop = document.querySelector(".back-to-top"),
    chatbotPopup = document.getElementById("chatbot-popup"),
    floatingChatIcon = document.getElementById("floating-chat-icon"),
    chatbotClose = document.getElementById("chatbot-close"),
    chatForm = document.getElementById("chat-form"),
    messageInput = document.getElementById("message-input"),
    chatBody = document.getElementById("chat-body");

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

const MODEL_NAME = 'llama-3.3-70b-versatile';
const TEMPERATURE = 0.7;
const MAX_TOKENS = 3000;
const ERROR_MESSAGE = "Sorry, I couldn't process your request. Please try again.";
const THINKING_MESSAGE = 'Thinking...';
let chatHistory = [
    { type: 'model', text: 'Hey there 👋! How can I help you today? (I\'m an AI assistant powered by Groq – ask me anything!)' }
];
let isLoading = false;

// Replace with your actual Groq API key
const GROQ_API_KEY = 'your_groq_api_key_here';

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
    typewriterElement.textContent = "Passionate in " + currentText.slice(0, charIndex);

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
        particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 100,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#25ab75"
            },
            "shape": {
              "type": "circle"
            },
            "opacity": {
              "value": 0.7,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.3,
                "sync": false
              }
            },
            "size": {
              "value": 4,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 120,
              "color": "#25ab75",
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
              "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
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

// Chatbot functionality
document.addEventListener("DOMContentLoaded", () => {
    floatingChatIcon.addEventListener("click", () => {
        chatbotPopup.style.display = 'block';
        floatingChatIcon.style.display = 'none';
    });

    chatbotClose.addEventListener("click", () => {
        chatbotPopup.style.display = 'none';
        floatingChatIcon.style.display = 'block';
    });

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMessage = messageInput.value.trim();
        if (!userMessage) return;

        // Add user message
        appendMessage('user', userMessage);
        messageInput.value = '';
        isLoading = true;

        // Add thinking message
        const thinkingDiv = appendMessage('model', THINKING_MESSAGE, true);

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: 'You are a helpful AI assistant specialized in software development and AI.' },
                        ...chatHistory.map(({ type, text }) => ({
                            role: type === 'user' ? 'user' : 'assistant',
                            content: text
                        })),
                        { role: 'user', content: userMessage }
                    ],
                    model: MODEL_NAME,
                    temperature: TEMPERATURE,
                    max_tokens: MAX_TOKENS
                })
            });

            if (response.ok) {
                const data = await response.json();
                const botResponse = data.choices[0]?.message?.content || ERROR_MESSAGE;
                chatHistory.push({ type: 'user', text: userMessage });
                chatHistory.push({ type: 'model', text: botResponse });
                removeThinkingMessage(thinkingDiv);
                appendMessage('model', botResponse);
            } else {
                throw new Error('API error');
            }
        } catch (error) {
            console.error('Error fetching Groq response:', error);
            removeThinkingMessage(thinkingDiv);
            appendMessage('model', ERROR_MESSAGE, false, true);
            chatHistory.push({ type: 'model', text: ERROR_MESSAGE });
        } finally {
            isLoading = false;
        }
    });

    function appendMessage(type, text, isThinking = false, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type === 'model' ? 'bot-message' : 'user-message'} ${isThinking ? 'thinking-message' : ''} ${isError ? 'error-message' : ''}`;
        if (type === 'model') {
            const iconSvg = document.createElement('svg');
            iconSvg.outerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 1024 1024"><path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4 .7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" fill="#25ab75" /></svg>';
            messageDiv.appendChild(iconSvg);
        }
        const textP = document.createElement('p');
        textP.className = 'message-text';
        if (isThinking) {
            const dotsSpan = document.createElement('span');
            dotsSpan.className = 'thinking-dots';
            dotsSpan.innerHTML = '<span></span><span></span><span></span>';
            textP.appendChild(dotsSpan);
        } else {
            textP.textContent = text;
        }
        messageDiv.appendChild(textP);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return messageDiv;
    }

    function removeThinkingMessage(div) {
        if (div) {
            div.remove();
        }
    }

    // Initial message
    appendMessage('model', chatHistory[0].text);
});