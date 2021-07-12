import mongodb from 'mongodb'

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
            console.error('Unable to establish a collection handle in movies.dao: ' + err);
        }
    }

    static async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {})
    {       
        try
        {
            const query = filters ? buildMovieQuery(filters) : {};  
            const cursor = movies.find(query);
            const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page);

            const list = await displayCursor.toArray();

            return {
                movieList: list,
                totalNumMovies: cursor.count()
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
            return await movies.findOne({ _id: new ObjectID(id) });
        }
        catch(err)
        {
            throw err;      
        }  
    }
}

const buildMovieQuery = filters => {

    let query = {};

    if ('title' in filters)
        query = { $text: { $search: filters.title }};
    else if ('year' in filters)
        query = { 'year': { $eq: filters.year }};

    return query;
};