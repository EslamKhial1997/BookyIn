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
  if (req.files.logo) {
    const filename = `logo-${uuidv4()}-${Date.now()}.png`;
    await sharp(req.files.logo[0].buffer)
      .resize(1500, 1500)
      .toFormat("png")
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
exports.updateUserStatus = expressAsyncHandler(async (req, res, next) => {
  const user = await createUsersModel.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`User ${req.params.id} Not Found`));
  }

  res.status(200).json({ data: user });
});

