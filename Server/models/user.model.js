import usersTable from '../tables/users.table';
import inboxTable from '../tables/inbox.table';
import sentTable from '../tables/sent.table';
import Message from './message.model';

class User {
  constructor(_user) {
    this.user = _user;
  }
  
  /* Getting the user when you have id */
  static findByIdn(_id) {
    let result = null;
    usersTable.forEach((user) => {
      const { id } = user;
      if (id === _id) {
        result = user;
      }
    });
    return result;
  }

  /* Getting the user when you have the email */
  static findByEmail(_email) {
    let result = null;
    usersTable.forEach((user) => {
      const { email } = user;
      if (email === _email) {
        result = user;
      }
    });
    return result;
  }

  getUser() {
    return this.user;
  }

  /* Saving the new user */
  save() {
    this.user.id = usersTable.length;
    usersTable.push(this.user);
  }

  /* Checking for validation */
  validate() {
    const {
      email, firstName, lastName, password,
    } = this.user;
    const errors = [];
    if (!email || User.findByEmail(email) != null) {
      errors.push('email exist in the system');
    }
    if (!email || !email.match('^.+@[0-9a-zA-Z]+\\.[0-9a-zA-Z]+$')) {
      errors.push('invalid email');
    }
    if (!firstName || !firstName.match('^[a-zA-Z]+$')) {
      errors.push('invalid firstName');
    }
    if (!lastName || !lastName.match('^[a-zA-Z]+$')) {
      errors.push('invalid lastName');
    }
    if (!password || !password.match('^.{6,}$')) {
      errors.push('password must be more than 5 character');
    }
    this.errors = errors;
    return errors;
  }

  /* Getting the id of the user */
  getId() {
    let result = null;
    usersTable.forEach((user) => {
      const { email } = user;
      if (email === this.user.email) {
        result = user.id;
      }
    });
    return result;
  }

  /* Finding the messages in inbox by the user of relationship */
  inbox () {
    const result = [];
    inboxTable.filter((value) => {
      if (value.recieverId === this.user.id) {
        result.push((new Message(Message.findById(value.messageId))).format());
      }
    });
    return result;
  }

  /* Finding the messages which is unread */
  unread() {
    const result = [];
    inboxTable.filter((value) => {
      if (value.recieverId === this.user.id) {
        const msg = Message.findById(value.messageId);
        if (msg.status === 'sent') {
          result.push((new Message(msg)).format());
        }
      }
    });
    return result;
  }

  /* Finding the messages which is drafted */
  draft() {
    const result = [];
    sentTable.filter((value) => {
      if (value.senderId === this.user.id) {
        const msg = Message.findById(value.messageId);
        if (msg.status === 'draft') {
          result.push((new Message(msg)).format());
        }
      }
    });
    return result;
  }

  /* Finding the messages that was sent */
  sentMail() {
    const result = [];
    sentTable.filter((value) => {
      if (value.senderId === this.user.id) {
        const msg = Message.findById(value.messageId);
        result.push((new Message(msg)).format());
      }
    });
    return result;
  }
}
export default User;
