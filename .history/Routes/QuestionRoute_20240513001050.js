const { Router } = require("express");

const {
  createQuestionService,
  getOneQuestionService,
  getAllQuestionService,
  createQuestionOnCategory,
  updateQuestionService,
  deleteQuestionService,
  uploadImage,
  resizeImage,
} = require("../Services/QuestionService");
const {
  QuestionValidation,
  deleteQuestionByIdValidator,
  getQuestionByIdValidator,
  updateQuestionValidation,
} = require("../Resuble/QuestionValidation");



const Routes = Router({ mergeParams: true });

Routes.route("/")
  .post(uploadImage,resizeImage,createQuestionOnCategory, QuestionValidation, createQuestionService)
  .get( getAllQuestionService);
Routes.route("/:id")
  .get(getQuestionByIdValidator,getOneQuestionService)
  .put(uploadImage, resizeImage,updateQuestionValidation, updateQuestionService)
  .delete(deleteQuestionByIdValidator, deleteQuestionService);

module.exports = Routes;
