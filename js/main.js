// Amity Realty Photography - Main JS

// ── Scroll Reveal ──────────────────────────────────────────────
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// ── Smooth Scroll Helper ──────────────────────────────────────
var HEADER_OFFSET = 80;

function smoothScrollTo(targetId) {
    var el = document.getElementById(targetId);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: top, behavior: "smooth" });
}

// ── Mobile Menu ───────────────────────────────────────────────
var mobileMenu = document.getElementById("mobile-menu");
var menuOpenBtn = document.getElementById("menu-open-btn");
var menuCloseBtn = document.getElementById("menu-close-btn");

function openMobileMenu() {
    mobileMenu.classList.add("is-open");
    menuOpenBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
}

function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    menuOpenBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
}

menuOpenBtn.addEventListener("click", openMobileMenu);
menuCloseBtn.addEventListener("click", closeMobileMenu);

// Close on nav link click
mobileMenu.querySelectorAll("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
});

// Close on Escape (mobile menu — lightbox Escape is handled separately)
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open") &&
        !document.getElementById("lightbox").classList.contains("is-open")) {
        closeMobileMenu();
    }
});

// ── Button Wiring (scroll-to + package pre-fill) ─────────────
document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-scroll-to");
        var packageName = btn.getAttribute("data-package");

        // Close mobile menu if open
        if (mobileMenu.classList.contains("is-open")) {
            closeMobileMenu();
        }

        smoothScrollTo(targetId);

        // Pre-fill message textarea if a package was selected
        if (packageName) {
            var messageEl = document.getElementById("message");
            if (messageEl) {
                messageEl.value = "I'm interested in the " + packageName + ".";
                messageEl.focus();
            }
        }
    });
});

// ── Contact Form Submission (Netlify) ─────────────────────────
var contactForm = document.getElementById("contact-form");
var submitBtn = document.getElementById("submit-btn");
var formError = document.getElementById("form-error");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate required fields
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showError("Please fill in all required fields.");
        return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    hideError();

    // Build URL-encoded body
    var formData = new FormData(contactForm);
    var encoded = new URLSearchParams(formData).toString();

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
    })
        .then(function (response) {
            if (!response.ok) throw new Error("Network response was not ok");
            // Replace form with success message
            var wrapper = contactForm.parentElement;
            wrapper.innerHTML =
                '<div class="text-center py-12 px-6">' +
                '<span class="material-symbols-outlined text-primary text-5xl mb-6 block">check_circle</span>' +
                '<h3 class="font-headline text-2xl md:text-3xl font-bold text-primary mb-4">Thank you!</h3>' +
                '<p class="text-on-surface-variant text-lg leading-relaxed">We\'ll be in touch within 24 hours.</p>' +
                "</div>";
        })
        .catch(function () {
            showError("Something went wrong. Please try again or contact us directly.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Inquiry";
        });
});

function showError(msg) {
    formError.textContent = msg;
    formError.classList.remove("hidden");
}

function hideError() {
    formError.textContent = "";
    formError.classList.add("hidden");
}

// ── Gallery Lightbox ──────────────────────────────────────────
var galleryData = [
    { image: "images/property-1/cover.jpg", name: "The Obsidian Estate", category: "Cinematic Series" },
    { image: "images/property-2/cover.jpg", name: "Azure Heights", category: "High-Rise" },
    { image: "images/property-3/cover.jpg", name: "Culinary Loft", category: "Lifestyle" },
    { image: "images/property-4/cover.jpg", name: "Zenith Pavilion", category: "Interior Design" },
];

var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightbox-img");
var lightboxTitle = document.getElementById("lightbox-title");
var lightboxCategory = document.getElementById("lightbox-category");
var lightboxCloseBtn = document.getElementById("lightbox-close");
var lightboxPrev = document.getElementById("lightbox-prev");
var lightboxNext = document.getElementById("lightbox-next");
var currentGalleryIndex = 0;
var galleryTriggerEl = null;

var galleryCards = document.querySelectorAll("#samples .grid > div");

function showLightbox(index) {
    currentGalleryIndex = index;
    var item = galleryData[index];
    lightboxImg.src = item.image;
    lightboxImg.alt = item.name;
    lightboxTitle.textContent = item.name;
    lightboxCategory.textContent = item.category;
    lightbox.classList.add("is-open");
    document.body.classList.add("overflow-hidden");
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("overflow-hidden");
    if (galleryTriggerEl) {
        galleryTriggerEl.focus();
        galleryTriggerEl = null;
    }
}

function lightboxPrevSlide() {
    var index = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    showLightbox(index);
}

function lightboxNextSlide() {
    var index = (currentGalleryIndex + 1) % galleryData.length;
    showLightbox(index);
}

galleryCards.forEach(function (card, i) {
    card.addEventListener("click", function () {
        galleryTriggerEl = card;
        showLightbox(i);
    });
});

lightboxCloseBtn.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", lightboxPrevSlide);
lightboxNext.addEventListener("click", lightboxNextSlide);

// Close on overlay click (outside image and controls)
lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard: Escape, ArrowLeft, ArrowRight
document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxPrevSlide();
    if (e.key === "ArrowRight") lightboxNextSlide();
});

// ── Active Nav Highlighting ───────────────────────────────────
var navLinks = document.querySelectorAll("#desktop-nav .nav-link");
var navSectionIds = ["process", "pricing", "samples", "faq", "contact"];

var navObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.id;
                navLinks.forEach(function (link) {
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("is-active");
                    } else {
                        link.classList.remove("is-active");
                    }
                });
            }
        });
    },
    { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
);

navSectionIds.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) navObserver.observe(section);
});