import axios from 'axios';
// import log4js from 'log4js';

import usersList from '../mock/users.json';

export default async function users() {
  // const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  return {
    // data,
    usersList,
  };
}
