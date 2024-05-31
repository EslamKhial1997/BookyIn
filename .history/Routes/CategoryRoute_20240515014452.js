const { Router } = require("express");

const {
  createCategoriesService,
  uploadImage,
  resizeImage,
  getAllCategories,
  updateOneCategory,
  deleteOneCategory,
  getOneCategory,
} = require("../Services/CategoryService");
const RouetsQuestion = require("./QuestionRoute");
const {
  deleteCategoryByIdValidator,
  createCategoryValidator,
  getCategoryByIdValidator,
  updateCategoryValidation,
} = require("../Resuble/CategoryValidation");
const { allowedTo, protect } = require("../Services/AuthService");
const Routes = Router();
Routes.use("/:categoryId/question", RouetsQuestion);
Routes.use(allowedTo("admin"));
Routes.route("/")
  .post(
    allowedTo("admin")
    protect,
    uploadImage,
    resizeImage,
    createCategoryValidator,
    createCategoriesService
  )
  .get(protect, getAllCategories);
Routes.route("/:id")
  .get(protect, getCategoryByIdValidator, getOneCategory)
  .put(
    protect,
    uploadImage,
    resizeImage,
    updateCategoryValidation,
    updateOneCategory
  )
  .delete(protect, deleteCategoryByIdValidator, deleteOneCategory);

module.exports = Routes;
