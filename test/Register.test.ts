import { testConn } from './utils/testConn';
import { Connection } from 'typeorm';
import { gCall } from './utils/gCall';
import faker from 'faker';
import { User } from '../src/db/entity/User';

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutation = `
mutation Register($input: RegisterInput!) {
    register(
      input: $input
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

describe('Register', () => {
    it('create user', async () => {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(5)
        };

        const response = await gCall({
            source: registerMutation,
            variableValues: {
                input: user
            }
        });

        expect(response).toMatchObject({
            data: {
                register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });

        const dbUser = await User.findOne({ where: { email: user.email } });
        expect(dbUser).toBeDefined();
        expect(dbUser!.confirmed).toBeFalsy();
        expect(dbUser!.firstName).toBe(user.firstName);
    });
});
