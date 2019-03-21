import User from '../models/user.model';
import tokenizer from '../helpers/tokenizer.helper';

class UserController {
  /* Controller to login */
  static async login(request, response) {
    try{
    // Getting user data 
    const { email, password } = request.body;
    // Finding the user
    const user = await User.findByEmail(email);
    // Checking the information
    if (user != null && password === user.password) {
      // Generating the token
      const token = tokenizer.sign({id: user.id });
      response.send({ status: 200, data: { token } });
    } else {
      response.send({ status: 406 , error : ['Incorrect username or password'] });
    } } catch (err) {
      response.send({ status: 500, errors: ['Internal Error'] });
    }
  }

  /* Controller to register the user */
  static async register(request, response) {
    try{
    const user = new User(request.body);
    // Validating the user
    const errors = await user.validate();
    if (errors.length === 0) {
      await user.save();
      const token = tokenizer.sign({id: await user.getId()});
      response.send({ status: 200, data: [{ token }] });
    } else {
      response.send({ status: 406, errors });
    } } catch (err) {
      response.send({ status: 500, errors: ['Internal Error'] });
    }
  }
}
export default UserController;
