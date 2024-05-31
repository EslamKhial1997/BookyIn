const { Schema, model } = require("mongoose");

const HeaderSchema = new Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
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
// const ImageURL = (doc) => {
//   if (
//     doc.image &&
//     !doc.image.includes(`${process.env.SERVER_IP}/Header`)
//   ) {
//     const image = `${process.env.SERVER_IP}/Header/${doc.image}`;
//     doc.image = image;
//   }
// };
// HeaderSchema.post("init", (doc) => {
//   ImageURL(doc);
// });
// HeaderSchema.post("save", (doc) => {
//   ImageURL(doc);
// });

const HeaderModel = model("Header", HeaderSchema);
module.exports = HeaderModel;
