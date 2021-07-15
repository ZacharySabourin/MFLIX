import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;
let comments;

export default class CommentsDAO
{
    static async injectDB(conn)
    {
        if(comments)
            return;

        try
        {
            comments = await conn.db(process.env.MFLIX_DB).collection('comments');
        }
        catch(err)
        {
            throw err;
        }
    }

    static async createComment({ name, email, movie_id, text, date } = {})
    {
        try
        {
            return await comments.insertOne({
                name: name,
                email: email,
                movie_id: new ObjectID(movie_id),
                text: text,
                date: date
            });
        }
        catch(err)
        {
            throw err;
        }
    }

    static async updateComment()
    {
        
    }

    static async deleteComment()
    {
        
    }
}