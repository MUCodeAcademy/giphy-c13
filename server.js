// Imports express
const express = require('express');

// Creates a new instance of express (creating our server)
const app = express();

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
        res.send(hashedPassword);
        // In the future, we're going to have to save the password/username to the database
    } catch (err) {
        res.send(err);
    }
});

// When they make any request to any url that isn't "/", redirect them to "/"
app.all("*", (req, res) => res.redirect("/"));

// Starts the server on port 3000
app.listen(3000, () => console.log("Server is listening on port 3000"));