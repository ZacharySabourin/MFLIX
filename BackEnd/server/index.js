import dotenv from 'dotenv';
import app from './server.mjs';
import DatabaseClient from '../database/db.client.mjs';

dotenv.config();

const port = process.env.PORT || 5000;

DatabaseClient.connect()
.catch(err => {
    console.error(err);
    process.exit(1);
});

app.listen(port, () => { console.log('listening on port ' + port) });