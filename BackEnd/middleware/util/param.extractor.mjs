
export default function extractParams(buildFiltersFunc, query)
{
    const filters = buildFiltersFunc(query);  
    const page_size = query.page_size ? parseInt(query.page_size, 10) : 20;
    const page = query.page ? parseInt(query.page, 10) : 0;
    
    return { filters, page_size, page };
} 