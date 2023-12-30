import express from 'express';
import axios from 'axios';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const WEATHER_API_KEY = "2fc0a80c190dff7c1db9efee7c0f7211";

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/weather', (req, res) => {
    const CITY_ID = Number(req.query.id);
    if (isNaN(CITY_ID) || CITY_ID <= 0) {
        res.status(400).send('Invalid City ID');
        return;
    }

    axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(response => {
            res.setHeader("Cache-Control", "no-cache");
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).send('Internal Server Error');

        });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
