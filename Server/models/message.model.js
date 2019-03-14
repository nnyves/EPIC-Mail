import sentTable from '../tables/sent.table';
import inboxTable from '../tables/inbox.table';
import messageTable from '../tables/message.table';
import User from './user.model';
import usersTable from '../tables/users.table';

class Message {
  constructor(_message) {
    this.message = _message;
  }

  validate() {
    const errors = [];
    const { subject, message, email } = this.message;
    if (!subject || !subject.match('^.+')) {
      errors.push('You must provide the subject');
    }
    if (!message) {
      errors.push('No message');
    }
    if (!email || !User.findByEmail(email)) {
      errors.push('Email does not exist in the system');
    }
    this.errors = errors;
    return errors;
  }

  save() {
    const id = messageTable.length;
    const { subject, email, message, senderId } = this.message;
    const parentMessageId = 0;
    const createdOn = new Date();
    const status = this.message.status || 'sent';
    const msg = {
      subject,
      message,
      id,
      createdOn,
      parentMessageId,
      status,
    };
    messageTable.push(msg);
    const recieverId = User.findByEmail(email).id;
    const sent = {
      senderId,
      messageId: id,
    }
    const reciever = {
      recieverId,
      messageId: id,
    };
    sentTable.push(sent);
    inboxTable.push(reciever);
    messageTable.push(msg);
    return msg;
  }

  format() {
    const { id, subject, message, createdOn, status } = this.message;
    const msg = { id, subject, message, createdOn, status, senderId: this.getSender(), recieverId: this.getReveiver() };
    return msg;
  }

  getSender() {
    let result = null;
    sentTable.forEach((msg) => {
      const { messageId } = msg;
      if (messageId === this.message.id) {
        result = msg.senderId;
      }
    });
    return result;
  }

  getReveiver() {
    let result = null;
    inboxTable.forEach((msg) => {
      const { messageId } = msg;
      if (messageId === this.message.id) {
        result = msg.recieverId;
      }
    });
    return result;
  }

  static findById(_id) {
    let result = null;
    messageTable.forEach((user) => {
      const { id } = user;
      if (id === _id) {
        result = user;
      }
    });
    return result;
  }
}

export default Message;
