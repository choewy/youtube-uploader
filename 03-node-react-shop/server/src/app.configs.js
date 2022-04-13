import dotenv from 'dotenv';

const AppConfigs = (app) => {
  dotenv.config();
  // eslint-disable-next-line no-undef
  app.set('port', process.env.PORT || 5000);
  // eslint-disable-next-line no-undef
  app.set('secret', process.env.JWT_SECRET);
  app.set('mongoose', {
    // eslint-disable-next-line no-undef
    uri: process.env.MONGO_URI,
    // eslint-disable-next-line no-undef
    dbName: process.env.MONGO_DB_NAME,
  });
};

export default AppConfigs;
