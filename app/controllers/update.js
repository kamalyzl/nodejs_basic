import response from '../helpers/response';
import users from '../services';

export default async (req, res) => {
  const { usersList } = await users.users(req.body);
  const { id } = await req.params;
  const { name, lastName } = await req.body;

  usersList.map((item) => {
    if (item.id === id) {
      item.name = name;
      item.lastName = lastName;
    } return usersList;
  });
  return response({
    message: 'success',
    data: usersList,
    httpResponse: res,
  });
};
