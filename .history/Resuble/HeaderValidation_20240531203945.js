const { body, check } = require("express-validator");
const { default: slugify } = require("slugify/slugify");
const { MiddlewareValidator } = require("../Middleware/MiddlewareValidatorError");


exports.HeaderValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    body("subtitle")
    .notEmpty()
    .withMessage("subtitle is required"),
    body("image")
    .notEmpty()
    .withMessage("Image is Required"),
  check("logo")
    .notEmpty()
    .withMessage("Image is Required"),

  MiddlewareValidator,
];
exports.getHeaderByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To get"),
  MiddlewareValidator,
];
exports.updateHeaderValidation = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
  body("description")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  MiddlewareValidator,
];
exports.deleteHeaderByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
  MiddlewareValidator,
];
