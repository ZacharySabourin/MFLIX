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
        catch(e)
        {
            console.error('Unable to establish a collection handle in movies.dao: ' + e);
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {})
    {
        console.log(movies);
        let query;

        if(filters) 
        {
            if ('title' in filters)
                query = { $test: { $search: filters.title }};
            else if ('year' in filters)
                query = { 'year': { $eq: filters.year }};
        }

        let cursor;

        try
        {
            cursor = await movies.find(query);
        }
        catch(e)
        {
            console.error('Unable to issue find command, ' + e);
            return { movieList: [], totalNumMovies: 0 };
        }

        const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page);

        try 
        {
            //Get all restaurants and count the documents
            const movieList = displayCursor.toArray();
            const totalNumMovies = movies.countDocuments(query);

            return { movieList, totalNumMovies };
        } 
        catch (e) 
        {
            console.error('Unable to convert cursor to array or problem counting documents, ' + e);
            return { movieList: [], totalNumMovies: 0 };
        }
    }
}