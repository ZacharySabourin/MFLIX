import TheatersDAO from '../../dao/theaters.dao.js';

export default class TheatersController
{
    static async getTheaters(req, res, next)
    {
        const queryParams = extractParams(req.query);

        TheatersDAO.getTheaters(queryParams)
        .then(result => {
            res.json({
                theaters: result.theaterList,
                page: queryParams.page,
                filters: queryParams.filters,
                entries_per_page: queryParams.theatersPerPage,
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

const extractParams = query => {
    const filters = buildTheaterFilters(query);  
    const theatersPerPage = query.theatersPerPage ? parseInt(query.theatersPerPage, 10) : 20;
    const page = query.page ? parseInt(query.page, 10) : 0;

    return { filters, theatersPerPage, page };
};

const buildTheaterFilters = query => {
    let filters = {};

    if(query.city)
        filters.city = query.city;
    if(query.state)
        filters.state = query.state;
        
    return filters;
};