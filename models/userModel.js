const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dateFilterPligin = require("../plugin/dateFilterPligin");
const userSchema = new mongoose.Schema(
  {
    username: { type : String , unique : true},
    firstName: String,
    lastName: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "client"],
    },
    dateExp: Date,
    image_user: { type: String, required: false, default: "client.png" },
    cv: { type: String, required: false },
    cars : [{ type: mongoose.Schema.Types.ObjectId , ref:'Car'}]  
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    User.createdAt = new Date();
    User.updatedAt = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved");
  next();
});

// userSchema.statics.findByCreationDate = async function (date){
//   const StartOfDay = new Date(date)
//   StartOfDay.setHours(11,0,0,0);
//   const EndOfDay = new Date(date)
//   EndOfDay.setHours(23,59,59,999);

//   return this.find({
//     createdAt :{
//       $gte : StartOfDay,
//       $lte : EndOfDay
//     }
//   })
// }

userSchema.plugin(dateFilterPligin);

const User = mongoose.model("User", userSchema);
module.exports = User;
