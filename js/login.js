const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'index.html';
    }
});

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;

        const payload = {
            email: email,
            password: password
        };

        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Login failed');
        }

        console.log(data);

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error during login:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = error.message || 'An error occurred during login. Please try again.';
    }
});