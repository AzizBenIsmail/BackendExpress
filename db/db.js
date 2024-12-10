const mongoose = require("mongoose");

module.exports.connectToDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.Url_Db)
    .then(() => {
      console.log("connect to db");
    })
    .catch((error) => {
      console.log(error);
    });
};
