import { getConnection } from '../database/index.js';
import { TransacSumHistory } from '../entities/TransacSumHistory.js';

class TransacSumHistoryRepository {
  async createBill(data) {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(TransacSumHistory);

      const bill = repository.create({
        transferSum: data.transferSum,
        cashSum: data.cashSum,
        posSum: data.posSum,
        receiptImg: data.receiptImg,
        datetime: new Date(),
        userId: data.userId,
      });

      await repository.save(bill);
      return bill;
    } catch (error) {
      console.error('Error in createBill:', error);
      throw error;
    }
  }

  async getAllBills() {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(TransacSumHistory);

      const bills = await repository
        .createQueryBuilder('transacSumHistory')
        .leftJoinAndSelect('transacSumHistory.user', 'userDb')
        .select([
          'transacSumHistory.transacSumId',
          'transacSumHistory.transferSum',
          'transacSumHistory.cashSum',
          'transacSumHistory.posSum',
          'transacSumHistory.receiptImg',
          'transacSumHistory.datetime',
          'userDb.branch',
          'userDb.firstName',
          'userDb.lastName',
        ])
        .orderBy('transacSumHistory.datetime', 'DESC')
        .getMany();

      return bills;
    } catch (error) {
      console.error('Error in getAllBills:', error);
      throw error;
    }
  }

  async getBillsByBranch(branch) {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(TransacSumHistory);

      const bills = await repository
        .createQueryBuilder('transacSumHistory')
        .leftJoinAndSelect('transacSumHistory.user', 'userDb')
        .select([
          'transacSumHistory.transacSumId',
          'transacSumHistory.transferSum',
          'transacSumHistory.cashSum',
          'transacSumHistory.posSum',
          'transacSumHistory.receiptImg',
          'transacSumHistory.datetime',
          'userDb.branch',
          'userDb.firstName',
          'userDb.lastName',
        ])
        .where('userDb.branch = :branch', { branch })
        .orderBy('transacSumHistory.datetime', 'DESC')
        .getMany();

      return bills;
    } catch (error) {
      console.error('Error in getBillsByBranch:', error);
      throw error;
    }
  }

  async updateBill(transacSumId, data) {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(TransacSumHistory);

      await repository.update(
        { transacSumId },
        {
          transferSum: data.transferSum,
          cashSum: data.cashSum,
          posSum: data.posSum,
        },
      );

      return await repository.findOne({ where: { transacSumId } });
    } catch (error) {
      console.error('Error in updateBill:', error);
      throw error;
    }
  }

  async getTotalDiff() {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(TransacSumHistory);

      const results = await repository
        .createQueryBuilder('t')
        .select('t.transferSum + t.cashSum', 'total')
        .addSelect('t.posSum', 'posSum')
        .addSelect('t.transferSum', 'transferSum')
        .addSelect('t.cashSum', 'cashSum')
        .addSelect('t.posSum - (t.transferSum + t.cashSum)', 'diff')
        .addSelect('t.datetime', 'datetime')
        .orderBy('t.datetime', 'DESC')
        .getRawMany();

      return results;
    } catch (error) {
      console.error('Error in getTotalDiff:', error);
      throw error;
    }
  }
}

export default new TransacSumHistoryRepository();
