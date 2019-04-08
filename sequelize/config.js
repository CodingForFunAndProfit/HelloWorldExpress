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
        dialect: 'postgres',
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeMeta'
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        port: 5433,
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: true
        },
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeMeta'
    }
};
