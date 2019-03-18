import User from '../models/user.model';
import tokenizer from '../helpers/tokenizer.helper';

class UserController {
  /* Controller to login */
  static login(request, response) {
    // Getting user data 
    const { email, password } = request.body;
    // Finding the user
    const user = User.findByEmail(email);
    // Checking the information
    if (user != null && password === user.password) {
      // Generating the token
      const token = tokenizer.sign({id: user.id });
      response.send({ status: 200, data: { token } });
    } else {
      response.send({ status: 406 });
    }
  }

  /* Controller to register the user */
  static register(request, response) {
    const user = new User(request.body);
    // Validating the user
    const errors = user.validate();
    if (errors.length === 0) {
      user.save();
      const token = tokenizer.sign({id: user.getId()});
      response.send({ status: 200, data: [{ token }] });
    } else {
      response.send({ status: 406, errors });
    }
  }
}
export default UserController;
