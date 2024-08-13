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
    imageUrl: String,
});

const ConstituencyScoreCard = mongoose.model('ConstituencyScoreCard', constituencyScoreCard);

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

const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '

const insertConstituencies = async () => {
    try {
        for (const scores of scoresData) {
            const score = Math.floor(Math.random() * 100) + 1;
            const newConstituency = new ConstituencyScoreCard({
                constituencyName: scores.district,
                score: scores.score,
                topIssues: scores.issues,
                comment: comment,
                name: 'Random User',
                imageUrl: scores.image,
            });
            await newConstituency.save();
        }
        console.log('All constituencies have been added to the database');
    } catch (err) {
        console.error(err);
    }
};

insertConstituencies();