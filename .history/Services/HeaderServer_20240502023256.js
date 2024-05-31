const factory = require("./FactoryHandler");
const questionTypeModel = require("../Models/QuestionTypeSchema");
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
exports.createQuestionTypeService = factory.createOne(questionTypeModel);
exports.getAllQuestionType = factory.getAll(questionTypeModel);
exports.getOneQuestionType = factory.getOne(questionTypeModel);
exports.deleteOneQuestionType = factory.deleteOne(questionTypeModel);
exports.updateOneQuestionType = factory.updateOne(questionTypeModel);
