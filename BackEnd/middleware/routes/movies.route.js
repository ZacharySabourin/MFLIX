import { Router } from 'express';
import MoviesCtrl from '../controllers/movies.controller.js';

const router = Router();

router.get('/', MoviesCtrl.getMovies);

router.get('/id/:id', MoviesCtrl.getMovieById);

export default router;