const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const echo = document.getElementById('echo');
const userDataList = document.getElementById('userData');

// Parse user data into an object
const userData = Array.from(userDataList.children)
    .map(li => li.textContent.split(':'));
const users = new Map(userData);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulating SQL Injection vulnerability
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log(query);

    // Mock database query check
    if (users.has(username) && users.get(username) === password) {
        message.textContent = 'Login successful!';
    } else {
        message.textContent = 'Invalid credentials.';
    }

    // Vulnerable echo: directly outputting user input
    echo.textContent = `Welcome, ${username}!`;
});

