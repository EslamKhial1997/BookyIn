const { body, check } = require("express-validator");
const { default: slugify } = require("slugify/slugify");
const { MiddlewareValidator } = require("../Middleware/MiddlewareValidatorError");


exports.SubCategoryValidation = [
  body("title")
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
    .isMongoId()
    .notEmpty()
    .withMessage("Image is Requ"),

  MiddlewareValidator,
];
exports.getSubCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To get"),
  MiddlewareValidator,
];
exports.updateSubCategoryValidation = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
  body("description")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  MiddlewareValidator,
];
exports.deleteSubCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
  MiddlewareValidator,
];
