const { Schema, model } = require("mongoose");

const SubCategorySchema = new Schema(
  {
    title: String,
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must belong to a Category"],
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
    !doc.image.includes(`${process.env.SERVER_IP}/subcategory`)
  ) {
    const image = `${process.env.SERVER_IP}/subcategory/${doc.image}`;
    doc.image = image;
  }
};
SubCategorySchema.post("init", (doc) => {
  ImageURL(doc);
});
SubCategorySchema.post("save", (doc) => {
  ImageURL(doc);
});
SubCategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "title",
  });
  next();
});
const SubCategoryModel = model("SubCategory", SubCategorySchema);
module.exports = SubCategoryModel;
