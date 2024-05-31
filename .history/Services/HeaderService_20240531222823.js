const factory = require("./FactoryHandler");
const headerModel = require("../Models/HeaderSchema");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { UploadMultiImage } = require("../Middleware/UploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.files.image) {
    const filename = `image-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.files.image[0].buffer)
      .resize(1500, 1500)
      .toFormat("png")
      .jpeg({ quality: 50 })
      .toFile(`uploads/header/${filename}`);
    req.body.image = filename;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (ele, inx) => {
        const imageProduct = `imageProduct-${uuidv4()}-${Date.now()}-${
          inx + 1
        }.jpeg`;

        await sharp(ele.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageProduct}`);
        req.body.images.push(imageProduct);
      })
  next();
});

// exports.uploadImage = UploadSingleImage("image");
exports.UploadImageService = UploadMultiImage([
  { name: "image", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);
exports.createHeaderService = factory.createOne(headerModel);
exports.getAllHeaderService = factory.getAll(headerModel);
exports.getOneHeaderService = factory.getOne(headerModel);
exports.deleteOneHeaderService = factory.deleteOne(headerModel);
exports.updateOneHeaderService = factory.updateOne(headerModel);
