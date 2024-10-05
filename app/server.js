const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture', (req, res) => {
    const img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

// Get MongoDB connection details from environment variables or use defaults
const mongoHost = process.env.MONGODB_HOST || 'localhost';
const mongoPort = process.env.MONGODB_PORT || '27017';
const mongoUsername = process.env.MONGODB_USERNAME || 'admin';
const mongoPassword = process.env.MONGODB_PASSWORD || 'password';
const mongoUrl = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const databaseName = "my-db";

app.post('/update-profile', (req, res) => {
    const userObj = req.body;

    MongoClient.connect(mongoUrl, mongoClientOptions, (err, client) => {
        if (err) throw err;

        const db = client.db(databaseName);
        userObj['userid'] = 1;

        const myquery = { userid: 1 };
        const newvalues = { $set: userObj };

        db.collection("users").updateOne(myquery, newvalues, { upsert: true }, (err, result) => {
            if (err) throw err;
            client.close();
        });
    });

    // Send response
    res.send(userObj);
});

app.get('/get-profile', (req, res) => {
    let response = {};
    
    // Connect to the db
    MongoClient.connect(mongoUrl, mongoClientOptions, (err, client) => {
        if (err) throw err;

        const db = client.db(databaseName);
        const myquery = { userid: 1 };

        db.collection("users").findOne(myquery, (err, result) => {
            if (err) throw err;
            response = result;
            client.close();

            // Send response
            res.send(response ? response : {});
        });
    });
});

app.listen(3000, () => {
    console.log("app listening on port 3000!");
});
