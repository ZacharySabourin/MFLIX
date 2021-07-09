import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import MoviesDAO from './dao/movies.dao.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

MongoClient.connect(
    process.env.CLUSTER_URI,
    {
        poolsize: 50,
        writeConcern: {
            wtimeout: 2500
        },
        useUnifiedTopology: true
    })
    .then(async client => {
        await MoviesDAO.injectDB(client);

        app.listen(port, () => { console.log('listening on port ' + port) });
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });
