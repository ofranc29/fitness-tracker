import express from 'express';
import cors from 'cors';
import entryRoutes from './routes/entries.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', entryRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://192.168.0.35:${PORT}`);
})