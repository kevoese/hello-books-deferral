import dotenv from 'dotenv';
import auth from '@config/auth';
import server from '@config/server';
import database from '@config/database';
import paystack from '@config/paystack';

dotenv.config();

export default {
    auth: auth(),
    server: server(),
    database: database(),
    paystack: paystack()
};
