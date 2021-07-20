import mongodb from 'mongodb'
import { buildMovieQuery } from '../util/query.builder.mjs';

const ObjectID = mongodb.ObjectID;
let movies;

export default class MoviesDAO
{
    static async injectDB(conn)
    {
        if(movies)
            return;

        try
        {
            movies = await conn.db(process.env.MFLIX_DB).collection('movies');
        }
        catch(err)
        {
            throw err;
        }
    }

    static async getMovies({ filters = null, page = 0, page_size = 20 } = {})
    {       
        try
        {
            const query = filters ? buildMovieQuery(filters) : {};  
            const cursor = movies.find(query);
            const displayCursor = cursor.limit(page_size).skip(page_size * page);

            const list = await displayCursor.toArray();
            const count = await cursor.count();
            
            return {
                movieList: list,
                totalNumMovies: count
            };
        }
        catch(err)
        {
            throw err;
        }
    }

    static async getMovieById(id)
    {
        try
        {
            return await movies.aggregate(buildMoviePipeline(id)).next();
        }
        catch(err)
        {
            throw err;      
        }  
    }
}

const buildMoviePipeline = id => {
    return [
        {
            $match: { _id: new ObjectID(id) }
        },
        {
            $lookup: {
                from: 'comments',
                let: {
                    m_id: '$_id'
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [ '$movie_id', '$$m_id']
                            }
                        }
                    },
                    {
                        $sort: {
                            date: -1
                        }
                    }
                ],
                as: 'comments'
            }
        }
    ];
};
