/* eslint-disable prefer-destructuring */
import connection from '../database/connection';

class User {
  constructor(_user) {
    this.user = _user;
  }

  /* Getting the user when you have the email */
  static async findByEmail(_email) {
    const { rows } = await connection.query('SELECT * FROM users WHERE email = $1', [_email]);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  getUser() {
    return this.user;
  }

  /* Saving the new user */
  async save() {
    const { rows } = await connection.query('INSERT INTO users(email,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *;', [this.user.email, this.user.firstName, this.user.lastName, this.user.password]);
    this.user = rows[0];
  }

  /* Checking for validation */
  async validate() {
    const {
      email, firstName, lastName, password,
    } = this.user;
    const errors = [];
    if (!email || await User.findByEmail(email) != null) {
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
    return this.user.id;
  }

  /* Finding the messages in inbox by the user of relationship */
  async inbox() {
    const { rows } = await connection.query('SELECT * FROM messages LEFT JOIN sent ON sent.messageid = id LEFT JOIN inbox ON inbox.messageid = id WHERE receiverid = $1 AND status NOT LIKE \'draft\'', [this.user.id]);
    return rows;
  }

  /* Finding the messages which is unread */
  async unread() {
    const { rows } = await connection.query('SELECT * FROM messages LEFT JOIN sent ON sent.messageid = id LEFT JOIN inbox ON inbox.messageid = id WHERE receiverid = $1 AND status LIKE \'sent\'', [this.user.id]);
    return rows;
  }

  /* Finding the messages which is drafted */
  async draft() {
    const { rows } = await connection.query('SELECT * FROM messages LEFT JOIN sent ON sent.messageid = id LEFT JOIN inbox ON inbox.messageid = id WHERE senderid = $1 AND status LIKE \'draft\'', [this.user.id]);
    return rows;
  }

  /* Finding the messages that was sent */
  async sentMail() {
    const { rows } = await connection.query('SELECT * FROM messages LEFT JOIN sent ON sent.messageid = id LEFT JOIN inbox ON inbox.messageid = id WHERE senderid = $1 AND status NOT LIKE \'draft\'', [this.user.id]);
    return rows;
  }
}
export default User;
