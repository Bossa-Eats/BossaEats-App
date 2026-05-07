const express = require('express');
const mongoose = require('mongoose');
const app = express();

// SECRET: Snyk Code/Secrets will flag this hardcoded credential
const CONNECTION_STRING = "mongodb://admin:BossaPassword2026!@cluster0.mongodb.net/bossaeats";

// VULNERABILITY: NoSQL Injection (Snyk Code)
app.get('/api/user-lookup', (req, res) => {
    const query = { username: req.query.username }; // Untrusted user input
    mongoose.connection.db.collection('users').find(query).toArray((err, users) => {
        res.send(users);
    });
});

// VULNERABILITY: Insecure Cookie setting (Snyk Code)
app.get('/set-session', (req, res) => {
    res.cookie('sessionID', '12345', { httpOnly: false, secure: false }); 
    res.send('Session set');
});

app.listen(3000);
