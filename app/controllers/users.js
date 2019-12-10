

import response from '../helpers/response';
import users from '../services';

export default async (req, res) => {
  const data = await users.users(req.body);
  return response({
    message: 'success',
    data,
    httpResponse: res,
  });
};
