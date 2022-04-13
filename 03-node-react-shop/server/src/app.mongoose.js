'use strict';

import mongoose from 'mongoose';
import AppConfigs from './app.configs';

const { uri, dbName } = AppConfigs.mongoose;

const logs = {
  success: 'MongoDB Connection Success!',
  error: 'MongoDB Connection Error!',
};

const AppMongoose = () => {
  mongoose.connect(
    uri,
    {
      dbName,
    },
    (error) =>
      error ? console.log(logs.error, error) : console.log(logs.success),
  );
};

export default AppMongoose;
