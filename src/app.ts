import Express from 'express';
import compression from 'compression';
import cors = require('cors');
import session from 'express-session';
import { createConnection } from 'typeorm';
import { HelloController } from './controllers';
import { ApolloServer } from 'apollo-server-express';
import { createSchema } from './db/createSchema';
import queryComplexity, {
    simpleEstimator,
    fieldExtensionsEstimator,
} from 'graphql-query-complexity';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import dotenv from 'dotenv';
import { getTypeormConnection } from './db/createConnection';
dotenv.config();

const app = Express();
const main = async () => {
    const typeormconfig = await getTypeormConnection();
    // console.log(typeormconfig);

    await createConnection(typeormconfig);

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        playground: true,
        introspection: true,
        validationRules: [
            queryComplexity({
                // The maximum allowed query complexity, queries above this threshold will be rejected
                maximumComplexity: 8,
                // The query variables. This is needed because the variables are not available
                // in the visitor of the graphql-js library
                variables: {},
                // Optional callback function to retrieve the determined query complexity
                // Will be invoked whether the query is rejected or not
                // This can be used for logging or to implement rate limiting
                onComplete: (complexity: number) => {
                    console.log('Query Complexity:', complexity);
                },
                estimators: [
                    // Using fieldConfigEstimator is mandatory to make it work with type-graphql
                    fieldExtensionsEstimator(),
                    // This will assign each field a complexity of 1 if no other estimator
                    // returned a value. We can define the default value for fields not explicitly annotated
                    simpleEstimator({
                        defaultComplexity: 1,
                    }),
                ],
            }) as any,
        ],
    });

    // const clientOrigin = origin: 'http://herokuurl';
    const clientOrigin = '*';
    app.use(
        cors({
            credentials: true,
            origin: clientOrigin,
        })
    );

    const RedisStore = connectRedis(session);

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: 'qid',
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        } as any)
    );

    app.use(compression());

    app.use('/', HelloController);

    const APIPATH = '/api';

    apolloServer.applyMiddleware({ app, path: APIPATH });
};

export const appPromise = main().then(() => app);
