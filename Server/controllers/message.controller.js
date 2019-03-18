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

  static sent(request, response) {
    const data = (new User(request.user)).sentMail();
    response.send({ status: 200, data });
  }

  static unread(request, response) {
    const data = (new User(request.user)).unread();
    response.send({ status: 200, data });
  }

  static get(request, response) {
    const msg = new Message(Message.findById(request.params.messageId));
    if (msg.message && (msg.getReveiver() === request.user.id || msg.getSender() === request.user.id)) {
      msg.setRead();
      response.send({ status: 200, data: [msg.format()] });
    } else {
      response.send({ status: 406, data: ['Invalid input'] });
    }
  }

  static draft(request, response) {
    const data = (new User(request.user)).draft();
    response.send({ status: 200, data });
  }

  static delete(request, response){
    const msg = new Message(Message.findById(request.params.messageId));
    if (msg.message && (msg.getReveiver() === request.user.id || msg.getSender() === request.user.id)) {
      Message.delete(msg.message.id);
      response.send({ status: 200, data: ['Deleted'] });
    } else {
      response.send({ status: 406, data: ['Invalid input'] });
    }
  }
}

export default MessageController;
