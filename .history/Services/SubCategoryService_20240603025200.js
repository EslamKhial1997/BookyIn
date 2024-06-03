const expressAsyncHandler = require("express-async-handler");
const SubCategoryModel = require("../Models/SubCategorySchema");
const factory = require("./FactoryHandler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");

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
exports.getOneSubCategoryService = expressAsyncHandler(async(req , res , next)=>{
  const docs = await SubCategoryModel.find({category: req.params.id})
  if (!docs) {
    return next(
      new ApiError(
        `Sorry Can't Delete This ID From ID :${req.params.id}`,
        404
      )
    );
  }
  })
exports.updateSubCategoryService = factory.updateOne(SubCategoryModel);
exports.deleteSubCategoryService = factory.deleteOne(SubCategoryModel);
