import { Router } from 'express';
import TheatersCtrl from '../controllers/theaters.controller.mjs';

const router = Router();

router.get('/', TheatersCtrl.getTheaters);

router.get('/id/:id', TheatersCtrl.getTheaterByID);

export default router;