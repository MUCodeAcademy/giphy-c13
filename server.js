// Imports express, mysql, cors, and bcrypt
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Creates our connection with the database info
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'giphy'
});

// Connects to the database
connection.connect();

// Creates a new instance of express (creating our server)
const app = express();
// Allows our server to bypass cors errors
// and also parses data as a json
app.use(cors());
app.use(express.json());

// When the user sends a GET request to "/" it sends "Hello World!" back
app.get("/", (req, res) => res.send("Hello World!"));

// This colon defines a variable parameter
app.get("/users/:userId", (req, res) => {
    // Pulls the userId variable from the request
    const userId = req.params.userId
    // Sends their userId back to them
    res.send(userId);
});

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        connection.query(
            "INSERT INTO users VALUES (?, ?, ?)",
            [1, req.body.username, hashedPassword],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                }
                res.send("It worked");
            }
        )
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// When they make any request to any url that isn't "/", redirect them to "/"
app.all("*", (req, res) => res.redirect("/"));

// Starts the server on port 3006
app.listen(3006, () => console.log("Server is listening on port 3006"));