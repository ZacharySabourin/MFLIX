import TheatersDAO from '../../dao/theaters.dao.js';
import extractParams from '../util/param.extractor.js';

export default class TheatersController
{
    static async getTheaters(req, res, next)
    {
        const reqParams = extractParams(buildTheaterFilters, req.query);

        TheatersDAO.getTheaters(reqParams)
        .then(result => {
            res.json({
                theaters: result.theaterList,
                page: reqParams.page,
                filters: reqParams.filters,
                entries_per_page: reqParams.entriesPerPage,
                total_results: result.totalNumTheaters
            });
        })
        .catch(next);
    }

    static async getTheaterByID(req, res, next)
    {
        const id = parseInt(req.params.id, 10) || {};

        TheatersDAO.getTheaterById(id)
        .then(theater => {
            if(!theater)
                res.status(404).json({ error: 'Not Found' });
            else
                res.json(theater);
        })
        .catch(next);
    }
}

const buildTheaterFilters = query => {
    let filters = {};

    if(query.city)
        filters.city = query.city;
    if(query.state)
        filters.state = query.state;
        
    return filters;
};