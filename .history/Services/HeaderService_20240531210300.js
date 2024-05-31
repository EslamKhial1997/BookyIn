const expressAsyncHandler = require("express-async-handler");
const HeaderModle = require("../Models/HeaderSchema")
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
      .toFile(`uploads/header/${filename}`);
    req.body.image = filename;
  }
  next();
});

exports.uploadImage = UploadSingleImage("image");

 exports.createHeaderService = factory.createOne(HeaderModle);
exports.getAllHeaderService = factory.getAll(HeaderModle);
exports.getOneHeaderService = factory.getOne(HeaderModle);
exports.updateHeaderService = factory.updateOne(HeaderModle);
exports.deleteHeaderService = factory.deleteOne(HeaderModle);
