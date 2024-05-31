const { Schema, model } = require("mongoose");

const headerSchema = new Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    logo: {
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
  if (doc.image) {
    const image = `${process.env.SERVER_IP}/header/${doc.image}`;
    doc.image = image;
  }
  if (doc.logo) {
    const image = `${process.env.SERVER_IP}/header/${doc.logo}`;
    doc.image = image;
  }
};
headerSchema.post("init", (doc) => {
  ImageURL(doc);
});
headerSchema.post("save", (doc) => {
  ImageURL(doc);
});
const headerModel = model("Header", headerSchema);

module.exports = headerModel;
