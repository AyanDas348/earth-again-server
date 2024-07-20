const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    userId: String,
    email: String,
});

const eventSchema = new mongoose.Schema({
    userId: String,
    events: [
        {
            date: Date,
            time: String,  // Format hh:mm
            eventKey: String,
        },
    ],
});

const scorecardDataSchema = new mongoose.Schema({
    userId: String,
    selectedOptions: [String],
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const ScorecardData = mongoose.model('ScorecardData', scorecardDataSchema);

// Routes

// 1. Save userId and email
app.post('/user', async (req, res) => {
    const { userId, email } = req.body;
    const user = new User({ userId, email });
    try {
        await user.save();
        res.status(201).send('User saved successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// 2. Store userId, date, time, and eventKey
app.post('/event', async (req, res) => {
    const { userId, date, time, eventKey } = req.body;
    const newEvent = { date, time, eventKey };

    try {
        // Check if the user already exists
        let userEvents = await Event.findOne({ userId });

        if (userEvents) {
            // If user exists, append the new event to the events array
            userEvents.events.push(newEvent);
        } else {
            // If user does not exist, create a new entry
            userEvents = new Event({
                userId,
                events: [newEvent],
            });
        }

        // Save the updated or new document
        await userEvents.save();
        res.status(201).send('Event saved successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// 3. Get userId and array of dates and events based on userId
app.get('/events/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const events = await Event.find({ userId }).select('date event -_id');
        res.status(200).json({ userId, events });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// 4. Save userId and array of selected options
app.post('/scorecard', async (req, res) => {
    const { userId, selectedOptions } = req.body;
    const scorecardData = new ScorecardData({ userId, selectedOptions });
    try {
        await scorecardData.save();
        res.status(201).send('Scorecard data saved successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
