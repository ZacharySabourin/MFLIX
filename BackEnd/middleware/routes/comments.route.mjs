import { Router } from "express";
import CommentsCtrl from "../controllers/comments.controller.mjs";

const router = Router();

router.route('/')
    .post(CommentsCtrl.createComment)
    .put(CommentsCtrl.updateComment)
    .delete(CommentsCtrl.deleteComment);

export default router;