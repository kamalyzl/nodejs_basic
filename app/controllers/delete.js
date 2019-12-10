import response from '../helpers/response';
import users from '../services';

export default async (req, res) => {
  const { usersList } = await users.users(req.body);
  const { id } = await req.params;

  usersList.map((val, i) => {
    if (val.id === id) {
      usersList.splice(i, 1);
    } return usersList;
  });
  return response({
    message: 'success',
    data: usersList,
    httpResponse: res,
  });
};
