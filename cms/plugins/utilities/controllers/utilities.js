'use strict';
const fs = require('fs');
const fsp = require('fs').promises;
const { exec } = require('child_process');

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;
const user = DATABASE_USERNAME || 'strapi';
const database = DATABASE_NAME || 'strapi';
const password = DATABASE_PASSWORD ||  'strapi';
const host = DATABASE_HOST || 'localhost';
const dir = '../cms/.temp';

const execShellCommand = (cmd) => {
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
      reject(new Error('something went wrong!'))
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }

const checkDir = (path) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

module.exports = {

  exportDatabase: async (ctx) => {
    checkDir(dir);
    const file = `${dir}/export-dump.sql`;
    const cmd = `PGPASSWORD=${password} pg_dump --clean -U ${user} -h ${host} ${database} -f ${file}`;
    const result = await execShellCommand(cmd)
      .then(() => fsp.readFile(file, 'utf-8'))
      .then((result) => ({
          ok: true,
          body: result,
          env: process.env.NODE_ENV
      }))
      .catch((err) => {
        console.warn(err);
        return {
          ok: false,
          err
        }
      })
    ctx.send(result)
  },

  importDatabase: async (ctx) => {
    checkDir(dir);
    const file = `${dir}/import-dump.sql`;
    const { sql } = ctx.request.body;
    const cmd = `PGPASSWORD=${password} psql -U ${user} -h ${host} -d ${database} -f ${file}`;
    const result = await fsp.writeFile(file, sql)
      .then(() => execShellCommand(cmd))
      .then(() => ({ ok: true }))
      .catch((err) => {
        console.warn(err);
        return {
          ok: false,
          err
        }
      })
    ctx.send(result)
  },

};