import MoviesDAO from '../dao/movies.dao.js';

export default class MoviesController
{
    static async getMovies(req, res, next)
    {   
        const queryParams = extractParams(req.query);

        MoviesDAO.getMovies(queryParams)
        .then(result => {
            res.json({
                movies: result.movieList,
                page: queryParams.page,
                filters: queryParams.filters,
                entries_per_page: queryParams.moviesPerPage,
                total_results: result.totalNumMovies
            });
        })
        .catch(next);    
    }

    static async getMovieById(req, res, next)
    {
        const { id } = req.params || {};

        MoviesDAO.getMovieById(id)
        .then(movie => {
            if(!movie)
                res.status(404).json({ error: 'Not Found' });
            else
                res.json(movie);
        })
        .catch(next);
    }
}

const extractParams = query => {

    const filters = buildMovieFilters(query);  
    const moviesPerPage = query.moviesPerPage ? parseInt(query.moviesPerPage, 10) : 20;
    const page = query.page ? parseInt(query.page, 10) : 0;
    
    return { filters, moviesPerPage, page };
};

const buildMovieFilters = query => {
    let filters = {};

    if(query.title)
        filters.title = query.title;
    if(query.year)
        filters.year = parseInt(query.year, 10);

    return filters;
};