import { getConnection } from '../database/index.js';
import { UserDb } from '../entities/UserDb.js';

class UserRepository {
  async findByUserId(userId) {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(UserDb);

      const user = await repository.findOne({
        where: { userId },
      });

      return user;
    } catch (error) {
      console.error('Error in findByUserId:', error);
      throw error;
    }
  }

  async createAdmin(data, hashedPassword) {
    try {
      const connection = await getConnection();
      const repository = connection.getRepository(UserDb);

      const admin = repository.create({
        userId: data.username,
        password: hashedPassword,
        branch: data.branch,
        role: 'Admin',
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await repository.save(admin);
      return admin;
    } catch (error) {
      console.error('Error in createAdmin:', error);
      throw error;
    }
  }

  async userExists(userId) {
    try {
      const user = await this.findByUserId(userId);
      return user !== null;
    } catch (error) {
      console.error('Error in userExists:', error);
      throw error;
    }
  }
}

export default new UserRepository();
