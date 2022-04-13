'use strict';

import mongoose from "mongoose";

const logs = {
  success: 'MongoDB Connection Success!',
  error: 'MongoDB Connection Error!'
};

const AppMongoose = (app) => {
  const {
    uri,
    dbName
  } = app.get('mongoose');
  mongoose.connect(uri, {
      dbName
    },
    (error) =>
    error ? console.log(logs.error, error) : console.log(logs.success)
  );
}

export default AppMongoose;