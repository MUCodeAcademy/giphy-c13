// Imports express, mysql, cors, bcrypt, passport, passport-local, and express-session
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
// Imports uuid as version 4 which allows us to generate a unique user id
const { v4: uuidv4 } = require('uuid');

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
app.use(passport.initialize());
app.use(session({ secret: 'A random string of characters', resave: false, saveUninitialized: true}));
app.use(passport.session());

passport.use(
    new LocalStrategy(function (username, password, done) {
        connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user[0]) {
                    return done(null, false, {message: "Incorrect Username or Password."});
                }
                if (!bcrypt.compareSync(password, user[0].password)) {
                    return done(null, false, {message: "Incorrect Username or Password."});
                }
                return done(null, user[0]);
            }
        );
    })
);

passport.serializeUser(function(user, done) {
    // This tells passport to store the user's id
    done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
    // Retrieves the user from the database
    connection.query("SELECT * FROM users WHERE id = ?", 
    [id],
    function (err, user) {
        done(err, user[0]);
    });
});

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
    // Generates a random user id for each person who is trying to register
    const id = uuidv4();
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        connection.query(
            "INSERT INTO users VALUES (?, ?, ?)",
            [id, req.body.username, hashedPassword],
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

app.post("/login", passport.authenticate('local'), (req, res) => {
    res.send({ success: "User Logged In."});
});

// When they make any request to any url that isn't "/", redirect them to "/"
app.all("*", (req, res) => res.redirect("/"));

// Starts the server on port 3006
app.listen(3006, () => console.log("Server is listening on port 3006"));