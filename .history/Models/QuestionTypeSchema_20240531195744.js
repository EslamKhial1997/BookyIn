const { Schema, model } = require("mongoose");

const headerSchema = new Schema(
  {
    title: {
      type: String,
      enum: ["عادي", "اختياري", "صح وخطأ"],
      default: "عادي",
    },
    slug: {
      type: String,
      lowercase: true,
    },
  image:{
    type:String,
  }
  },
  { timestamps: true }
);
const ImageURL = (doc) => {
  if (doc.image) {
    const image = `${process.env.SERVER_IP}/header/${doc.image}`;
    doc.image = image;
  }
};
questionTypeSchema.post("init", (doc) => {
  ImageURL(doc);
});
questionTypeSchema.post("save", (doc) => {
  ImageURL(doc);
});
const headerModel = model("Header", headerSchema);

module.exports = headerModel;
