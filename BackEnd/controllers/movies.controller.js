import MoviesDAO from '../dao/movies.dao.js';

export default class MoviesController
{
    static async getMovies(req, res, next)
    {       
        try
        {
            const filters = buildMovieFilters(req.query);
            const page = req.query.page ? parseInt(req.query.page, 10) : 0;
            const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;

            const { movieList, totalNumMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage });

            res.json({
                movies: movieList,
                page: page,
                filters: filters,
                entries_per_page: moviesPerPage,
                total_results: totalNumMovies
            });       
        }
        catch(e)
        {
            console.error('getMovies: ' + e);
            res.status(500).json({ error: e });
        }      
    }

    static async getMovieById(req, res, next)
    {
        try
        {
            const { id } = req.params || {};
            const movie = await MoviesDAO.getMovieById(id);

            if(!movie)
                res.status(404).json({ error: 'Not Found' });
            else
                res.json(movie);
        }
        catch (e)
        {
            console.error('getMovieById: ' + e);
            res.status(500).json({ error: e });
        }
    }
}

const buildMovieFilters = query => {
    let filters = {};

    if(query.title)
        filters.title = query.title;
    else if(query.year)
        filters.year = query.year;

    return filters;
};