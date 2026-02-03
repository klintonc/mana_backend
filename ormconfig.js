module.exports = {
  type: "mssql",
  host: process.env.DATABASE_SERVER,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false, // Don't auto-sync schema in production
  logging: process.env.NODE_ENV === "development",
  entities: ["src/entities/**/*.js"],
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};
