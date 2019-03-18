import Message from '../models/message.model';
import User from '../models/user.model';

class MessageController { 
  static create(request, response) {
    const { message, email, subject } = request.body;
    let msg = {
      message, email, subject, senderId: request.user.id,
    };
    const messagei = new Message(msg);
    const errors = messagei.validate();
    if (messagei.validate().length === 0) {
      msg = messagei.save();
      response.send({ status: 200, data: [msg] });
    } else {
      response.send({ status: 406, errors });
    }
  }

  static inbox(request, response) {
    const data = (new User(request.user)).inbox();
    response.send({ status: 200, data });
  }
}

export default MessageController;
