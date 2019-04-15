import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
    return createConnection({
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'username',
        password: 'password',
        database: 'database-test',
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + '/../../src/db/entity/*.*']
    });
};