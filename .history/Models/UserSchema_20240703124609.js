const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,

      required: [true, "require User"],
      unique: [true, "product name Must be unique"], 
      minlength: [3, "Name Too Short To Create"],
      maxlength: [32, "Name Too long To Create"],
    },
    email: {
      type: String,

      required: [true, "require User"],
    },
    password: {
      type: String,

      required: [true, "require User"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
