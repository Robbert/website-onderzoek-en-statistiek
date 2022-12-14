/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const fs = require('fs');
const fsp = require('fs').promises;
const { exec } = require('child_process');
const archiver = require('archiver');

const {
  DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, STRAPI_ENVIRONMENT,
} = process.env;
const user = DATABASE_USERNAME || 'strapi';
const database = DATABASE_NAME || 'strapi';
const password = DATABASE_PASSWORD || 'strapi';
const host = DATABASE_HOST || 'localhost';
const environment = STRAPI_ENVIRONMENT || 'development';
const dir = '../cms/.temp';

const execShellCommand = (cmd) => new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
      reject(new Error('something went wrong!'));
    }
    resolve(stdout || stderr);
  });
});

const checkDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const deleteFile = (file) => {
  if (fs.existsSync(file)) {
    fs.rmSync(file);
  }
};

module.exports = {

  downloadMedia: async (ctx) => {
    const folder = '../cms/public/uploads';
    const filename = 'cms-files.zip';

    deleteFile(`${folder}/${filename}`);

    const output = fs.createWriteStream(`${folder}/${filename}`);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    archive.pipe(output);

    archive.on('error', (err) => {
      throw err;
    });

    // archive all files excpt the zip-file itself
    archive.glob('**/!(*.zip)', { cwd: folder }, {});

    await archive.finalize();

    ctx.send({
      ok: true,
      body: `/uploads/${filename}`,
      env: environment,
    });
  },

  exportDatabase: async (ctx) => {
    checkDir(dir);
    const file = `${dir}/export-dump.sql`;
    const cmd = `PGPASSWORD=${password} pg_dump --clean -U ${user} -h ${host} ${database} -f ${file}`;
    const result = await execShellCommand(cmd)
      .then(() => fsp.readFile(file, 'utf-8'))
      .then((res) => ({
        ok: true,
        body: res,
        env: process.env.NODE_ENV,
      }))
      .catch((err) => {
        console.warn(err);
        return {
          ok: false,
          err,
        };
      });
    ctx.send(result);
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
          err,
        };
      });
    ctx.send(result);
  },

};
