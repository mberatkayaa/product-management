const baseModel = require("./baseModel");

class Product extends baseModel {
  constructor(code, description, stock, id) {
    super();
    this.code = code;
    this.description = description;
    this.stock = +stock;
    this._id = id;
  }
}

module.exports = Product;
