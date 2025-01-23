interface DbConfig {
  [key: string]: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string | undefined;
    port: number;
    dialect: string;
    logging: boolean;
    ssl: boolean;
  };
}

const commonConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "mysql",
};

const dbConfig: DbConfig = {
  development: {
    ...commonConfig,
    logging: false,
    ssl: false,
  },

  production: {
    ...commonConfig,
    logging: false,
    ssl: true,
  },
};

export default dbConfig;
