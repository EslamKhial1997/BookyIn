const { body, check } = require("express-validator");
const { default: slugify } = require("slugify/slugify");
const { MiddlewareValidator } = require("../Middleware/MiddlewareValidatorError");


exports.Header
Validation = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .isMongoId()
    .notEmpty()
    .withMessage("required ID Category"),
  check("image")
    .notEmpty()
    .withMessage("Image is Required"),

  MiddlewareValidator,
];
exports.getHeader
ByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To get"),
  MiddlewareValidator,
];
exports.updateHeader
Validation = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
  body("description")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  MiddlewareValidator,
];
exports.deleteHeader
ByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
  MiddlewareValidator,
];
