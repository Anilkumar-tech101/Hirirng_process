document.addEventListener('DOMContentLoaded', function() {
    // Get all login and register buttons
    const loginButtons = document.querySelectorAll('#loginBtn, #heroLoginBtn');
    const registerButtons = document.querySelectorAll('#registerBtn, #heroRegisterBtn, #ctaRegisterBtn');
    
    // Add event listeners to login buttons
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to login page
            window.location.href = 'api/login-page';
        });
    });
    
    // Add event listeners to register buttons
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to register page
            window.location.href = 'api/register-page';
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});