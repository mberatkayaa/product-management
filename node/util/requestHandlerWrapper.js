const ResultBuilder = require("./resultBuilder");

const wrapper = async (fn, res) => {
  try {
    await fn();
  } catch (err) {
    res.status(500).json(new ResultBuilder().error("Internal server error!").getObj());
  }
};

module.exports = wrapper;
