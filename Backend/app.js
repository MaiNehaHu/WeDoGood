const express = require('express');

const app = express();
const PORT = process.env.PORT || 1997;
const cors = require('cors');
const connectDB = require('./db/connect');

// Middleware to parse JSON bodies
app.use(express.json());

// cors
app.use(cors({
    origin: ['http://localhost:5173', 'https://we-do-good.vercel.app'],
}));

// routes
app.get("/", (req, res) => {
    res.send("Hey Neha... Your Backend is running in browser 🎉");
});

const reportRoutes = require('./routes/report');
app.use('/api', reportRoutes);

start();

async function start() {
    try {
        connectDB();

        app.listen(PORT, () => {
            console.log(`Yay!! Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Oh no.. Something went wrong!");
    }
}