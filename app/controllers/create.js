import response from '../helpers/response'
import users from '../services'

export default async (req, res) => {
  const { usersList } = await users.users(req.body)
  const newData = await req.body

  newData.id = Object.keys(usersList).length + 1
  usersList.push(newData)

  console.log(usersList)
  console.log(newData)
  return response({
    message: 'success',
    data: usersList,
    httpResponse: res
  })
};
