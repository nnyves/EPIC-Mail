import User from './user.model';
import connection from '../database/connection';

class Message {
  constructor(_message) {
    this.message = _message;
  }

  async validate() {
    const errors = [];
    const { subject, message, email } = this.message;
    if (!subject || !subject.match('^.+')) {
      errors.push('You must provide the subject');
    }
    if (!message) {
      errors.push('No message');
    }
    if (!email || !await User.findByEmail(email)) {
      errors.push('Email does not exist in the system');
    }
    this.errors = errors;
    return errors;
  }

  async save() {
    const {
      subject, email, message, senderId,
    } = this.message;
    const status = this.message.status || 'sent';
    const data = await User.findByEmail(email);
    const recieverId = data.id;

    const rollBack = () => { connection.query('ROLLBACK'); };
    await connection.query('BEGIN');
    const { rows } = await connection.query('INSERT INTO messages(subject,message,status) VALUES($1,$2,$3) RETURNING *;', [subject, message, status]);
    let msg = null;
    if (rows.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      msg = rows[0];
      const messageId = msg.id;
      await connection.query('INSERT INTO inbox(messageId,receiverId) VALUES($1,$2);', [messageId, recieverId], async (err, data) => {
        if (err) {
          rollBack();
        } else {
          await connection.query('INSERT INTO sent(messageId,senderId) VALUES($1,$2);', [messageId, senderId], (err, data) => {
            if (err) {
              rollBack();
            } else {
              connection.query('COMMIT');
            }
          });
        }
      });
    } else {
      rollBack();
    }
    return msg;
  }

  static async findById(_id) {
    const { rows } = await connection.query('SELECT * FROM messages LEFT JOIN sent ON sent.messageid = id LEFT JOIN inbox ON inbox.messageid = id WHERE id = $1 ', [_id]);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  async setRead() {
    await connection.query('UPDATE messages SET status = $1 WHERE id = $2 ', ['read', this.message.id]);
  }

  static async delete(messageId) {
    await connection.query('DELETE FROM inbox WHERE messageid = $1', [messageId]);
    await connection.query('DELETE FROM sent WHERE messageid = $1', [messageId]);
    await connection.query('DELETE FROM messages WHERE id = $1', [messageId]);
  }
}

export default Message;
