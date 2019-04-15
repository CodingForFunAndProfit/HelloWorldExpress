import { v4 } from 'uuid';
import { redis } from '../redis';
import { confirmUserPrefix, forgotPasswordPrefix } from './redisPrefixes';

export const createConfirmationUrl = (userId: number) => {
    const id = v4();
    redis.set(confirmUserPrefix + id, userId, 'ex', 60 * 60 * 24); // 1 day expiration

    return `http://localhost:8080/confirm-user/${id}`;
};

export const createForgotPasswordrl = (userId: number) => {
    const id = v4();
    redis.set(forgotPasswordPrefix + id, userId, 'ex', 60 * 60 * 24); // 1 day expiration

    return `http://localhost:8080/change-password/${id}`;
};
