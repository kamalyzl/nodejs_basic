/* eslint-disable newline-per-chained-call */
import { celebrate, Joi as BaseJoi } from 'celebrate';
import Extension from '@hapi/joi-date';

const Joi = BaseJoi.extend(Extension);

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(1),
    last_name: Joi.string().min(1),
  }),
});
