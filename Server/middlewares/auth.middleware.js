import tokenizer from '../helpers/tokenizer.helper';
import User from '../models/user.model';

const authMiddleware = (request, response, next) => {
  const  token  = request.headers.token;
  if (token) {
      tokenizer.verify(token, (err, data) => {
        if (err) {
            response.send({ status: 406, errors: ['Invalid token']});
        } else {
                request.user = data
                console.log(data);
                next();
        }
      });
  } else {
    response.send({ status: 401, errors: ['You must login']});
  }
};

export default authMiddleware;