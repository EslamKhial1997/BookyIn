const { check, body } = require("express-validator");
const { default: slugify } = require("slugify/slugify");
const {
  MiddlewareValidator,
} = require("../Middleware/MiddlewareValidatorError");
const categoryModel = require("../Models/CategoriesSchema");
exports.createCategoryValidator = [
  body("title").notEmpty().withMessage("is required"),

  body("title").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  body("name").custom((val) =>
    categoryModel.findOne({ name: val }).then((Category) => {
      if (Category) {
        return Promise.reject(new Error("Name Category Already in Used"));
      }
    })
  ),
  MiddlewareValidator,
];
exports.getCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To get"),
  MiddlewareValidator,
];
exports.deleteCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
  MiddlewareValidator,
];
exports.updateCategoryValidation = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  MiddlewareValidator,
];
