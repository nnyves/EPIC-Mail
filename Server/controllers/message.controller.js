import Message from '../models/message.model';
import User from '../models/user.model';

class MessageController { 
  /*
  Controller used to create new message
  */
  static create(request, response) {
    // Retrieving data from the user
    const { message, email, subject } = request.body;
    let msg = {
      message, email, subject, senderId: request.user.id,
    };
    const messageToCreate = new Message(msg);
    const errors = messageToCreate.validate();
    // Checking the validation
    if (messageToCreate.validate().length === 0) {
      msg = messageToCreate.save();
      response.send({ status: 200, data: [msg] });
    } else {
      response.send({ status: 406, errors });
    }
  }

  /* Controler used to view the inbox */
  static inbox(request, response) {
    // Finding message from user model
    const data = (new User(request.user)).inbox();
    response.send({ status: 200, data });
  }

  /* Controller used to retreive the sent messages */
  static sent(request, response) {
    const data = (new User(request.user)).sentMail();
    response.send({ status: 200, data });
  }

  /* Controller used to retrieve unread messages */
  static unread(request, response) {
    const data = (new User(request.user)).unread();
    response.send({ status: 200, data });
  }

  /* Controller used to retrieve single message */
  static get(request, response) {
    const msg = new Message(Message.findById(request.params.messageId));
    if (msg.message && (msg.getReveiver() === request.user.id || msg.getSender() === request.user.id)) {
      msg.setRead();
      response.send({ status: 200, data: [msg.format()] });
    } else {
      response.send({ status: 406, data: ['Invalid input'] });
    }
  }

  /* Controller to retrieve draft message */
  static draft(request, response) {
    const data = (new User(request.user)).draft();
    response.send({ status: 200, data });
  }

  /* Controller to delete message */
  static delete(request, response){
    // Finding the message to delete
    const msg = new Message(Message.findById(request.params.messageId));
    // Checking privileges
    if (msg.message && (msg.getReveiver() === request.user.id || msg.getSender() === request.user.id)) {
      // Deleting message
      Message.delete(msg.message.id);
      response.send({ status: 200, data: ['Deleted'] });
    } else {
      response.send({ status: 406, data: ['Invalid input'] });
    }
  }
}

export default MessageController;
