
function buildPostComment(body) 
{
    const { name } = body;
    const { email } = body;
    const { movie_id } = body;
    const { text } = body;
    const date = new Date();  
    return { name, email, movie_id, text, date };
};

function buildPutComment(body)
{
    const { email } = body;
    const { id } = body;
    const { text } = body;
    const date = new Date();   
    return { email, id, text, date };
};

function buildDeleteComment(body)
{
    const { id } = body;
    const { email } = body;
    return { id, email };
};

export { buildPostComment, buildPutComment, buildDeleteComment }