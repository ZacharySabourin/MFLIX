import MoviesDAO from '../../database/dao/movies.dao.mjs';
import extractParams from '../util/param.extractor.mjs';

export default class MoviesController
{
    static async getMovies(req, res, next)
    {   
        const reqParams = extractParams(buildMovieFilters, req.query);

        MoviesDAO.getMovies(reqParams)
        .then(result => {
            res.json({
                movies: result.movieList,
                page: reqParams.page,
                filters: reqParams.filters,
                entries_per_page: reqParams.entriesPerPage,
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

const buildMovieFilters = query => {
    let filters = {};

    if(query.text)
        filters.text = query.text;
    if(query.year)
        filters.year = parseInt(query.year, 10);

    return filters;
};