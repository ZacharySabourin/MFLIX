import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;
let theaters;

export default class TheatersDAO
{
    static async injectDB(conn)
    {
        if(theaters)
            return;

        try
        {
            theaters = await conn.db(process.env.MFLIX_DB).collection('theaters');
        }
        catch(err)
        {
            throw err;
        }
    }

    static async getTheaters({ filters = null, page = 0, theatersPerPage = 20 } = {})
    {
        try
        {
            const query = filters ? buildTheaterQuery(filters) : {};
            const cursor = theaters.find(query);
            const displayCursor = cursor.limit(theatersPerPage).skip(theatersPerPage * page);

            const list = await displayCursor.toArray();
            const count = await cursor.count();

            return {
                theaterList: list,
                totalNumTheaters: count
            };
        }
        catch(err)
        {
            throw err;
        }
    }

    static async getTheaterById(id)
    {
        try
        {
            return await theaters.findOne({ _id: new ObjectID(id) });
        }
        catch(err)
        {
            throw err;
        }
    }
}

const buildTheaterQuery = filters => {

    let query = {};

    if (filters.city)
        query['location.address.city'] = filters.city;
    if(filters.state)
        query['location.address.state'] = filters.state;

    return query;
};