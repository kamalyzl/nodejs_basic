import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import pjson from '../package.json';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: pjson.name,
    version: pjson.version,
    description: pjson.description,
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./start/routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
