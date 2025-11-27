document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.btn-close');
    const navLinks = document.querySelectorAll('.nav-link'); // Select all links

    // 1. Open Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active');
            // document.body.style.overflow = 'hidden'; // Disable scrolling when menu is open
        });
    }

    // 2. Close Menu (X button)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    }

    // 3. Close Menu when clicking a link (UX best practice)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 4. Close Menu when clicking outside (Optional but good)
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
    // 1. Select the container
    const newsletterContainer = document.querySelector('.newsletter');

    // 2. Safety Check: If this element doesn't exist on the current page, stop here.
    if (!newsletterContainer) return;

    // 3. Select elements inside the container
    const input = newsletterContainer.querySelector('input');
    const button = newsletterContainer.querySelector('button');

    // 4. Create a message element dynamically (so we don't have to change HTML)
    const msgElement = document.createElement('small');
    msgElement.className = 'newsletter-msg';
    newsletterContainer.appendChild(msgElement);

    // 5. Event Listener for Button Click
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default if it becomes part of a form later
        validateNewsletter(input, msgElement);
    });

    // 6. Event Listener for "Enter" key
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

    // Reset styles
    input.classList.remove('error', 'success');
    msgElement.classList.remove('show-error', 'show-success');

    // Check Empty
    if (email === "") {
        showFeedback(input, msgElement, 'error', 'Please enter an email address.');
        return;
    }

    // Check Format
    if (!emailRegex.test(email)) {
        showFeedback(input, msgElement, 'error', 'Please enter a valid email.');
        return;
    }

    // Success
    showFeedback(input, msgElement, 'success', 'Subscribed successfully!');
    window.location.href = '404page.html'
    input.value = ''; // Clear input

    // Optional: Hide success message after 3 seconds
    setTimeout(() => {
        msgElement.classList.remove('show-success');
        input.classList.remove('success');
    }, 3000);
}

function showFeedback(input, msgElement, type, text) {
    input.classList.add(type); // Adds .error or .success class to input
    msgElement.textContent = text;

    if (type === 'error') {
        msgElement.style.color = '#e74c3c'; // Red
        msgElement.classList.add('show-error');
    } else {
        msgElement.style.color = '#2ecc71'; // Green
        msgElement.classList.add('show-success');
    }
}