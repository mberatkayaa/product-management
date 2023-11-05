const initialValue = {
  error: false,
  errorObj: null,
  ok: false,
  message: null,
  body: {},
};

export default class ResultBuilder {
  obj = { ...initialValue };

  reset = () => {
    this.obj = { ...initialValue };
    return this;
  };

  error = (message, errorObj) => {
    this.obj.error = true;
    this.obj.ok = false;
    this.obj.message = message;
    this.obj.errorObj = errorObj;
    return this;
  };

  ok = (message) => {
    this.obj.error = false;
    this.obj.ok = true;
    this.obj.message = message;
    this.obj.errorObj = null;
    return this;
  };

  body = (data) => {
    data = data || {};
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
