const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { mongoConnect } = require("./util/database");
const dbHandler = require("./util/dbHandler");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", userRouter);
app.use("/admin", adminRouter);

mongoConnect(async () => {
  app.listen(process.env.CONN_PORT);
  const user = await dbHandler.getOne(User, { username: "berat" });
  console.log(process.env.DENEME_ENV, process.env.MONGO_CONN_STR);
  if (!user) {
    await dbHandler.save(new User("berat", "1", "bkaya1228@gmail.com", true));
  }
});
