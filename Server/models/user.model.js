import usersTable from '../tables/users.table';

class User {
  constructor(_user) {
    this.user = _user;
  }

  static findByEmail(_email) {
    let result = null;
    usersTable.forEach((user) => {
      let { email } = user;
      if (email == _email) {
        result = user;
      }
    });
    return result;
  }

  getUser() {
    return this.user;
  }
}
export default User;
