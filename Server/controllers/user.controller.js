import User from '../models/user.model';
import tokenizer from '../helpers/tokenizer.helper';

class UserController {
  static login(request, response) {
    const { email, password } = request.body;
    const user = User.findByEmail(email);
    if (user != null && password === user.password) {
      const token = tokenizer.sign({id: user.id });
      response.send({ status: 200, data: { token } });
    } else {
      response.send({ status: 406 });
    }
  }
}
export default UserController;
