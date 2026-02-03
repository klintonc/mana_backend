import { EntitySchema } from 'typeorm';

export const UserDb = new EntitySchema({
  name: 'UserDb',
  tableName: 'userDb',
  columns: {
    userId: {
      primary: true,
      type: 'varchar',
      length: 255,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    branch: {
      type: 'varchar',
      length: 100,
    },
    role: {
      type: 'varchar',
      length: 50,
    },
    firstName: {
      type: 'varchar',
      length: 100,
    },
    lastName: {
      type: 'varchar',
      length: 100,
    },
  },
  relations: {
    transactions: {
      type: 'one-to-many',
      target: 'TransacSumHistory',
      inverseSide: 'user',
    },
  },
});
