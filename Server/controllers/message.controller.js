import Message from '../models/message.model';
import User from '../models/user.model';

class MessageController { 
  /*
  Controller used to create new message
  */
  static async create(request, response) {
    // Retrieving data from the user
    const { message, email, subject } = request.body;
    let msg = {
      message, email, subject, senderId: request.user.id,
    };
    const messageToCreate = new Message(msg);
    const errors = await messageToCreate.validate();
    console.log(errors);
    // Checking the validation
    if (errors.length === 0) {
      msg = await messageToCreate.save();
      response.send({ status: 200, data: [msg] });
    } else {
      response.send({ status: 406, errors });
    }
  }

  /* Controler used to view the inbox */
  static async inbox(request, response) {
    // Finding message from user model
    const data = await (new User(request.user)).inbox();
    response.send({ status: 200, data });
  }

  /* Controller used to retreive the sent messages */
  static async sent(request, response) {
    const data = await (new User(request.user)).sentMail();
    response.send({ status: 200, data });
  }

  /* Controller used to retrieve unread messages */
  static async unread(request, response) {
    const data = await (new User(request.user)).unread();
    response.send({ status: 200, data });
  }

  /* Controller used to retrieve single message */
  static async get(request, response) {
    const msg = await Message.findById(request.params.messageId);
    if (msg && (msg.senderid === request.user.id || msg.receiverid === request.user.id)) {
      await (new Message(msg)).setRead();
      response.send({ status: 200, data: [msg] });
    } else {
      response.send({ status: 406, data: ['Invalid input'] });
    }
  }

  /* Controller to retrieve draft message */
  static async draft(request, response) {
    const data = await (new User(request.user)).draft();
    response.send({ status: 200, data });
  }

  /* Controller to delete message */
  static async delete(request, response){
    // Finding the message to delete
    const msg =  await Message.findById(request.params.messageId);
    // Checking privileges
    if (msg && (msg.receiverid === request.user.id || msg.senderid === request.user.id)) {
      // Deleting message
      Message.delete(msg.id);
      response.send({ status: 200, data: ['Deleted'] });
    } else {
      response.send({ status: 406, data: ['Invalid input'] });
    }
  }
}

export default MessageController;
