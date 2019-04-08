const fs = require('fs');

module.exports = {
    development: {
        username: 'helloworldexpressuser',
        password: 'superpassword',
        database: 'helloworldexpressdb',
        host: '127.0.0.1',
        port: 5433,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeMeta'
    },
    test: {
        username: 'postgres',
        password: null,
        database: 'travisdb',
        host: '127.0.0.1',
        port: 5433,
        dialect: 'postgres'
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: 5433,
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: true
        }
    }
};
