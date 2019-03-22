import connection from '../database/connection';

class Group {
  static validate({ groupName }) {
    return groupName && groupName.match('^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$') ? [] : ['Invalid group name'];
  }

  static async save(group) {
    const { groupName } = group;
    const { rows } = await connection.query('INSERT INTO groups(name) VALUES($1) RETURNING *;', [groupName]);
    return rows;
  }

  static async getAll() {
    const { rows } = await connection.query('SELECT * FROM groups');
    return rows;
  }

  static async delete(id) {
    const { rows } = await connection.query('DELETE FROM groups WHERE id=$1 RETURNING *', [id]);
    return rows;
  }

  static async findGroupAdmin(id) {
    const { rows } = await connection.query('SELECT * FROM groupMembers WHERE groupid = $1 AND role=\'admin\'', [id]);
    return rows;
  }
}
export default Group;
