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
const RouetsQuestion = require("./SubCategoryRoute");
const {
  deleteCategoryByIdValidator,
  createCategoryValidator,
  getCategoryByIdValidator,
  updateCategoryValidation,
} = require("../Resuble/CategoryValidation");
const Routes = Router();
Routes.use("/:categoryId/subcategory", RouetsSubCategory);

Routes.route("/")
  .post(
    uploadImage,
    resizeImage,
    createCategoryValidator,
    createCategoriesService
  )
  .get(getAllCategories);
Routes.route("/:id")
  .get(getCategoryByIdValidator, getOneCategory)
  .put(
    uploadImage,
    resizeImage,
    updateCategoryValidation,
    updateOneCategory
  )
  .delete(deleteCategoryByIdValidator, deleteOneCategory);

module.exports = Routes;
