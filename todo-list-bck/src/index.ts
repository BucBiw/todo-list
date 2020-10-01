import { config } from 'dotenv';
config();


import express from 'express';
import mongoose from 'mongoose';

import createServer from './createServer'

const {PORT, DB_PASSWORD, DB_USERNAME, DB_ENDPOINT, DB_NAME } = process.env

const startServer = async () => {
    //connect to the database
    try {
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });

        const app = express();
        const server = await createServer();

        server.applyMiddleware({ app });

        app.listen({ port: PORT }, () => console.log(`Server's Ready at: http://localhost:${PORT}${server.graphqlPath}`));
    } catch (error) {
        throw (error);
    }
}

startServer();