import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import router from './src/app.js';
const PORT = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));

// routes
app.get('/health', (req, res) => {
    res.send('Heath OK');
});
app.use('/api/v1', router);

app.listen(PORT, host, () => {
    console.log(`Server is running on port http://${host}:${PORT}`);
});
