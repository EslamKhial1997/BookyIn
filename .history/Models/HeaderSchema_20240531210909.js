const { Schema, model } = require("mongoose");

const HeaderSchema = new Schema(
  {
    title: {
      type: String,
    },
    title: {
      type: String,
    },
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
  if (
    doc.image &&
    !doc.image.includes(`${process.env.SERVER_IP}/Header`)
  ) {
    const image = `${process.env.SERVER_IP}/Header/${doc.image}`;
    doc.image = image;
  }
};
HeaderSchema.post("init", (doc) => {
  ImageURL(doc);
});
HeaderSchema.post("save", (doc) => {
  ImageURL(doc);
});
HeaderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "title",
  });
  next();
});
const HeaderModel = model("Header", HeaderSchema);
module.exports = HeaderModel;
