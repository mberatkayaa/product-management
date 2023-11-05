const baseModel = require("./baseModel");

class Movement extends baseModel {
  constructor(prod, description, numberOfIO, id) {
    super();
    this.prod = prod;
    this.description = description;
    this.numberOfIO = +numberOfIO;
    this._id = id;
  }
}

module.exports = Movement;
