import mongoose from 'mongoose';
import config from '../config/config.js';

export default async () => {
  const connection = await mongoose.connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};
