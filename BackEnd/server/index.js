import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import MoviesDAO from '../dao/movies.dao.js';
import TheatersDAO from '../dao/theaters.dao.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

MongoClient.connect(
    process.env.DB_URI,
    {
        writeConcern: {
            wtimeout: 2500
        },
        useUnifiedTopology: true
    })   
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await MoviesDAO.injectDB(client);
        await TheatersDAO.injectDB(client);

        app.listen(port, () => { console.log('listening on port ' + port) });
    });
