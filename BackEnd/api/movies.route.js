import { Router } from 'express';
import MoviesCtrl from './controllers/movies.controller.js';

const router = Router();

router
    .route('/')
    .get(MoviesCtrl.getMovies);

router
    .route('/id/:id')
    .get(MoviesCtrl.getMovieById);

export default router;