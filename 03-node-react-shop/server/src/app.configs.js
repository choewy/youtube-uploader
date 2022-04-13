import dotenv from 'dotenv';
dotenv.config();

const AppConfigs = {
  // eslint-disable-next-line no-undef
  port: process.env.PORT || 5000,
  // eslint-disable-next-line no-undef
  secret: process.env.JWT_SECRET_KEY,
  rounds: 10,
  jwtOptions: { expiresIn: 3600 },
  mongoose: {
    // eslint-disable-next-line no-undef
    uri: process.env.MONGO_URI,
    // eslint-disable-next-line no-undef
    dbName: process.env.MONGO_DB_NAME,
  },
};

export default AppConfigs;
