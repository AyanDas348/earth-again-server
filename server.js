const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample data
const scoresData = [
    { "district": "Angul", "score": 95, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Balangir", "score": 85, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Bargarh", "score": 65, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Deogarh", "score": 55, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Dhenkanal", "score": 30, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Jharsuguda", "score": 20, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Kendujhar", "score": 95, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Sambalpur", "score": 85, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Subarnapur", "score": 65, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Sundargarh", "score": 55, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Balasore", "score": 30, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Bhadrak", "score": 20, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Cuttack", "score": 95, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Jagatsinghpur", "score": 85, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Jajpur", "score": 65, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Kendrapada", "score": 55, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Khordha", "score": 30, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Mayurbhanj", "score": 20, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Nayagarh", "score": 95, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Puri", "score": 85, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Boudh", "score": 65, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Gajapati", "score": 55, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Ganjam", "score": 30, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Kalahandi", "score": 20, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Kandhamal", "score": 95, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Koraput", "score": 85, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Nabarangpur", "score": 65, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Rayagada", "score": 55, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Sonepur", "score": 30, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
    { "district": "Taptapani", "score": 20, "image": "https://earthagain.weblumous.com/wp-content/uploads/2024/08/Lingaraj_temple_Bhubaneswar.jpg", "issues": ["Extreme Heat", "Monsoon Variability", "Glacial Retreat", "Sea Level Rise", "Agricultural Impact"] },
];

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

const constituencyScoreCard = new mongoose.Schema({
    constituencyName: {
        required: true,
        type: String,
        unique: true
    },
    score: Number,
    topIssues: [String],
    name: String,
    comment: String,
})

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const ScorecardData = mongoose.model('ScorecardData', scorecardDataSchema);
const ConstituencyScoreCard = mongoose.model('ConstituencyScoreCard', constituencyScoreCard);

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
        const events = await Event.find({ userId });
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

// 5. All scorecard data
app.get('/scorecard', async (req, res) => {
    const scorecardData = await ScorecardData.find()
    if(scorecardData.length === 0)
        return []
    else return scorecardData
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
