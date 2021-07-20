import MoviesDAO from '../../database/dao/movies.dao.mjs';
import extractParams from '../util/param.extractor.mjs';
import { buildMovieFilters } from '../util/filters.builder.mjs';

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
                page_size: reqParams.page_size,
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