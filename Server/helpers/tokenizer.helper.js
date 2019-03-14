import jwt from 'jsonwebtoken';
import serverConfig from '../config/server.config';

const tokenizer = {
  verify(token, callback) {
    jwt.verify(token, serverConfig.salt, callback);
  },
  sign(data) {
    return jwt.sign(data, serverConfig.salt);
  },
};
export default tokenizer;
