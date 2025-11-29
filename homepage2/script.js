document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.btn-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {

            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNewsletterValidation();
});

function initNewsletterValidation() {
    const newsletterContainer = document.querySelector('.newsletter-form');

    if (!newsletterContainer) return;

    const input = newsletterContainer.querySelector('input');
    const button = newsletterContainer.querySelector('button');

    const msgElement = document.createElement('small');
    msgElement.className = 'newsletter-msg';
    newsletterContainer.appendChild(msgElement);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        validateNewsletter(input, msgElement);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateNewsletter(input, msgElement);
        }
    });
}

function validateNewsletter(input, msgElement) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    input.classList.remove('error', 'success');
    msgElement.classList.remove('show-error', 'show-success');

    if (email === "") {
        showFeedback(input, msgElement, 'error', 'Please enter an email address.');
        return;
    }

    if (!emailRegex.test(email)) {
        showFeedback(input, msgElement, 'error', 'Please enter a valid email.');
        return;
    }

    showFeedback(input, msgElement, 'success', 'Subscribed successfully!');
    window.location.href = '404page.html'
    input.value = '';

    setTimeout(() => {
        msgElement.classList.remove('show-success');
        input.classList.remove('success');
    }, 3000);
}

function showFeedback(input, msgElement, type, text) {
    input.classList.add(type);
    msgElement.textContent = text;

    if (type === 'error') {
        msgElement.style.color = '#e74c3c';
        msgElement.classList.add('show-error');
    } else {
        msgElement.style.color = '#2ecc71';
        msgElement.classList.add('show-success');
    }
}