import express, { json } from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1/movies', movies);
app.use('*', (req,res) => res.status(404).json({ error: 'Page not found' }));

export default app;