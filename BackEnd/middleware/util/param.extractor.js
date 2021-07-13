
export default function extractParams(buildFiltersFunc, query)
{
    const filters = buildFiltersFunc(query);  
    const entriesPerPage = query.entriesPerPage ? parseInt(query.entriesPerPage, 10) : 20;
    const page = query.page ? parseInt(query.page, 10) : 0;
    
    return { filters, entriesPerPage, page };
} 