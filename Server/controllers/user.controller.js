import User from '../models/user.model';

class UserController {
  static login(request, response) {
    const { email, password } = request.body;
    const user = User.findByEmail(email);
    if (user != null && password == user.password) {
      response.send({ status: 200 });
    } else {
      response.send({ status: 406 });
    }
  }
}
export default UserController;
