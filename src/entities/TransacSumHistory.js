import { EntitySchema } from 'typeorm';

export const TransacSumHistory = new EntitySchema({
  name: 'TransacSumHistory',
  tableName: 'transacSumHistory',
  columns: {
    transacSumId: {
      primary: true,
      type: 'uniqueidentifier',
      generated: 'uuid',
    },
    transferSum: {
      type: 'decimal',
      precision: 18,
      scale: 2,
    },
    cashSum: {
      type: 'decimal',
      precision: 18,
      scale: 2,
    },
    posSum: {
      type: 'decimal',
      precision: 18,
      scale: 2,
    },
    receiptImg: {
      type: 'varchar',
      length: 500,
      nullable: true,
    },
    datetime: {
      type: 'datetime2',
    },
    userId: {
      type: 'varchar',
      length: 255,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'UserDb',
      joinColumn: {
        name: 'userId',
        referencedColumnName: 'userId',
      },
      inverseSide: 'transactions',
    },
  },
});
