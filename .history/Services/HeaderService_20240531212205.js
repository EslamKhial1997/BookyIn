const factory = require("./FactoryHandler");
const headerModel = require("../Models/HeaderSchema");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  console.log(req.);
  if (req.file) {
    const filename = `headers-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/headers/${filename}`);
    req.body.image = filename;
  }
  if (req.file) {
    const filename = `headers-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/headers/${filename}`);
    req.body.logo = filename;
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");
exports.createHeaderService = factory.createOne(headerModel);
exports.getAllHeaderService = factory.getAll(headerModel);
exports.getOneHeaderService = factory.getOne(headerModel);
exports.deleteOneHeaderService = factory.deleteOne(headerModel);
exports.updateOneHeaderService = factory.updateOne(headerModel);
