import { Router } from "express";
import ReviewsCtrl from "../controllers/reviews.controller.mjs";

const router = Router();

router.route('/')
    .post(ReviewsCtrl.createReview)
    .put(ReviewsCtrl.updateReview)
    .delete(ReviewsCtrl.deleteReview);

export default router;