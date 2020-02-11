import fs from 'fs';
import { resolve } from 'path';
import mongoose from 'mongoose';
import config from '../config';

const models = resolve(__dirname, '../schema');
fs.readdirSync(models)
 .filter(file => ~file.search(/^[^\.].*js$/)) // 获取所有js文件
 .forEach(file => {
   require(resolve(models, file)); // require 所有js文件(带全路径)
   console.log(`require(${resolve(models, file)}`);
 });

export const database = app => {
  mongoose.set('debug', true);

  mongoose.connect(config.db);

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db);
  });
  mongoose.connection.on('error', err => {
    console.error(err);
  });

  mongoose.connection.on('open', async () => {
    console.log('-----------------Connected to MongoDB ', config.db);
  });
};
