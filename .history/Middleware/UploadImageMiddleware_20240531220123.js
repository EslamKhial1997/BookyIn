const multer = require("multer");
const ApiError = require("../Resuble/ApiError");

const MulterOptions = () => {
  const storage = multer.memoryStorage();
  const multerFilter = function (req, file, cb) {
    console.log(file);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Image Allowed", 400), false);
    }
  };
  const upload = multer({ storage: storage, fileFilter: multerFilter });
  return upload;
};
console.log(MulterOptions().single());
exports.UploadSingleImage = (ImageName) => MulterOptions().single(ImageName);
