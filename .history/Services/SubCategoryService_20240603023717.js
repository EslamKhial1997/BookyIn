const expressAsyncHandler = require("express-async-handler");
const SubCategoryModel = require("../Models/SubCategorySchema");
const factory = require("./FactoryHandler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const ApiError = require("../Resuble/ApiError");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `subcategory-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/subcategory/${filename}`);
    req.body.image = filename;
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");
exports.createSubCategoryOnCategory = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createSubCategoryService = factory.createOne(SubCategoryModel);
exports.getAllSubCategoryService = factory.getAll(SubCategoryModel);
exports.getOneSubCategoryService = expressAsyncHandler(
  async (req, res, next) => {
    const subcategory = SubCategoryModel.findOne({
      category: req.params.id,
    });
    console.log(req.params.id);
    if (!subcategory) {
      next(
        new ApiError(`Sorry Can't get This ID From ID :${req.params.id}`, 404)
      );
      res.status(200).json({ data: subcategory });
    }
  }
);
// factory.getOne(SubCategoryModel);
exports.updateSubCategoryService = factory.updateOne(SubCategoryModel);
exports.deleteSubCategoryService = factory.deleteOne(SubCategoryModel);
