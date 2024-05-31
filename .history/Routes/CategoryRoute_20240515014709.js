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
Routes.use(protect,allowedTo("admin"),)
Routes.route("/")
  .post(
    uploadImage,
    resizeImage,
    createCategoryValidator,
    createCategoriesService
  )
  .get( getAllCategories);
Routes.route("/:id")
  .get(protect, getCategoryByIdValidator, getOneCategory)
  .put(
    uploadImage,
    resizeImage,
    updateCategoryValidation,
    updateOneCategory
  )
  .delete(deleteCategoryByIdValidator, deleteOneCategory);

module.exports = Routes;
