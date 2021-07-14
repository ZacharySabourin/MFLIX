import mongodb from 'mongodb'

const ObjectID = mongodb.ObjectID;
let reviews;

export default class ReviewsDAO
{
    static async injectDB(conn)
    {
        if(reviews)
            return;

        try
        {
            reviews = await conn.db(process.env.MFLIX_DB).collection('reviews');
        }
        catch(err)
        {
            throw err;
        }
    }

    static async createReview()
    {

    }

    static async updateReview()
    {
        
    }

    static async deleteReview()
    {
        
    }
}