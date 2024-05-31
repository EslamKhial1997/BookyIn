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
Routes.use(allowedTo("admin"));
Routes.use("/:categoryId/question", RouetsQuestion);
Routes.route("/")
  .post(protect, uploadImage, resizeImage,createCategoryValidator, createCategoriesService)
  .get(protect,getAllCategories);
Routes.route("/:id")
  .get(getCategoryByIdValidator,getOneCategory)
  .put(uploadImage, resizeImage,updateCategoryValidation, updateOneCategory)
  .delete(deleteCategoryByIdValidator, deleteOneCategory);

module.exports = Routes;
