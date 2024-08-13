const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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
});

const ConstituencyScoreCard = mongoose.model('ConstituencyScoreCard', constituencyScoreCard);

const odishaConstituencies = [
    'Angul', 'Balangir', 'Bargarh', 'Deogarh', 'Dhenkanal', 'Jharsuguda', 'Kendujhar', 'Sambalpur', 'Subarnapur', 'Sundargarh',
    'Balasore', 'Bhadrak', 'Cuttack', 'Jagatsinghpur', 'Jajpur', 'Kendrapada', 'Khordha', 'Mayurbhanj', 'Nayagarh', 'Puri',
    'Boudh', 'Gajapati', 'Ganjam', 'Kalahandi', 'Kandhamal', 'Koraput', 'Malkangiri', 'Nabarangpur', 'Nuapada', 'Rayagada'
]

const topIssues = [
    "Extreme Heat",
    "Monsoon Variability",
    "Glacial Retreat",
    "Sea Level Rise",
    "Agricultural Impact"
];

const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '

const insertConstituencies = async () => {
    try {
        for (const constituency of odishaConstituencies) {
            const score = Math.floor(Math.random() * 100) + 1;
            const newConstituency = new ConstituencyScoreCard({
                constituencyName: constituency,
                score: score,
                topIssues: topIssues,
                comment: comment,
                name: 'Random User',
            });
            await newConstituency.save();
        }
        console.log('All constituencies have been added to the database');
    } catch (err) {
        console.error(err);
    }
};

insertConstituencies();