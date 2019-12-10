import toml from 'toml';
import fs from 'fs';

const map = new Map();
map.set('production', null); // get from storage
// map.set('test', toml.parse(fs.readFileSync('./config/test.toml', 'utf-8')));
map.set('default', toml.parse(fs.readFileSync('./config/development.toml', 'utf-8')));

const config = map.has(process.env.NODE_ENV)
  ? map.get(process.env.NODE_ENV)
  : map.get('default');

export default config;
