document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const fullNameInput = document.getElementById('full_name');
    const companyInput = document.getElementById('company');
    const phoneInput = document.getElementById('phone_number');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const registerBtn = document.getElementById('registerBtn');
    const registerText = document.getElementById('registerText');
    const registerSpinner = document.getElementById('registerSpinner');
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');
    const termsCheckbox = document.getElementById('termsAgree');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Toggle confirm password visibility
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });

    // Real-time password match checking
    confirmPasswordInput.addEventListener('input', function() {
        checkPasswordMatch();
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;

        const strengthText = document.getElementById('passwordStrength') || createPasswordStrengthElement();
        
        if (password.length === 0) {
            strengthText.textContent = '';
            strengthText.className = 'password-strength';
        } else if (strength <= 2) {
            strengthText.textContent = 'Weak password';
            strengthText.className = 'password-strength strength-weak';
        } else if (strength === 3) {
            strengthText.textContent = 'Medium password';
            strengthText.className = 'password-strength strength-medium';
        } else {
            strengthText.textContent = 'Strong password';
            strengthText.className = 'password-strength strength-strong';
        }
    }

    function createPasswordStrengthElement() {
        const strengthElement = document.createElement('div');
        strengthElement.id = 'passwordStrength';
        strengthElement.className = 'password-strength';
        passwordInput.parentNode.appendChild(strengthElement);
        return strengthElement;
    }

    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length === 0) return;
        
        if (password !== confirmPassword) {
            confirmPasswordInput.style.borderColor = 'var(--error-color)';
        } else {
            confirmPasswordInput.style.borderColor = 'var(--success-color)';
        }
    }

    // Handle form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset alerts
        errorAlert.classList.add('d-none');
        successAlert.classList.add('d-none');
        
        // Validate passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorAlert.textContent = 'Passwords do not match';
            errorAlert.classList.remove('d-none');
            return;
        }
        
        // Validate terms agreement
        if (!termsCheckbox.checked) {
            errorAlert.textContent = 'Please agree to the Terms & Conditions';
            errorAlert.classList.remove('d-none');
            return;
        }
        
        // Show loading state
        registerText.textContent = 'Creating Account...';
        registerSpinner.classList.remove('d-none');
        registerBtn.disabled = true;
        
        // Prepare data for API
        const formData = {
            full_name: fullNameInput.value.trim(),
            company: companyInput.value.trim(),
            phone_number: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            confirm_password: confirmPasswordInput.value
        };
        
        // API call to register endpoint
        fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Registration failed');
                });
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            successAlert.textContent = data.message || 'Registration successful!';
            successAlert.classList.remove('d-none');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'api/login-page/';
            }, 2000);
            
            // Reset form
            registerForm.reset();
        })
        .catch(error => {
            // Show error message
            errorAlert.textContent = error.message || 'An error occurred during registration';
            errorAlert.classList.remove('d-none');
        })
        .finally(() => {
            // Reset button state
            registerText.textContent = 'Create Account';
            registerSpinner.classList.add('d-none');
            registerBtn.disabled = false;
        });
    });
});