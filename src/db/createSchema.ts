import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/Register';
import { HelloResolver } from './modules/hello/Helloworld';

export const createSchema = () =>
    buildSchema({
        resolvers: [HelloResolver, RegisterResolver],
        authChecker: ({ context: { req } }) => {
            return !!req.session.userId; // !! casts to a boolean
        }
    });
