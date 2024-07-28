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
    topIssues: [String]
});

const ConstituencyScoreCard = mongoose.model('ConstituencyScoreCard', constituencyScoreCard);

const odishaConstituencies = [
    'Angul','Balangir', 'Bargarh', 'Deogarh', 'Dhenkanal', 'Jharsuguda', 'Kendujhar', 'Sambalpur', 'Subarnapur', 'Sundargarh',
    'Balasore', 'Bhadrak', 'Cuttack', 'Jagatsinghpur', 'Jajpur', 'Kendrapada', 'Khordha', 'Mayurbhanj', 'Nayagarh', 'Puri',
    'Boudh', 'Gajapati', 'Ganjam', 'Kalahandi', 'Kandhamal', 'Koraput', 'Malkangiri', 'Nabarangpur', 'Nuapada', 'Rayagada'
]

const topIssues = [
    "Extreme Heat: More frequent and severe heatwaves, impacting health, agriculture, and energy demand.",
    "Monsoon Variability: Unpredictable monsoons cause excessive rainfall and droughts, affecting agriculture and water resources.",
    "Glacial Retreat: Himalayan glaciers are retreating, reducing water availability and increasing flood risks.",
    "Sea Level Rise: Rising sea levels threaten coastal cities with flooding and erosion, and affect freshwater supplies.",
    "Agricultural Impact: Changes in climate reduce crop yields, leading to food insecurity and economic challenges."
];

const insertConstituencies = async () => {
    try {
        for (const constituency of odishaConstituencies) {
            const score = Math.floor(Math.random() * 100) + 1;
            const newConstituency = new ConstituencyScoreCard({
                constituencyName: constituency,
                score: score,
                topIssues: topIssues
            });
            await newConstituency.save();
        }
        console.log('All constituencies have been added to the database');
    } catch (err) {
        console.error(err);
    }
};

insertConstituencies();