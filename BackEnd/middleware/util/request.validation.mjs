
function isValidPostCommentBody(body)
{
    if(!body.name || !body.email || !body.movie_id || !body.text)
        return false;
    return true;
}

function isValidPutCommentBody(body)
{
    if(!body.id || !body.email || !body.text)
        return false;
    return true;
}

function isValidDeleteCommentBody(body)
{
    if(!body.id || !body.email)
        return false;
    return true;
}

export { isValidPostCommentBody, isValidPutCommentBody, isValidDeleteCommentBody }