import MoviesDAO from '../dao/movies.dao.js';

export default class MoviesController
{
    static async getMovies(req, res, next)
    {   
        const filters = buildMovieFilters(req.query);
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;

        MoviesDAO.getMovies({ filters, page, moviesPerPage })
        .then(result => {
            res.json({
                movies: result.movieList,
                page: page,
                filters: filters,
                entries_per_page: moviesPerPage,
                total_results: result.totalNumMovies
            });
        })
        .catch(err => {
            console.error('getMovies: ' + err);
            res.status(500).json({ error: err });
        });    
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
        .catch(err => {
            console.error('getMovieById: ' + err);
            res.status(500).json({ error: err });
        });
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