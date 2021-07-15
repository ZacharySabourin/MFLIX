import CommentsDAO from "../../database/dao/comments.dao.mjs";
import isValidCommentBody from "../util/request.validation.mjs";

export default class CommentsController
{
    static async createComment(req, res, next)
    {
        if(!isValidCommentBody(req.body))
            res.status(400).json({error: 'Invalid body field(s)'});

        const comment = buildComment(req.body);

        CommentsDAO.createComment(comment)
        .then(() => {
            res.status(200).json(comment);
        })
        .catch(next);
    }

    static async updateComment(req, res, next)
    {

    }

    static async deleteComment(req, res, next)
    {

    }
}

const buildComment = body => {
    const { name } = body;
    const { email } = body;
    const { movie_id } = body;
    const { text } = body;
    const date = new Date();
    
    return { name, email, movie_id, text, date };
};