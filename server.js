const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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

const scorecard = new mongoose.Schema({
    district: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    issues: [String],
    issuesCount: [
        {
            name: {
                type: String,
                required: true
            },
            votes: {
                type: Number,
                default: 0,
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const ScorecardData = mongoose.model('ScorecardData', scorecardDataSchema);
const ConstituencyScoreCard = mongoose.model('ConstituencyScoreCard', constituencyScoreCard);
const Scorecard = mongoose.model('Scorecard', scorecard);

// Routes
app.post('/api/v1/scorecard/scoreinsert', async (req, res) => {
    const { district, issues } = req.body;

    try {
        // Find the district
        let scorecard = await Scorecard.findOne({ district });

        if (!scorecard) {
            // If the district doesn't exist, create it with initial votes
            scorecard = new Scorecard({
                district,
                issuesCount: issues.map(issue => ({ name: issue, votes: 1 })),
                issues: [],
                score: 5,
            });
        } else {
            // Increment votes for the submitted issues
            issues.forEach(issueName => {
                const issue = scorecard.issuesCount.find(i => i.name === issueName);
                if (issue) {
                    issue.votes += 1;
                } else {
                    scorecard.issuesCount.push({ name: issueName, votes: 1 });
                }
            });
        }

        // Sort all issues by votes in descending order and pick the top 5
        const sortedIssues = scorecard.issuesCount
            .sort((a, b) => b.votes - a.votes);

        // Update the topIssues field with the top 5 sorted issues
        scorecard.issues = sortedIssues.slice(0, 5).map(i => i.name);
        // scorecard.score = sortedIssues
        //     .slice(0, 5)
        //     .map(i => i.votes)
        //     .reduce((total, x) => total + x, 0) / 5;

        const votes = sortedIssues
            .slice(0, 5)
            .map(i => i.votes)
            .sort((a, b) => a - b);

        const median = votes.length % 2 !== 0
            ? votes[Math.floor(votes.length / 2)] // For odd length, pick the middle value
            : (votes[votes.length / 2 - 1] + votes[votes.length / 2]) / 2; // For even length, average the two middle values

        scorecard.score = median;

        // Save the updated document
        await scorecard.save();
        res.status(200).json({
            success: true,
            message: 'Form submitted successfully!',
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});


app.get('/api/v1/scorecard/getscores', async (req, res) => {
    try {
        const scores = await Scorecard.find();
        res.status(200).json(scores);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


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
    console.log(req.body)
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
    if (scorecardData.length === 0)
        return []
    else return scorecardData
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'sales@bharatsfitnessden.com',
        subject: `New Message for joining gym from ${name}`,
        text: `Name: ${name} \n Mobile: ${phone} \n Email: ${email} \n ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
