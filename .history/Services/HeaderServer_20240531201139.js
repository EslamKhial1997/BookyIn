const factory = require("./FactoryHandler");
const headerModel = require("../Models/HeaderSchema");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `header-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/header/${filename}`);
    req.body.image = filename;
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");
exports.createHeaderService = factory.createOne(headerModel);
exports.getAllHeader = factory.getAll(headerModel);
exports.getOneHeader = factory.getOne(headerModel);
exports.deleteOneHeader = factory.deleteOne(headerModel);
exports.updateOneHeader = factory.updateOne(headerModel);
