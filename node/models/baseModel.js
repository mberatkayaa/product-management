class baseModel {
  _id = null;

  getForUpdate = () => {
    const copy = this._mapForDb();
    delete copy._id;
    return [copy, this._id];
  };

  _mapForDb = () => {
    return { ...this };
  };
}

module.exports = baseModel;
