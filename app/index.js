const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const client = new Client({
    user: process.env.DATABASE_USER || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE_NAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    port: process.env.DATABASE_PORT || 5432,
});

client.connect();

// Function to initialize the database
const initializeDatabase = async () => {
    const initSqlPath = path.join(__dirname, 'init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf-8');
    try {
        await client.query(initSql);
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

// Initialize the database
initializeDatabase();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vulnerable to SQL injection
    const query = `SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}'`;

    client.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database error');
        } else {
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                res.status(400).json({error: 'Invalid credentials'});
            }
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
