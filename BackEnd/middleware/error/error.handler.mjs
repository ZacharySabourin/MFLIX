function badRoute(req, res)
{
    res.status(404).json({ error: 'Page not found' });
}

function logError(err, req, res, next)
{
    console.error(err.stack);
    next(err);
}

function respondError(err, req, res, next)
{
    res.status(500).send('Something Broke!');
}

export { badRoute, logError, respondError };