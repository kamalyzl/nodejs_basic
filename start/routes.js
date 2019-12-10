import middlewares from '../app/middlewares';
import controllers from '../app/controllers';

export default (router) => {
  router.get({
    uri: '/',
  }, controllers.users);

  router.post({
    uri: '/users',
    middleware: [
      middlewares.userSchema,
    ],
  }, controllers.create);

  router.put({
    uri: '/users/:id',
    middleware: [
      middlewares.userSchema,
    ],
  }, controllers.update);

  router.delete({
    uri: '/users/:id',
  }, controllers.deleteUSer);
};
