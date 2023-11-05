const initialValue = {
  result: {
    status: "OK",
    message: "-",
  },
  body: {},
};

class ResultBuilder {
  obj = { ...initialValue };

  reset = () => {
    this.obj = { ...initialValue };
    return this;
  };

  error = (message) => {
    this.obj.result.status = "ERROR";
    if (message) this.obj.result.message = message;
    return this;
  };

  ok = (message) => {
    this.obj.result.status = "OK";
    if (message) this.obj.result.message = message;
    return this;
  };

  body = (data) => {
    this.obj.body = data;
    return this;
  };

  getObj = () => {
    return { ...this.obj };
  };

  json = () => {
    return JSON.stringify(this.getObj());
  };
}

module.exports = ResultBuilder;
