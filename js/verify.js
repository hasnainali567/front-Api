const verifyingModal = new bootstrap.Modal(document.getElementById('verifyingEmailModal'));
verifyingModal.show();
const apiUrl = 'http://localhost:3000/api/users/verify-email';


window.addEventListener('load', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (!token) {
            throw new Error('No token provided');
        }
        const res = await fetch(`${apiUrl}?token=${token}`);
        if (!res.ok) {
            throw new Error('Verification failed');
        }

        localStorage.setItem('user', JSON.stringify(res.user));
        window.location.href = '/index.html';
    } catch (error) {
        console.error(error);
        verifyingModal.hide();
    }
});