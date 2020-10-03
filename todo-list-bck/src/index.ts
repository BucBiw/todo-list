import { FBAuthenticate } from './passport/socialMediaAuth';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import CookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();

import createServer from './createServer';

const { PORT, DB_PASSWORD, DB_USERNAME, DB_ENDPOINT, DB_NAME } = process.env;

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

        app.use(CookieParser());

        //facebook login
        app.get('/auth/facebook', passport.authenticate('facebook'));

        //facebook route
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            session: false,
            failureRedirect: 'http://localhost:3000',
            scope: ['profile', 'email']
        }), FBAuthenticate
        );

        const server = await createServer();

        server.applyMiddleware({ app });

        app.listen({ port: PORT }, () => console.log(`Server's Ready at: http://localhost:${PORT}${server.graphqlPath}`));
    } catch (error) {
        throw (error);
    }
}

startServer();