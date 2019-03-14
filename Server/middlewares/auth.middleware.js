import tokenizer from '../helpers/tokenizer.helper';
import User from '../models/user.model';

const authMiddleware = (request, response, next) => {
  const  token  = request.headers.token;
  if (token){
      tokenizer.verify(token, (err, data) => {
        if (err) {
            response.send({ status: 406, errors: ['Invalid token']});
        } else {
            const user = User.findByIdn(data.id);
            if (user == null ){
              response.send({ status: 500, errors: ['Internal Error']});
            } else {
                request.user = user;
                next();
            }
        }
      });
  } else {
    response.send({ status: 401, errors: ['You must login']});
  }
};

export default authMiddleware;