const { Router } = require("express");

const {
  createSubCategoryService,
  getOneSubCategoryService,
  getAllSubCategoryService,
  createSubCategoryOnCategory,
  updateSubCategoryService,
  deleteSubCategoryService,
  uploadImage,
  resizeImage,
} = require("../Services/SubCategoryService");



const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(
    // uploadImage,
    // resizeImage,
    createSubCategoryOnCategory,
    SubCategoryValidation,
    createSubCategoryService
  )
  .get(getAllSubCategoryService);
Routes.route("/:id")
  .get(getSubCategoryByIdValidator, getOneSubCategoryService)
  .put(
    uploadImage,
    resizeImage,
    updateSubCategoryValidation,
    updateSubCategoryService
  )
  .delete(deleteSubCategoryByIdValidator, deleteSubCategoryService);

module.exports = Routes;
