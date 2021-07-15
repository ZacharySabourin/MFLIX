
export default function isValidCommentBody(body)
{
    if(!body.name || !body.email || !body.movie_id || !body.text)
        return false;
    
    return true;
}