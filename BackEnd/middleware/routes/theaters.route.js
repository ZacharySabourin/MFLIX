import { Router } from 'express';
import TheatersCtrl from '../controllers/theaters.controller.js';

const router = Router();

router.get('/', TheatersCtrl.getTheaters);

router.get('/id/:id', TheatersCtrl.getTheaterByID);

export default router;