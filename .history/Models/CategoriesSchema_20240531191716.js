const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "require Category"],
      unique: [true, "product name Must be unique"],
      minlength: [3, "Name Too Short To Create"],
      maxlength: [32, "Name Too long To Create"],
    },
   

    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);


const categoryModel = model("Category", categorySchema);

module.exports = categoryModel;
