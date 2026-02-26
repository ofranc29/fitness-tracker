import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import entryRoutes from './routes/entries.js';

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use('/api', entryRoutes);

const { PORT, API_URL } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on ${API_URL}:${PORT}`);
})