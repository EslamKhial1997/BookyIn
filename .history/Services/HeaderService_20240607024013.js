const factory = require("./FactoryHandler");
const headerModel = require("../Models/HeaderSchema");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { UploadMultiImage } = require("../Middleware/UploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {

  if (req.files.image) {
    const filename = `image-${uuidv4()}-${Date.now()}.gif`;
    await sharp(req.files.image[0].buffer)
      .resize(1500, 1500)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toFile(`uploads/header/${filename}`);
    req.body.image = filename;
  }
  if (req.files.logo) {
    const filename = `logo-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.files.logo[0].buffer)
      .resize(1500, 1500)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toFile(`uploads/header/${filename}`);
    req.body.logo = filename;
  }

  next();
});

exports.UploadImageService = UploadMultiImage([
  { name: "image", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);
exports.createHeaderService = factory.createOne(headerModel);
exports.getAllHeaderService = factory.getAll(headerModel);
exports.getOneHeaderService = factory.getOne(headerModel);
exports.deleteOneHeaderService = factory.deleteOne(headerModel);
// exports.updateOneHeaderService = factory.updateOne(headerModel);
exports.updateOneHeaderService = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const header = await headerModel.findByIdAndUpdate(
    req.params.id,

    req.body,
    {
      new: true,
    }
  );
  if (!header) {
    return next(new ApiError(`Header ${req.params.id} Not Found`));
  }
  await header.save();
  res.status(200).json({ data: header });
});
