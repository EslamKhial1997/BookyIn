const { Schema, model } = require("mongoose");

const SubCategorySchema = new Schema(
  {
    description: String,
    category: [
      {
        type: Schema.ObjectId,
        ref: "Category",
        required: [true, "Question must belong to a Category"],
      },
    ],
    questionType: {
      type: Schema.ObjectId,
      ref: "QuestionType",
      required: [true, "QuestionType must belong to a Category"],
    },
    image: {
      type: String,
    },
    text: {
      type: String,
    },
    alternatives: [
      {
        answer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
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
QuestionSchema.post("init", (doc) => {
  ImageURL(doc);
});
QuestionSchema.post("save", (doc) => {
  ImageURL(doc);
});
// QuestionSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "category",
//     select: "name image",
//   });
//   next();
// });
QuestionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "questionType",
    select: "type",
  });
  next();
});
const SubCategoryModel = model("Question", SubCategorySchema);
module.exports = SubCategoryModel;
