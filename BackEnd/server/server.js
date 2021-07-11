import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import movieRoutes from '../routes/movies.route.js';

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());

app.use('/api/v1/movies', movieRoutes);
app.use('*', (req,res) => res.status(404).json({ error: 'Page not found' }));

export default app;