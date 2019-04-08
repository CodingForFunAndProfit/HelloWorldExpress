'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users',
            [
                {
                    email: 'demo@demo.com',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    email: 'flo@demo.com',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
