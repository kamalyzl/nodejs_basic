import 'dotenv/config';
import debugLib from 'debug';
import fs from 'fs';
import log4js from 'log4js';
import log4jsExtend from 'log4js-extend';
import http from 'http';
import app from './start/app';
import config from './start/config';

const debug = debugLib('startup');

/**
 * log4js configuration
 */

try {
  fs.mkdirSync('./logs');
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e);
    process.exit(1);
  }
}

log4js.configure('./config/log4js.json');

log4jsExtend(log4js, {
  path: __dirname,
  format: 'at @name (@file:@line:@column)',
});

/**
 * Create server
 */

const port = config.application.port || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  debug(`Express server listening on port ${server.address().port} for ${config.application.environment} environment`);
});
