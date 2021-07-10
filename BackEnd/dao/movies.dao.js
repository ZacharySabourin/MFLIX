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

    static async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {})
    {      
        const query = buildMovieQuery(filters);        
        const cursor = await buildMovieCursor(query);        
        const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page);
        
        return { 
            movieList: buildMovieList(displayCursor), 
            totalNumMovies: getTotalNumMovies(query) 
        };
    }

    static async getMovieById(id)
    {
        let movie = {};

        try
        {
            movie = await movies.findOne({ _id: new ObjectID(id) });
        }
        catch(e)
        {
            console.error('Something went wrong in getMovieByID: ' + e);      
        }  

        return movie;
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

const buildMovieCursor = async (query) => {    
    let cursor = {};

    try
    {
        cursor = await movies.find(query);
    }
    catch(e)
    {
        console.error('Unable to issue find command, ' + e);
        cursor = { movieList: [], totalNumMovies: 0 };
    }

    return cursor;
};

const buildMovieList = displayCursor => {

    let movieList = [];

    try
    {
        movieList = displayCursor.toArray();
    }
    catch(e)
    {
        console.error('Unable to convert cursor to array, ' + e);
    }

    return movieList;
};

const getTotalNumMovies = query => {

    let totalNumMovies = 0;

    try 
    {
        totalNumMovies = movies.countDocuments(query);
    } 
    catch (e) 
    {
        console.error('Problem counting documents, ' + e);      
    }

    return totalNumMovies;
};