import httpStatus from 'http-status-codes';
import R from 'ramda';
import snakecaseKeys from 'snakecase-keys';

export default ({
  status = httpStatus.OK,
  message = '',
  data = null,
  httpResponse,
}) => httpResponse.status(status).json({
  message,
  data: R.is(Object, data) ? snakecaseKeys(data) : data,
});
