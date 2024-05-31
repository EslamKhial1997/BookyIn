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
const {
  SubCategoryValidation,
  deleteSubCategoryByIdValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryValidation,
} = require("../Resuble/SubCategoryValidation");


const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(
    uploadImage,
    resizeImage,
    createSubCategoryOnCategory,
    QuestionValidation,
    createSubCategoryService
  )
  .get(getAllSubCategoryService);
Routes.route("/:id")
  .get(getSubCategoryByIdValidator, getOneSubCategoryService)
  .put(
    uploadImage,
    resizeImage,
    updateQuestionValidation,
    updateQuestionService
  )
  .delete(deleteSubCategoryByIdValidator, deleteSubCategoryService);

module.exports = Routes;
