
function buildMovieQuery(filters)
{
    let query = {};

    if (filters.year)
        query.year = filters.year;
    if (filters.text)
        query['$text'] = { $search: filters.text };

    return query;
};


function buildTheaterQuery(filters)
{
    let query = {};

    if (filters.city)
        query['location.address.city'] = filters.city;
    if(filters.state)
        query['location.address.state'] = filters.state;

    return query;
};

export { buildMovieQuery, buildTheaterQuery }