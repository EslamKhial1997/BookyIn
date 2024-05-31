const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
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
  if (doc.image) {
    console.log(doc.image);
   
    // doc = {...doc,image};
  }
};
QuestionSchema.post("init", (doc) => {
  console.log(doc);
  // ImageURL(doc);
});
QuestionSchema.post("save", (doc) => {
  console.log(doc);
  // ImageURL(doc);
});
QuestionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name image",
  });
  next();
});
QuestionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "questionType",
    select: "type",
  });
  next();
});
const QuestionModel = model("Question", QuestionSchema);
module.exports = QuestionModel;
