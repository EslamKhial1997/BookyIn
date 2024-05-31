const factory = require("./FactoryHandler");
const headerModel = require("../Models/HeaderSchema");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `questionType-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/questionType/${filename}`);
    req.body.image = filename;
   
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");
exports.createQuestionTypeService = factory.createOne(heade);
exports.getAllQuestionType = factory.getAll(heade);
exports.getOneQuestionType = factory.getOne(heade);
exports.deleteOneQuestionType = factory.deleteOne(heade);
exports.updateOneQuestionType = factory.updateOne(heade);
