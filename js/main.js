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
function buildImageList(folder, count) {
    var images = [folder + "/cover.jpg"];
    for (var i = 1; i <= count; i++) {
        var num = i < 10 ? "0" + i : "" + i;
        images.push(folder + "/" + num + ".jpg");
    }
    return images;
}

var galleryData = [
    { images: buildImageList("images/property-1", 8), name: "Hernando, FL", category: "Twilight" },
    { images: buildImageList("images/property-2", 8), name: "Hernando, FL", category: "Plain" },
    { images: buildImageList("images/property-3", 9), name: "Lady Lake, FL", category: "Waypoint" },
    { images: buildImageList("images/property-4", 12), name: "Citrus Springs, FL", category: "Virtual Staging" },
];

var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightbox-img");
var lightboxTitle = document.getElementById("lightbox-title");
var lightboxCategory = document.getElementById("lightbox-category");
var lightboxCounter = document.getElementById("lightbox-counter");
var lightboxCloseBtn = document.getElementById("lightbox-close");
var lightboxPrev = document.getElementById("lightbox-prev");
var lightboxNext = document.getElementById("lightbox-next");
var currentPropertyIndex = 0;
var currentPhotoIndex = 0;
var galleryTriggerEl = null;

var galleryCards = document.querySelectorAll("#samples .grid > div");

function preloadImages(propertyIndex, fromPhoto) {
    var images = galleryData[propertyIndex].images;
    for (var i = 1; i <= 2; i++) {
        var idx = fromPhoto + i;
        if (idx < images.length) {
            var img = new Image();
            img.src = images[idx];
        }
    }
}

function showLightbox(propertyIndex, photoIndex) {
    currentPropertyIndex = propertyIndex;
    currentPhotoIndex = photoIndex;
    var property = galleryData[propertyIndex];
    lightboxImg.src = property.images[photoIndex];
    lightboxImg.alt = property.name + " — photo " + (photoIndex + 1);
    lightboxTitle.textContent = property.name;
    lightboxCategory.textContent = property.category;
    lightboxCounter.textContent = (photoIndex + 1) + " / " + property.images.length;
    lightbox.classList.add("is-open");
    document.body.classList.add("overflow-hidden");
    preloadImages(propertyIndex, photoIndex);
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
    var images = galleryData[currentPropertyIndex].images;
    var index = (currentPhotoIndex - 1 + images.length) % images.length;
    showLightbox(currentPropertyIndex, index);
}

function lightboxNextSlide() {
    var images = galleryData[currentPropertyIndex].images;
    var index = (currentPhotoIndex + 1) % images.length;
    showLightbox(currentPropertyIndex, index);
}

galleryCards.forEach(function (card, i) {
    card.addEventListener("click", function () {
        galleryTriggerEl = card;
        showLightbox(i, 0);
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