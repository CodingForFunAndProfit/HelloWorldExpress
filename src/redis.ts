import Redis from 'ioredis';

export const redis = new Redis(process.env.REDISLABSURL, {
    password: process.env.REDISLABSPASSWORD
});
