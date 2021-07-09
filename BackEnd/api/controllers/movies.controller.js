import MoviesDAO from '../../dao/movies.dao.js';

export default class MoviesController
{
    static async getMovies(req, res, next)
    {
        //Filter by name and year
        let filters = {};
        if(req.query.title)
            filters.title = req.query.title;
        else if(req.query.year)
            filters.year = req.query.year;

        const page = req.query.page ? parseInt(req.query.page, 10) : 0;
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviewPerPage) : 20;
        
        try
        {
            //Quick test object for validation of connection
            const { movieList, totalNumMovies } = await MoviesDAO.getMovies(
                {
                    filters,
                    page,
                    moviesPerPage
                }
            );

            let response = {
                movies: movieList,
                page: page,
                filters: filters,
                entries_per_page: moviesPerPage,
                total_results: totalNumMovies
            };       

            res.json(response);
        }
        catch(e)
        {
            console.error(e);
            res.status(500).json({ error: e });
        }      
    }
}