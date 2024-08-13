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

// API endpoint
app.get('/api/scores', (req, res) => {
    res.json(scoresData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
