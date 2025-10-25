document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const emailOrPhoneInput = document.getElementById('email_or_phone');
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            const loginBtn = document.getElementById('loginBtn');
            const loginText = document.getElementById('loginText');
            const loginSpinner = document.getElementById('loginSpinner');
            const errorAlert = document.getElementById('errorAlert');
            const successAlert = document.getElementById('successAlert');
            const userInfo = document.getElementById('userInfo');
            const registerLink = document.getElementById('registerLink');
            
            // Toggle password visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
            
            // Handle form submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset alerts
                errorAlert.classList.add('d-none');
                successAlert.classList.add('d-none');
                userInfo.classList.add('d-none');
                
                // Show loading state
                loginText.textContent = 'Signing In...';
                loginSpinner.classList.remove('d-none');
                loginBtn.disabled = true;
                
                // Prepare data for API
                const formData = {
                    email_or_phone: emailOrPhoneInput.value.trim(),
                    password: passwordInput.value
                };
                
                // API call to login endpoint
                fetch('http://localhost:8000/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => {
                            throw new Error(err.error || 'Login failed');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    // Show success message
                    successAlert.textContent = data.message || 'Login successful!';
                    successAlert.classList.remove('d-none');
                    
                    // Display user information
                    if (data.user) {
                        document.getElementById('userFullName').textContent = data.user.full_name;
                        document.getElementById('userEmail').textContent = data.user.email;
                        document.getElementById('userCompany').textContent = data.user.company;
                        document.getElementById('userPhone').textContent = data.user.phone_number;
                        userInfo.classList.remove('d-none');
                    }
                    
                    // Reset form
                    loginForm.reset();
                })
                .catch(error => {
                    // Show error message
                    errorAlert.textContent = error.message || 'An error occurred during login';
                    errorAlert.classList.remove('d-none');
                })
                .finally(() => {
                    // Reset button state
                    loginText.textContent = 'Sign In';
                    loginSpinner.classList.add('d-none');
                    loginBtn.disabled = false;
                });
            });
            
            // Register link handler
            registerLink.addEventListener('click', function(e) {
            e.preventDefault(); // stops the link
            window.location.href = '/api/register-page'; // 👈 manually redirect
            }); 
        });