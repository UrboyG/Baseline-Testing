//This JS file includes XXS and SQLinjection vuln for baseline testing
const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const echo = document.getElementById('echo');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    //fetching to api /login
    const result = await response.json();

    if(response.status === 400) {
        message.textContent = 'Invalid credentials';
        return;
    }

    message.textContent = result.data;

    // Vulnerable echo: directly outputting user input
    echo.textContent = `Welcome, ${username}!`;
});