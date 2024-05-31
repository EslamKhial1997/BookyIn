const { Schema, model } = require("mongoose");

const SubCategorySchema = new Schema(
  {
    title: String,
    category: [
      {
        type: Schema.ObjectId,
        ref: "Category",
        required: [true, "Question must belong to a Category"],
      },
    ],

    image: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);
const ImageURL = (doc) => {
  if (doc.image && !doc.image.includes(`${process.env.SERVER_IP}/question`)) {
    const image = `${process.env.SERVER_IP}/question/${doc.image}`;
    doc.image = image;
  }
};
SubCategorySchema.post("init", (doc) => {
  ImageURL(doc);
});
SubCategorySchema.post("save", (doc) => {
  ImageURL(doc);
});
// QuestionSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "category",
//     select: "name image",
//   });
//   next();
// });
SubCategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "questionType",
    select: "type",
  });
  next();
});
const SubCategoryModel = model("Question", SubCategorySchema);
module.exports = SubCategoryModel;
