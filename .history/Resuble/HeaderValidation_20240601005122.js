const { check, body } = require("express-validator");
const { default: slugify } = require("slugify/slugify");
const {
  MiddlewareValidator,
} = require("../Middleware/MiddlewareValidatorError");
const HeaderModel = require("../Models/CategoriesSchema");
exports.createHeaderValidator = [
  body("title").notEmpty().withMessage("is required"),
  body("title").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  body("title").custom((val) =>
    HeaderModel.findOne({ title: val }).then((Header) => {
      if (Header) {
        return Promise.reject(new Error("Name Header Already in Used"));
      }
    })
  ),
  MiddlewareValidator,
];
exports.getHeaderByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To get"),
  MiddlewareValidator,
];
exports.deleteHeaderByIdValidator = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Delete"),
  MiddlewareValidator,
];
exports.updateHeaderValidation = [
  check("id").isMongoId().withMessage("Sorry ID Not Available To Update"),
 
  MiddlewareValidator,
];
