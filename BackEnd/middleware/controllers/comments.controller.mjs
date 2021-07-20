import CommentsDAO from '../../database/dao/comments.dao.mjs';
import { isValidPostCommentBody, isValidPutCommentBody, isValidDeleteCommentBody } from '../util/request.validation.mjs';
import { buildPostComment, buildPutComment, buildDeleteComment } from '../util/comments.builder.mjs'

export default class CommentsController
{
    static async createComment(req, res, next)
    {
        if(!isValidPostCommentBody(req.body))
            res.status(400).json({ error: 'Invalid body field(s)' });

        const comment = buildPostComment(req.body);

        CommentsDAO.createComment(comment)
        .then(() => {
            res.status(201).json({ comment, Location: '/api/v1/comments/' + comment._id });
        })
        .catch(next);
    }

    static async updateComment(req, res, next)
    {
        if(!isValidPutCommentBody(req.body))
            res.status(400).json({ error: 'Invalid body field(s)' });

        const comment = buildPutComment(req.body);

        CommentsDAO.updateComment(comment)
        .then(comment => {
            if(comment.error)
                res.status(400).json(comment.error);
            if(comment.modifiedCount === 0)
                res.status(500).json({ error: 'Unable to update comment - user may not be original poster'});
                          
            res.status(200).json({ status: 'success'});
        })
        .catch(next);
    }

    static async deleteComment(req, res, next)
    {
        if(!isValidDeleteCommentBody(body))
            res.status(400).json({ error: 'Invalid body field(s)' });

        const comment = buildDeleteComment(req.body);

        CommentsDAO.deleteComment(comment)
        .then(() => {
            res.json({ status: 'success' });
        })
        .catch(next);
    }
}