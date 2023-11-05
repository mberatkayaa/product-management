const baseModel = require("./baseModel");

class User extends baseModel {
  constructor(username, password, email, authorized, id) {
    super();
    this.username = username;
    this.password = password;
    this.email = email;
    this.authorized = authorized;
    this._id = id;
  }
}

module.exports = User;
