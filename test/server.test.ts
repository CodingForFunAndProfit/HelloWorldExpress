import request from 'supertest';
var appPromise: Promise<Express.Application> = require('../src/app').appPromise;

test('should return Hello, World!', (done) => {
    appPromise.then((app: Express.Application) => {
        request(app)
            .get('/')
            .expect(200, 'Hello, World!!')
            .end((err: any) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
