import mongodb from 'mongodb';
import MoviesDAO from '../database/dao/movies.dao.mjs';
import TheatersDAO from '../database/dao/theaters.dao.mjs';
import ReviewsDAO from './dao/reviews.dao.mjs';

const MongoClient = mongodb.MongoClient;
const options = {
    writeConcern: {
        wtimeout: 2500
    },
    useUnifiedTopology: true
};

export default class DatabaseClient
{
    static async connect()
    {
        MongoClient.connect(process.env.DB_URI, options)   
        .catch(err => {
            throw err;
        })
        .then(async client => {
            await MoviesDAO.injectDB(client);
            await TheatersDAO.injectDB(client);
            await ReviewsDAO.injectDB(client);
        });
    }
};