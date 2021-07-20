
function buildMovieFilters(query)
{
    let filters = {};

    if(query.text)
        filters.text = query.text;
    if(query.year)
        filters.year = parseInt(query.year, 10);

    return filters;
};


function buildTheaterFilters(query)
{
    let filters = {};

    if(query.city)
        filters.city = query.city;
    if(query.state)
        filters.state = query.state;
        
    return filters;
};

export { buildMovieFilters, buildTheaterFilters }