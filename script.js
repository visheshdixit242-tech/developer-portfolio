
/* =========================================================
   DEVELOPER PORTFOLIO
   script.js
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typingText");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const currentYear = document.getElementById("currentYear");

const navItems = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 700);

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Close menu after clicking a navigation link

    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   CLOSE MOBILE MENU WITH ESC KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    themeToggle.textContent = "☀️";

} else {

    document.body.classList.remove("light-theme");

    themeToggle.textContent = "🌙";

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        if (isLight) {

            themeToggle.textContent = "☀️";

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

        }

    });

}


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingWords = [
    "Software Developer",
    "Web Developer",
    "Java Developer",
    "Frontend Developer",
    "Problem Solver"
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentWord =
        typingWords[wordIndex];

    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {

                wordIndex = 0;

            }

        }

    }

    const typingSpeed =
        isDeleting ? 55 : 100;

    setTimeout(
        typeEffect,
        typingSpeed
    );

}

setTimeout(typeEffect, 1000);


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navItems.forEach((link) => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (
                    href === `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   PROJECT FILTER
========================================================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active state from all buttons

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        // Add active state to clicked button

        button.classList.add("active");

        const selectedFilter =
            button.getAttribute("data-filter");

        projectCards.forEach((card) => {

            const category =
                card.getAttribute("data-category");

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hide");

                card.classList.add("show");

            } else {

                card.classList.add("hide");

                card.classList.remove("show");

            }

        });

    });

});


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".highlight-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".education-card, " +
    ".why-card, " +
    ".contact-info, " +
    ".contact-form"
);


// Add reveal class

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


            const nameValue =
                name.value.trim();

            const emailValue =
                email.value.trim();

            const subjectValue =
                subject.value.trim();

            const messageValue =
                message.value.trim();


            /* -----------------------------------------
               BASIC VALIDATION
            ----------------------------------------- */

            if (nameValue.length < 2) {

                showFormMessage(
                    "Please enter a valid name.",
                    "error"
                );

                name.focus();

                return;

            }


            if (!isValidEmail(emailValue)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                email.focus();

                return;

            }


            if (subjectValue.length < 3) {

                showFormMessage(
                    "Please enter a valid subject.",
                    "error"
                );

                subject.focus();

                return;

            }


            if (messageValue.length < 10) {

                showFormMessage(
                    "Message should contain at least 10 characters.",
                    "error"
                );

                message.focus();

                return;

            }


            /* -----------------------------------------
               SUCCESS
            ----------------------------------------- */

            showFormMessage(
                "Thank you! Your message has been prepared successfully.",
                "success"
            );


            /*
                No backend is connected yet.

                Therefore the form does not actually
                send/store the message on a server.
            */


            contactForm.reset();

        }
    );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
    message,
    type
) {

    // Remove previous message

    const oldMessage =
        document.querySelector(
            ".form-message"
        );

    if (oldMessage) {

        oldMessage.remove();

    }


    const messageElement =
        document.createElement("div");

    messageElement.className =
        "form-message";


    messageElement.textContent =
        message;


    if (type === "success") {

        messageElement.style.color =
            "#00d4ff";

    } else {

        messageElement.style.color =
            "#ff6b6b";

    }


    messageElement.style.marginTop =
        "15px";

    messageElement.style.fontSize =
        "13px";

    messageElement.style.fontWeight =
        "600";


    contactForm.appendChild(
        messageElement
    );


    // Automatically remove message

    setTimeout(() => {

        messageElement.remove();

    }, 5000);

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                targetId.length === 0
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {

                return;

            }


            event.preventDefault();


            const header =
                document.querySelector(
                    ".header"
                );

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   PREVENT EMPTY EXTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[href="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

        }
    );

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%cWelcome to Vishesh Dixit's Portfolio!",
    "color:#00d4ff;font-size:18px;font-weight:bold;"
);

console.log(
    "Built with HTML, CSS and JavaScript."
);


/* =========================================================
   END OF SCRIPT
========================================================= */
