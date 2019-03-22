import tokenizer from '../helpers/tokenizer.helper';

const authMiddleware = (request, response, next) => {
  const { token } = request.headers;
  if (token) {
    tokenizer.verify(token, (err, data) => {
      if (err) {
        response.send({ status: 400, errors: ['Invalid token'] });
      } else {
        request.user = data;
        next();
      }
    });
  } else {
    response.send({ status: 401, errors: ['You must login'] });
  }
};

export default authMiddleware;
