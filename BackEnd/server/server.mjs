import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import movieRoutes from '../middleware/routes/movies.route.mjs';
import theaterRoutes from '../middleware/routes/theaters.route.mjs';
import { badRoute, logError, respondError } from '../middleware/error/error.handler.mjs';

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());

app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/theaters', theaterRoutes);

app.use('*', badRoute);

app.use(logError);
app.use(respondError);

export default app;