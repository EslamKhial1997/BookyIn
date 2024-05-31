const { v4: uuidv4 } = require("uuid");

const expressAsyncHandler = require("express-async-handler");

const factory = require("./FactoryHandler");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const categoryModel = require("../Models/CategoriesSchema");
const sharp = require("sharp");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `${pro}/category-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/categories/${filename}`);
    req.body.image = filename;
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");
exports.createCategoriesService = factory.createOne(categoryModel);
exports.getAllCategories = factory.getAll(categoryModel);
exports.getOneCategory = factory.getOne(categoryModel);
exports.deleteOneCategory = factory.deleteOne(categoryModel);
exports.updateOneCategory = factory.updateOne(categoryModel);
