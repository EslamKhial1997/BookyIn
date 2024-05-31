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
  if (
    doc.image &&
    !doc.image.includes(`${process.env.SERVER_IP}/header`)
  ) {
    const image = `${process.env.SERVER_IP}/header/${doc.image}`;
    doc.image = image;
  }
  if (doc.logo &&
    !doc.image.includes(`${process.env.SERVER_IP}/header`)) {
    const logo = `${process.env.SERVER_IP}/headers/${doc.logo}`;
    doc.logo = logo;
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
