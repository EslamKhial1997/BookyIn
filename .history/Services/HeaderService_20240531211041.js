const expressAsyncHandler = require("express-async-handler");
const HeaderModel = require("../Models/HeaderSchema");
const factory = require("./FactoryHandler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { UploadSingleImage } = require("../Middleware/UploadImageMiddleware");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.file) {
   
    const filename = `header-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/headers/${filename}`);
    req.body.image = filename;
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");

 exports.createHeaderService = factory.createOne(HeaderModel);
exports.getAllHeaderService = factory.getAll(HeaderModel);
exports.getOneHeaderService = factory.getOne(HeaderModel);
exports.updateHeaderService = factory.updateOne(HeaderModel);
exports.deleteHeaderService = factory.deleteOne(HeaderModel);
