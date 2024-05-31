const { Schema, model } = require("mongoose");

const headerSchema = new Schema(
  {
    title: {
      type: String,
      default: "BookyIn",
    },
    subtitle
    logo: {
      type: String,
    },
    image:{
      type:String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
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
