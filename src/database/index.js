import 'reflect-metadata';
import { DataSource } from 'typeorm';
import ormConfig from '../../ormconfig.js';

let dataSource = null;

export const getConnection = async () => {
  if (!dataSource?.isInitialized) {
    dataSource = new DataSource(ormConfig);
    await dataSource.initialize();
  }
  return dataSource;
};

export const initializeDatabase = async () => {
  try {
    const conn = await getConnection();
    console.log('Database connection established successfully');
    return conn;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
